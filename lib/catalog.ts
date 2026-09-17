export type CatalogImage = {
  product_slug: string | null;
  title: string;
  storage_path: string;
  image_role: 'hero' | 'cover' | 'gallery' | 'editorial' | string;
  sort_order: number;
  active: boolean;
  url: string;
};

export type PublicProduct = {
  product_slug: string;
  name: string;
  category: string;
  duration_hours: number | null;
  schedule: string | null;
  stops: string | null;
  snack: string | null;
  description: string | null;
  public_origin: string | null;
  display_name: string | null;
  altitude: string | null;
  difficulty: string | null;
  minimum_age: string | null;
  duration_label: string | null;
  detail: string | null;
  pickup_location: string | null;
  pickup_time: string | null;
  know_more: string | null;
  itinerary: string[] | null;
  includes: string[] | null;
  excludes: string[] | null;
  recommendations: string[] | null;
  observations: string | null;
  hero: CatalogImage | null;
  cover: CatalogImage | null;
  gallery: CatalogImage[];
};

const fallbackUrl = 'https://lpirjwifzosdzgdncsbt.supabase.co';
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl;
const fallbackPublishableKey = 'sb_publishable_ORe3lY3LRSZo0LMpz4EM9Q_Bf9aUejD';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || fallbackPublishableKey;

function headers() {
  if (!supabaseKey) return null;
  return { apikey: supabaseKey, 'Content-Type': 'application/json' };
}

export function storageUrl(path: string) {
  const clean = path.split('/').map(encodeURIComponent).join('/');
  return `${supabaseUrl}/storage/v1/object/public/catalog-images/${clean}`;
}

export const fallbackImage = storageUrl('editorial/01_silencio_ancestral.jpg');

export async function getCatalogImages(slug?: string | null): Promise<CatalogImage[]> {
  const requestHeaders = headers();
  if (!requestHeaders) return [];

  const params = new URLSearchParams({
    select: 'product_slug,title,storage_path,image_role,sort_order,active',
    active: 'eq.true',
    order: 'sort_order.asc',
  });
  if (slug === null) params.set('product_slug', 'is.null');
  else if (slug) params.set('product_slug', `eq.${slug}`);

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/catalog_images?${params}`, {
      headers: requestHeaders,
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`catalog_images ${response.status}`);
    const data = await response.json() as Omit<CatalogImage, 'url'>[];
    return data.map((image) => ({ ...image, url: storageUrl(image.storage_path) }));
  } catch (error) {
    console.error('catalog_images:', error);
    return [];
  }
}

export async function getEditorialImages(prefix?: string): Promise<CatalogImage[]> {
  const images = await getCatalogImages(null);
  return prefix ? images.filter((image) => image.storage_path.startsWith(prefix)) : images;
}

async function rawProducts(slug?: string): Promise<Omit<PublicProduct, 'hero' | 'cover' | 'gallery'>[]> {
  const requestHeaders = headers();
  if (!requestHeaders) return [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_public_products`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ p_slug: slug ?? null }),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`get_public_products ${response.status}`);
    return await response.json() as Omit<PublicProduct, 'hero' | 'cover' | 'gallery'>[];
  } catch (error) {
    console.error('get_public_products:', error);
    return [];
  }
}

export async function getPublicProducts(): Promise<PublicProduct[]> {
  const [products, images] = await Promise.all([rawProducts(), getCatalogImages()]);
  return products.map((product) => attachImages(product, images));
}

export async function getPublicProduct(slug: string): Promise<PublicProduct | null> {
  const [products, images] = await Promise.all([rawProducts(slug), getCatalogImages(slug)]);
  const product = products[0];
  return product ? attachImages(product, images) : null;
}

function attachImages(
  product: Omit<PublicProduct, 'hero' | 'cover' | 'gallery'>,
  images: CatalogImage[],
): PublicProduct {
  const own = images
    .filter((image) => image.product_slug === product.product_slug)
    .sort((a, b) => a.sort_order - b.sort_order);

  // `hero` is now the canonical main image for a tourism experience.
  // `cover` remains as a legacy fallback for wellness, care and transfers.
  const explicitHero = own.find((image) => image.image_role === 'hero') ?? null;
  const legacyCover = own.find((image) => image.image_role === 'cover') ?? null;
  const hero = explicitHero ?? legacyCover;
  const cover = legacyCover ?? hero;
  const gallery = own.filter(
    (image) => image.image_role === 'gallery' && image.storage_path !== hero?.storage_path,
  );

  return { ...product, hero, cover, gallery };
}

const complementaryCategories = new Set(['Transporte', 'SPA / Terapias', 'Salud', 'Procedimientos']);

export function isTourismProduct(product: Pick<PublicProduct, 'category'>) {
  return !complementaryCategories.has(product.category);
}

export function publicGroup(product: Pick<PublicProduct, 'category'>) {
  switch (product.category) {
    case 'Nocturno': return 'Cielo';
    case 'Tour día completo': return 'Altiplano';
    case 'Tour medio día': return 'Desierto';
    case 'Transporte': return 'Transfers';
    case 'SPA / Terapias': return 'Wellness';
    case 'Salud': return 'Cuidado';
    case 'Procedimientos': return 'Cuidado';
    default: return product.category;
  }
}

export function publicProductName(product: Pick<PublicProduct, 'name' | 'display_name'>) {
  return product.display_name || product.name;
}

export function productDuration(product: Pick<PublicProduct, 'duration_hours' | 'duration_label'>) {
  if (product.duration_label) return product.duration_label;
  if (!product.duration_hours) return 'A coordinar';
  const hours = Number(product.duration_hours);
  return Number.isInteger(hours) ? `${hours} h` : `${hours.toFixed(1).replace('.0', '')} h`;
}

export function productStops(product: Pick<PublicProduct, 'stops' | 'itinerary'>) {
  if (product.itinerary?.length) return product.itinerary;
  if (!product.stops) return [];
  return product.stops.split(/\s*\+\s*|\s*·\s*|\s*\|\s*/).map((stop) => stop.trim()).filter(Boolean);
}

export function hasSupabaseEnv() { return Boolean(supabaseKey); }
