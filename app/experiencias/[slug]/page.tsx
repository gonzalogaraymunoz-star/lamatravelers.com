import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fallbackImage, getPublicProduct, productDuration, productStops, publicGroup, publicProductName } from '@/lib/catalog';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  if (!product) return {};
  return {
    title: publicProductName(product),
    description: product.detail || product.description || undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getPublicProduct(slug);
  if (!product) notFound();

  const name = publicProductName(product);
  const itinerary = productStops(product);
  const hasStructuredContent = Boolean(
    product.altitude ||
    product.difficulty ||
    product.minimum_age ||
    product.detail ||
    product.know_more ||
    product.itinerary?.length ||
    product.includes?.length ||
    product.recommendations?.length
  );
  const wa = site.salesWhatsAppUrl;
  const hero = product.hero?.url || fallbackImage;

  return <>
    <section className="product-hero">
      <img src={hero} alt={name} />
      <div className="product-overlay" />
      <div className="product-title">
        <div className="eyebrow light">{publicGroup(product)} · San Pedro de Atacama</div>
        <h1>{name}</h1>
        <p>{product.detail || product.description || 'Una experiencia coordinada por LAMA en el desierto de Atacama.'}</p>
      </div>
    </section>

    <section className="product-layout section">
      <div className="product-main">
        {hasStructuredContent ? (
          <div className="product-facts" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            <div><span>Altitud</span><strong>{product.altitude || 'Por confirmar'}</strong></div>
            <div><span>Dificultad</span><strong>{product.difficulty || 'Por confirmar'}</strong></div>
            <div><span>Edad</span><strong>{product.minimum_age || 'Por confirmar'}</strong></div>
            <div><span>Duración</span><strong>{productDuration(product)}</strong></div>
          </div>
        ) : (
          <div className="product-facts">
            <div><span>Duración</span><strong>{productDuration(product)}</strong></div>
            <div><span>Horario</span><strong>{product.schedule || 'A coordinar'}</strong></div>
            <div><span>Formato</span><strong>{product.public_origin || 'LAMA'}</strong></div>
          </div>
        )}

        {product.detail && (
          <div className="content-block">
            <div className="eyebrow">Detalle</div>
            <h2>La experiencia</h2>
            <p className="body-copy">{product.detail}</p>
            {(product.pickup_location || product.pickup_time) && (
              <ul className="clean-list">
                {product.pickup_location && <li><strong>Lugar de recogida:</strong> {product.pickup_location}</li>}
                {product.pickup_time && <li><strong>Hora de recogida:</strong> {product.pickup_time}</li>}
              </ul>
            )}
          </div>
        )}

        {product.know_more && (
          <div className="content-block">
            <div className="eyebrow">Conoce más</div>
            <h2>El lugar</h2>
            <p className="body-copy">{product.know_more}</p>
          </div>
        )}

        {itinerary.length > 0 && (
          <div className="content-block">
            <div className="eyebrow">Itinerario</div>
            <h2>La ruta</h2>
            <ol className="timeline">
              {itinerary.map((stop, idx) => (
                <li key={`${stop}-${idx}`}>
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <p>{stop}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {(product.includes?.length || product.excludes?.length || product.recommendations?.length) ? (
          <div className="content-grid">
            <div className="content-block">
              <div className="eyebrow">Servicio</div>
              <h2>Qué incluye</h2>
              <ul className="clean-list">
                {(product.includes || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
              {product.excludes?.length ? <>
                <div className="eyebrow" style={{ marginTop: 32 }}>No incluye</div>
                <ul className="clean-list">
                  {product.excludes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </> : null}
            </div>

            <div className="content-block">
              <div className="eyebrow">Recomendaciones</div>
              <h2>Antes de salir</h2>
              <ul className="clean-list">
                {(product.recommendations || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          <div className="content-grid">
            <div className="content-block">
              <div className="eyebrow">Experiencia</div>
              <h2>Qué vas a vivir</h2>
              <p className="body-copy">{product.description || 'Te confirmaremos el detalle operativo antes de la salida.'}</p>
            </div>
            <div className="content-block">
              <div className="eyebrow">Servicio</div>
              <ul className="clean-list">
                <li>Coordinación previa</li>
                {product.snack && <li>{product.snack}</li>}
                <li>Confirmación de horario y condiciones</li>
              </ul>
            </div>
          </div>
        )}

        {product.gallery.length > 0 && (
          <div className="content-block">
            <div className="eyebrow">Galería</div>
            <div className="product-gallery">
              {product.gallery.map((image) => (
                <figure key={`${image.storage_path}-${image.sort_order}`}>
                  <img src={image.url} alt={image.title} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        )}

        {product.observations ? (
          <div className="content-block note-box">
            <strong>Observaciones</strong>
            <p>{product.observations}</p>
          </div>
        ) : (
          <div className="content-block note-box">
            <strong>Operación en desierto</strong>
            <p>Horarios, accesos y orden de recorrido pueden ajustarse por clima, temporada y condiciones operativas. LAMA confirma los detalles finales antes de la salida.</p>
          </div>
        )}
      </div>

      <aside className="booking-card">
        <div className="eyebrow">Reserva aquí</div>
        <h3>¿Quieres incluir {name} en tu viaje?</h3>
        <p>Cuéntanos tus fechas y pasajeros. Te confirmamos disponibilidad y la modalidad apropiada antes de cualquier pago.</p>
        <a className="button button-dark wide" href={wa} target="_blank" rel="noreferrer">Consultar disponibilidad</a>
        <Link className="button button-outline wide" href={`/viajes-a-medida?producto=${encodeURIComponent(product.product_slug)}`}>Sumar a mi viaje</Link>
        <small>Esta ficha muestra información pública y operativa. Precios, disponibilidad y condiciones comerciales se gestionan por separado.</small>
      </aside>
    </section>

    <section className="section next-section">
      <div className="eyebrow">Sigue explorando</div>
      <h2>Combina esta experiencia con tu estadía completa.</h2>
      <Link className="text-link" href="/experiencias">Volver al catálogo ↗</Link>
    </section>
  </>;
}
