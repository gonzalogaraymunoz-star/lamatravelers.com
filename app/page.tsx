import Link from 'next/link';
import ExperienceCard from '@/components/ExperienceCard';
import EditorialSheet from '@/components/EditorialSheet';
import Planner from '@/components/Planner';
import { getEditorialImages, getPublicProducts } from '@/lib/catalog';
import { images } from '@/lib/site';

export const dynamic = 'force-dynamic';

const preferredSlugs = [
  'valle_de_la_luna',
  'vallecito',
  'geiser_del_tatio',
  'piedras_rojas',
  'laguna_cejar',
  'ruta_los_salares',
];

export default async function Home() {
  const [products, editorial] = await Promise.all([getPublicProducts(), getEditorialImages('editorial/experiencial/')]);
  const selected = preferredSlugs.map((slug) => products.find((product) => product.product_slug === slug)).filter(Boolean).slice(0, 6);
  const immersion = editorial.find((image) => image.storage_path.endsWith('01_atacama_inmersivo.jpg'));
  const matrix = editorial.find((image) => image.storage_path.endsWith('02_matriz_de_sintonia.jpg'));

  return <>
    <section className="hero">
      <img src={images.hero} alt="Valle de la Luna, San Pedro de Atacama" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content">
        <div className="eyebrow light">San Pedro de Atacama · Chile</div>
        <h1>Atacama,<br />hecho a tu medida.</h1>
        <p>Experiencias diseñadas con criterio local, logística clara y el tiempo suficiente para mirar de verdad.</p>
        <div className="hero-actions">
          <Link className="button button-light" href="/experiencias">Explorar experiencias</Link>
          <Link className="button button-ghost" href="/viajes-a-medida">Crear mi viaje</Link>
        </div>
      </div>
      <div className="hero-note"><span>Desliza para descubrir</span><span>↓</span></div>
    </section>

    <section className="section intro">
      <div className="eyebrow">LAMA Travelers</div>
      <div className="split">
        <h2>No se trata de hacer más tours.<br />Se trata de vivir mejor el desierto.</h2>
        <p>Conectamos paisajes, cultura, movimiento, cielo, bienestar y traslados en una misma estadía. Puedes conocer cada producto por separado o construir una secuencia completa según tus días, ritmo e intereses.</p>
      </div>
    </section>

    <EditorialSheet image={immersion} className="sheet-wide" />

    <section className="section compact">
      <div className="section-head">
        <div><div className="eyebrow">Empieza por aquí</div><h2>¿Cómo quieres vivir Atacama?</h2></div>
        <Link className="text-link" href="/experiencias">Ver todo el catálogo ↗</Link>
      </div>
      <div className="category-grid">
        <Link href="/experiencias?categoria=Desierto" className="category-card"><span>01</span><h3>Desierto</h3><p>Valles, salares, lagunas y paisajes esenciales de San Pedro.</p></Link>
        <Link href="/experiencias?categoria=Altiplano" className="category-card"><span>02</span><h3>Altiplano</h3><p>Géiseres, Piedras Rojas, lagunas y rutas de gran escala.</p></Link>
        <Link href="/experiencias?categoria=Cielo" className="category-card"><span>03</span><h3>Cielo</h3><p>Noches atacameñas, astronomía y formatos privados.</p></Link>
        <Link href="/alta-montana" className="category-card"><span>04</span><h3>Montaña</h3><p>Ascensiones con preparación, aclimatación y lectura de condiciones.</p></Link>
        <Link href="/wellness" className="category-card"><span>05</span><h3>Wellness</h3><p>Termas, terapias y una capa de bienestar integrada a la estadía.</p></Link>
        <Link href="/transfers" className="category-card"><span>06</span><h3>Movilidad</h3><p>Aeropuerto, frontera, pueblo y logística especial.</p></Link>
      </div>
    </section>

    <EditorialSheet image={matrix} className="sheet-contained" />

    <section className="section">
      <div className="section-head">
        <div><div className="eyebrow">Selección LAMA</div><h2>Conoce el producto antes de elegirlo.</h2></div>
        <p className="section-copy">Cada tarjeta abre una ficha conectada al catálogo de Supabase: duración, horario, recorrido, formato e imágenes reales disponibles para ese producto.</p>
      </div>
      {selected.length > 0 ? <div className="experience-grid">{selected.map((product) => <ExperienceCard key={product!.product_slug} product={product!} />)}</div> : <p className="data-note">El catálogo se conecta al configurar la llave pública de Supabase en Vercel.</p>}
    </section>

    <section className="section plan-section">
      <div className="eyebrow">Tu viaje empieza aquí</div>
      <div className="split"><h2>Dinos cuándo vienes.<br />Nosotros ordenamos el resto.</h2><p>En vez de obligarte a comprar un paquete cerrado, partimos por tus fechas, número de pasajeros y la forma en que quieres viajar.</p></div>
      <Planner />
    </section>

    <section className="section proof"><div className="proof-grid"><div><strong>{products.length || '—'}</strong><span>productos públicos conectados</span></div><div><strong>1</strong><span>catálogo central en Supabase</span></div><div><strong>1</strong><span>equipo coordinando tu estadía</span></div><div><strong>Vigente</strong><span>registro SERNATUR</span></div></div></section>
  </>;
}
