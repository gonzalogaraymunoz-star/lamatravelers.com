import Link from 'next/link';
import type { PublicProduct } from '@/lib/catalog';
import { fallbackImage, productDuration, publicGroup, publicProductName } from '@/lib/catalog';

export default function ExperienceCard({ product }: { product: PublicProduct }) {
  const name = publicProductName(product);
  return (
    <Link href={`/experiencias/${product.product_slug}`} className="experience-card">
      <div className="card-image-wrap">
        <img src={product.cover?.url || fallbackImage} alt={name} className="card-image" loading="lazy" />
      </div>
      <div className="card-body">
        <div className="eyebrow">{publicGroup(product)} · {productDuration(product)}</div>
        <h3>{name}</h3>
        <p>{product.detail || product.description || 'Una experiencia coordinada por LAMA en San Pedro de Atacama.'}</p>
        <span className="text-link">Conocer experiencia <span>↗</span></span>
      </div>
    </Link>
  );
}
