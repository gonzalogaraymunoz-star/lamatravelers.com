import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fallbackImage, getPublicProduct, productDuration, productStops, publicGroup } from '@/lib/catalog';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  return product ? { title: product.name, description: product.description || undefined } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  if (!product) notFound();

  const stops = productStops(product);
  const wa = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(`Hola LAMA, quiero consultar disponibilidad para ${product.name}.`)}`;
  const hero = product.cover?.url || fallbackImage;

  return <>
    <section className="product-hero">
      <img src={hero} alt={product.name} />
      <div className="product-overlay" />
      <div className="product-title"><div className="eyebrow light">{publicGroup(product)} · San Pedro de Atacama</div><h1>{product.name}</h1><p>{product.description || 'Una experiencia coordinada por LAMA en el desierto de Atacama.'}</p></div>
    </section>

    <section className="product-layout section">
      <div className="product-main">
        <div className="product-facts">
          <div><span>Duración</span><strong>{productDuration(product)}</strong></div>
          <div><span>Horario</span><strong>{product.schedule || 'A coordinar'}</strong></div>
          <div><span>Formato</span><strong>{product.public_origin || 'LAMA'}</strong></div>
        </div>

        {stops.length > 0 && <div className="content-block"><div className="eyebrow">Recorrido</div><h2>La ruta</h2><ol className="timeline">{stops.map((stop, idx) => <li key={`${stop}-${idx}`}><span>{String(idx + 1).padStart(2, '0')}</span><p>{stop}</p></li>)}</ol></div>}

        <div className="content-grid">
          <div className="content-block"><div className="eyebrow">Experiencia</div><h2>Qué vas a vivir</h2><p className="body-copy">{product.description || 'Te confirmaremos el detalle operativo antes de la salida.'}</p></div>
          <div className="content-block"><div className="eyebrow">Servicio</div><ul className="clean-list"><li>Coordinación previa</li>{product.snack && <li>{product.snack}</li>}<li>Confirmación de horario y condiciones</li></ul></div>
        </div>

        {product.gallery.length > 0 && <div className="content-block"><div className="eyebrow">Galería</div><div className="product-gallery">{product.gallery.map((image) => <figure key={image.storage_path}><img src={image.url} alt={image.title} loading="lazy" /></figure>)}</div></div>}

        <div className="content-block note-box"><strong>Operación en desierto</strong><p>Horarios, accesos y orden de recorrido pueden ajustarse por clima, temporada y condiciones operativas. LAMA confirma los detalles finales antes de la salida.</p></div>
      </div>

      <aside className="booking-card"><div className="eyebrow">Consulta</div><h3>¿Quieres incluir {product.name} en tu viaje?</h3><p>Cuéntanos tus fechas y pasajeros. Te confirmamos disponibilidad y la modalidad apropiada antes de cualquier pago.</p><a className="button button-dark wide" href={wa} target="_blank" rel="noreferrer">Consultar disponibilidad</a><Link className="button button-outline wide" href={`/viajes-a-medida?producto=${encodeURIComponent(product.product_slug)}`}>Sumar a mi viaje</Link><small>La ficha se alimenta del catálogo público seguro de LAMA en Supabase. Los costos y reglas internas no se exponen aquí.</small></aside>
    </section>

    <section className="section next-section"><div className="eyebrow">Sigue explorando</div><h2>Combina esta experiencia con tu estadía completa.</h2><Link className="text-link" href="/experiencias">Volver al catálogo ↗</Link></section>
  </>;
}
