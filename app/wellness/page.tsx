import Link from 'next/link';
import ExperienceCard from '@/components/ExperienceCard';
import EditorialSheet from '@/components/EditorialSheet';
import { getEditorialImages, getPublicProducts } from '@/lib/catalog';
import { images } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Wellness en Atacama' };

export default async function Page() {
  const [products, sheets] = await Promise.all([getPublicProducts(), getEditorialImages('editorial/bienestar/')]);
  const wellness = products.filter((product) => ['SPA / Terapias', 'Salud', 'Procedimientos'].includes(product.category));
  const refuge = sheets.find((image) => image.storage_path.endsWith('01_el_refugio_del_ser.jpg'));
  const matrix = sheets.find((image) => image.storage_path.endsWith('03_salud_wellness.jpg'));

  return <>
    <section className="page-hero image-hero"><img src={images.water} alt="Bienestar en Atacama" /><div className="hero-shade" /><div><div className="eyebrow light">El Refugio del Ser</div><h1>Bienestar inmersivo<br />en el desierto.</h1><p>El viaje también puede ser una oportunidad para bajar el ritmo, recuperar el cuerpo y volver a escuchar.</p></div></section>
    <EditorialSheet image={refuge} className="sheet-wide" />
    <section className="section"><div className="split"><h2>Bienestar que se integra al viaje.</h2><p>La propuesta LAMA contempla termas, terapias y soporte profesional coordinado según disponibilidad. Las fichas de servicio que ves abajo se alimentan directamente del catálogo público de Supabase.</p></div>{wellness.length > 0 && <div className="experience-grid">{wellness.slice(0, 9).map((product) => <ExperienceCard key={product.product_slug} product={product} />)}</div>}<div className="center-cta"><Link className="button button-dark" href="/contacto">Diseñar una estadía wellness</Link></div></section>
    <EditorialSheet image={matrix} className="sheet-contained" />
  </>;
}
