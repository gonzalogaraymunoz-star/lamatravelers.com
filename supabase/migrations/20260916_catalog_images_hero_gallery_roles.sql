begin;

alter table public.catalog_images
  drop constraint if exists catalog_images_storage_path_key;

alter table public.catalog_images
  drop constraint if exists catalog_images_drive_file_id_key;

alter table public.catalog_images
  alter column drive_file_id drop not null;

alter table public.catalog_images
  drop constraint if exists catalog_images_image_role_check;

alter table public.catalog_images
  add constraint catalog_images_image_role_check
  check (image_role = any (array['hero'::text, 'cover'::text, 'gallery'::text, 'editorial'::text]));

create unique index if not exists catalog_images_product_role_path_uidx
  on public.catalog_images ((coalesce(product_slug, '')), image_role, storage_path);

comment on column public.catalog_images.image_role is
  'hero = imagen principal de experiencia; cover = portada legacy/no turística; gallery = galería; editorial = imagen editorial.';

comment on column public.catalog_images.drive_file_id is
  'ID de Drive cuando existe. Puede ser NULL para assets ya residentes en Supabase Storage.';

update public.catalog_images ci
set image_role = 'hero', updated_at = now()
where ci.active = true
  and ci.image_role = 'cover'
  and exists (
    select 1
    from public.product_catalog pc
    where pc.active = true
      and pc.product_slug = ci.product_slug
      and pc.category in ('Tour medio día','Tour día completo','Nocturno')
  );

update public.catalog_images ci
set active = true,
    sort_order = case
      when ci.storage_path ~ '/01\\.jpg$' then 2
      when ci.storage_path ~ '/02\\.jpg$' then 3
      else greatest(ci.sort_order, 2)
    end,
    updated_at = now()
where ci.image_role = 'gallery'
  and exists (
    select 1
    from public.product_catalog pc
    where pc.active = true
      and pc.product_slug = ci.product_slug
      and pc.category in ('Tour medio día','Tour día completo','Nocturno')
  );

with tours as (
  select pc.product_slug, min(pc.name) as name
  from public.product_catalog pc
  where pc.active = true
    and pc.product_slug is not null
    and pc.category in ('Tour medio día','Tour día completo','Nocturno')
  group by pc.product_slug
), candidates as (
  select t.product_slug,
         t.name,
         o.name as storage_path,
         case
           when o.name = t.product_slug || '/cover.jpg' then 1
           when o.name ~ '/01\\.jpg$' then 2
           when o.name ~ '/02\\.jpg$' then 3
           else 9
         end as sort_order
  from tours t
  join storage.objects o
    on o.bucket_id = 'catalog-images'
   and o.name like t.product_slug || '/%.jpg'
)
insert into public.catalog_images
  (product_slug, title, storage_path, drive_file_id, drive_source_url, image_role, sort_order, active)
select c.product_slug, c.name, c.storage_path, null, null, 'gallery', c.sort_order, true
from candidates c
where not exists (
  select 1 from public.catalog_images ci
  where ci.product_slug = c.product_slug
    and ci.image_role = 'gallery'
    and ci.storage_path = c.storage_path
);

with mappings(product_slug, storage_path, title, sort_order) as (
  values
    ('astronomico','web-tours/astronomico.png','Astronómico',1),
    ('astronomico_a_desierto_abierto','web-tours/astronomico.png','Astronómico a desierto abierto',1),
    ('astronomico_en_hotel','web-tours/astronomico.png','Astronómico en hotel',1),
    ('astronomico_privado','web-tours/astronomico.png','Astronómico privado',1),
    ('nocturandina','web-tours/astronomico.png','NocTurAndina',1),
    ('baltinache','web-tours/lagunas-baltinache.png','Lagunas Escondidas de Baltinache',4),
    ('caminata_de_llamas','web-tours/llama.png','Caminata de Llamas',4),
    ('geiser_del_tatio','web-tours/geiser-del-tatio.png','Géiser del Tatio',4),
    ('laguna_cejar','web-tours/laguna-cejar.png','Laguna Cejar',4),
    ('lagunas_altiplanicas','web-tours/lagunas-altiplanicas.png','Lagunas Altiplánicas',1),
    ('piedras_rojas','web-tours/piedras-rojas.png','Piedras Rojas',4),
    ('piedras_rojas_full_chaxa','web-tours/piedras-rojas.png','Piedras Rojas',1),
    ('piedras_rojas_full_chaxa','web-tours/lagunas-altiplanicas.png','Lagunas Altiplánicas',2),
    ('piedras_rojas_full_chaxa','web-tours/chaxa.png','Laguna Chaxa',3),
    ('puritama_relax','web-tours/termas-puritama.png','Puritama',1),
    ('ruta_los_salares','web-tours/ruta-salares.png','Ruta de los Salares',4),
    ('salar_de_atacama','web-tours/chaxa.png','Salar de Atacama · Laguna Chaxa',4),
    ('saludo_al_licancabur','web-tours/licancabur.png','Volcán Licancabur',4),
    ('sunset_cocteil','web-tours/sunset.png','Sunset en Atacama',4),
    ('termas_de_puritama','web-tours/termas-puritama.png','Termas de Puritama',4),
    ('valle_arcoiris','web-tours/valle-arcoiris.png','Valle del Arcoíris',4),
    ('valle_de_la_luna','web-tours/valle-de-la-luna.png','Valle de la Luna',4),
    ('valle_de_marte','web-tours/cordillera-sal.png','Cordillera de la Sal · Valle de Marte',1),
    ('valle_luna_y_ayllu','web-tours/valle-de-la-luna.png','Valle de la Luna',1),
    ('valle_luna_y_ayllu','web-tours/san-pedro-rural.png','Ayllus de San Pedro',2),
    ('valle_muerte','web-tours/cordillera-sal.png','Cordillera de la Sal · Valle de la Muerte',4),
    ('vallecito','web-tours/vallecito.png','Vallecito · Magic Bus',4),
    ('valles_de_otro_planeta','web-tours/cordillera-sal.png','Cordillera de la Sal',4)
)
insert into public.catalog_images
  (product_slug, title, storage_path, drive_file_id, drive_source_url, image_role, sort_order, active)
select m.product_slug, m.title, m.storage_path, null, null, 'gallery', m.sort_order, true
from mappings m
where exists (
  select 1 from storage.objects o
  where o.bucket_id='catalog-images' and o.name=m.storage_path
)
and not exists (
  select 1 from public.catalog_images ci
  where ci.product_slug=m.product_slug
    and ci.image_role='gallery'
    and ci.storage_path=m.storage_path
);

commit;
