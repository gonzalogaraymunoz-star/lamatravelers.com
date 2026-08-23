import type { MetadataRoute } from 'next';
import { getPublicProducts } from '@/lib/catalog';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublicProducts();
  const staticPaths = ['', '/experiencias', '/colecciones', '/viajes-a-medida', '/transfers', '/wellness', '/alta-montana', '/nosotros', '/contacto', '/guia/san-pedro-de-atacama', '/politicas/cancelaciones'];
  return [
    ...staticPaths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: 'weekly' as const, priority: path === '' ? 1 : 0.8 })),
    ...products.map((product) => ({ url: `${site.url}/experiencias/${product.product_slug}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ];
}
