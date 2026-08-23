import type { CatalogImage } from '@/lib/catalog';

export default function EditorialSheet({ image, className = '' }: { image?: CatalogImage | null; className?: string }) {
  if (!image) return null;
  return (
    <figure className={`editorial-sheet ${className}`.trim()}>
      <img src={image.url} alt={image.title} loading="lazy" />
    </figure>
  );
}
