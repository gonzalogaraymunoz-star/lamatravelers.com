import ExperienceCard from '@/components/ExperienceCard';
import { getPublicProducts } from '@/lib/catalog';
import { images } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Alta montaña' };

export default async function Page() {
  const products = await getPublicProducts();
  const mountain = products.filter((product) => product.product_slug === 'cerro_toco' || /toco|lascar|sairecabur/i.test(product.name));
  return <>
    <section className="page-hero image-hero"><img src={images.mountain} alt="Alta montaña en Atacama" /><div className="hero-shade" /><div><div className="eyebrow light">Ascensiones</div><h1>La montaña empieza<br />antes de la cumbre.</h1><p>Preparación, aclimatación, condiciones y una decisión responsable sobre cuándo subir.</p></div></section>
    <section className="section"><div className="split"><h2>Ascensiones en Atacama.</h2><p>Las salidas se confirman considerando condiciones del pasajero y del territorio. En alta montaña, la seguridad y la aclimatación están por encima del itinerario.</p></div>{mountain.length > 0 && <div className="experience-grid">{mountain.map((product) => <ExperienceCard key={product.product_slug} product={product} />)}</div>}</section>
  </>;
}
