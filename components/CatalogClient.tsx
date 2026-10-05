'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ExperienceCard from '@/components/ExperienceCard';
import type { PublicProduct } from '@/lib/catalog';
import { publicGroup, publicProductName } from '@/lib/catalog';

export default function CatalogClient({ products }: { products: PublicProduct[] }) {
  const params = useSearchParams();
  const initial = params.get('categoria') || 'Todos';
  const [category, setCategory] = useState(initial);
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map(publicGroup))).sort()],
    [products],
  );

  const list = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('es');
    return products.filter((product) => {
      const group = publicGroup(product);
      const matchesCategory = category === 'Todos' || group === category;
      const haystack = `${publicProductName(product)} ${product.detail || product.description || ''} ${product.know_more || ''} ${product.stops || ''} ${group}`.toLocaleLowerCase('es');
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [products, category, search]);

  return (
    <>
      <section className="section catalog-tools">
        <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar una experiencia" />
        <div className="filters">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </section>
      <section className="section catalog">
        <div className="catalog-count">{list.length} experiencias turísticas</div>
        <div className="experience-grid">{list.map((product) => <ExperienceCard key={product.product_slug} product={product} />)}</div>
      </section>
    </>
  );
}
