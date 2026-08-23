import { Suspense } from 'react';
import CatalogClient from '@/components/CatalogClient';
import { getPublicProducts } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Experiencias en Atacama' };

export default async function Page() {
  const products = await getPublicProducts();
  return <>
    <section className="page-hero simple">
      <div className="eyebrow">Catálogo LAMA · Supabase</div>
      <h1>Elige una experiencia.<br />O construye un viaje.</h1>
      <p>{products.length || 'Nuestro catálogo de'} experiencias y servicios organizados para conocer qué vas a vivir antes de consultar disponibilidad.</p>
    </section>
    <Suspense><CatalogClient products={products} /></Suspense>
  </>;
}
