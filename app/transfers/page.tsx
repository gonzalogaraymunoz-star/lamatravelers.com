import Link from 'next/link';
import ExperienceCard from '@/components/ExperienceCard';
import EditorialSheet from '@/components/EditorialSheet';
import { getEditorialImages, getPublicProducts } from '@/lib/catalog';
import { images, site } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Transfers y transporte' };

export default async function Page() {
  const [products, sheets] = await Promise.all([getPublicProducts(), getEditorialImages('editorial/transporte/')]);
  const transfers = products.filter((product) => product.category === 'Transporte');
  const mobility = sheets.find((image) => image.storage_path.endsWith('01_movilidad_logistica_corporativa.jpg'));
  const essential = sheets.find((image) => image.storage_path.endsWith('03_conectividad_esencial.jpg'));
  const wa = `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent('Hola LAMA, quiero cotizar un transfer en Atacama.')}`;

  return <>
    <section className="page-hero image-hero"><img src={images.transport} alt="Transporte en Atacama" /><div className="hero-shade" /><div><div className="eyebrow light">Conectividad esencial</div><h1>El desierto es impredecible.<br />Tu logística, no.</h1><p>Traslados coordinados para conectar aeropuerto, alojamiento, frontera y rutas locales.</p></div></section>
    <EditorialSheet image={mobility} className="sheet-wide" />
    <section className="section"><div className="section-head"><div><div className="eyebrow">Movilidad LAMA</div><h2>Conoce cada traslado.</h2></div><p className="section-copy">Aeropuerto, Hito Cajón y movilidad dentro de San Pedro se consultan como productos independientes dentro del mismo catálogo.</p></div><div className="experience-grid">{transfers.map((product) => <ExperienceCard key={product.product_slug} product={product} />)}</div><div className="center-cta"><a className="button button-dark" href={wa}>Cotizar traslado</a><Link className="button button-outline" href="/viajes-a-medida">Integrarlo al viaje</Link></div></section>
    <EditorialSheet image={essential} className="sheet-contained" />
  </>;
}
