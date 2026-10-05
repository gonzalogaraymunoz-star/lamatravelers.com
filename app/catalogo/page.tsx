import { Suspense } from 'react';
import CatalogClient from '@/components/CatalogClient';
import { getPublicProducts, isPrimaryTourismProduct } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Catálogo de experiencias' };

export default async function CatalogPage() {
  const products = (await getPublicProducts()).filter(isPrimaryTourismProduct);

  return <div className="embed-catalog-page">
    <section className="page-hero simple">
      <div className="eyebrow">CATÁLOGO · SAN PEDRO DE ATACAMA</div>
      <h1>Elige una experiencia.<br />Revisa su ficha.</h1>
      <p>{products.length || 'Nuestro catálogo de'} experiencias conectadas al catálogo central para revisar contenido, recorrido, duración e imágenes.</p>
    </section>
    <Suspense><CatalogClient products={products} basePath="/catalogo" /></Suspense>
  </div>;
}
