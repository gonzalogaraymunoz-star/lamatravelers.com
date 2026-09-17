import { Suspense } from 'react';
import CatalogClient from '@/components/CatalogClient';
import { getPublicProducts, isTourismProduct } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Experiencias en Atacama' };

export default async function Page() {
  const products = (await getPublicProducts()).filter(isTourismProduct);
  return <>
    <section className="page-hero simple">
      <div className="eyebrow">Experiencias LAMA · San Pedro de Atacama</div>
      <h1>Elige una experiencia.<br />O construye un viaje.</h1>
      <p>{products.length || 'Nuestro catálogo de'} experiencias turísticas organizadas para conocer qué vas a vivir antes de consultar disponibilidad.</p>
    </section>
    <Suspense><CatalogClient products={products} /></Suspense>
  </>;
}
