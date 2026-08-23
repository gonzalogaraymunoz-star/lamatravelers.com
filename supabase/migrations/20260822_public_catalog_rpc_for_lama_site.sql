-- Public read model for the LAMA Travelers website.
-- Intentionally excludes prices, costs, commissions and internal low-cost variants.
create or replace function public.get_public_products(p_slug text default null)
returns table (
  product_slug text,
  name text,
  category text,
  duration_hours numeric,
  schedule text,
  stops text,
  snack text,
  description text,
  public_origin text
)
language sql
stable
security definer
set search_path = public
as $$
  with ranked as (
    select
      pc.product_slug,
      pc.name,
      pc.category,
      pc.duration_hours,
      pc.schedule,
      pc.stops,
      pc.snack,
      pc.description,
      case
        when pc.origin = 'Tour Lama' then 'LAMA'
        when pc.origin = 'Clasico' then 'Clásico'
        when pc.origin = 'Bienestar' then 'Bienestar'
        when lower(coalesce(pc.origin,'')) = 'transporte' then 'Transporte'
        when pc.origin = 'Regular' then 'Regular'
        else coalesce(pc.origin, 'LAMA')
      end as public_origin,
      row_number() over (
        partition by pc.product_slug
        order by
          case
            when pc.origin = 'Tour Lama' then 1
            when pc.origin = 'Clasico' then 2
            when pc.origin = 'Bienestar' then 3
            when lower(coalesce(pc.origin,'')) = 'transporte' then 4
            when pc.origin = 'Regular' then 5
            else 9
          end,
          length(coalesce(pc.description,'')) desc,
          pc.updated_at desc
      ) as rn
    from public.product_catalog pc
    where pc.active = true
      and pc.product_slug is not null
      and coalesce(pc.origin,'') not ilike 'Low cost%'
      and (p_slug is null or pc.product_slug = p_slug)
  )
  select product_slug, name, category, duration_hours, schedule, stops, snack, description, public_origin
  from ranked
  where rn = 1
  order by category, name;
$$;

revoke all on function public.get_public_products(text) from public;
grant execute on function public.get_public_products(text) to anon, authenticated;
