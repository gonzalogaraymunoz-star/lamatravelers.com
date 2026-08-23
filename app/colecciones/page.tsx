import Link from 'next/link';
import EditorialSheet from '@/components/EditorialSheet';
import { getEditorialImages } from '@/lib/catalog';
import { images } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Colecciones' };

export default async function Page() {
  const sheets = await getEditorialImages('editorial/experiencial/');
  const matrix = sheets.find((image) => image.storage_path.endsWith('02_matriz_de_sintonia.jpg'));
  const luxury = sheets.find((image) => image.storage_path.endsWith('06_matriz_pack_luxury.jpg'));
  const adventure = sheets.find((image) => image.storage_path.endsWith('10_matriz_pack_adventure.jpg'));
  const origin = sheets.find((image) => image.storage_path.endsWith('18_origen_lickanantay.jpg'));

  return <>
    <section className="page-hero image-hero"><img src={images.altiplano} alt="Altiplano de Atacama" /><div className="hero-shade" /><div><div className="eyebrow light">Atacama Inmersivo</div><h1>Colecciones para habitar el desierto de distintas formas.</h1><p>No son paquetes rígidos. Son puntos de partida para construir una secuencia con intención.</p></div></section>
    <EditorialSheet image={matrix} className="sheet-wide" />
    <section className="section collections">
      <article><span>01</span><div><div className="eyebrow">Classic</div><h2>Los esenciales, bien hechos.</h2><p>Una lectura equilibrada de los paisajes emblemáticos: salar, valles, lagunas, géiseres y cielo.</p><Link className="text-link" href="/experiencias?categoria=Desierto">Explorar clásicos ↗</Link></div></article>
      <article><span>02</span><div><div className="eyebrow">Adventure</div><h2>El terreno como patio de juegos.</h2><p>Rutas y experiencias para moverse dentro del paisaje y construir una relación más activa con el territorio.</p><Link className="text-link" href="/experiencias">Explorar experiencias ↗</Link></div></article>
      <article><span>03</span><div><div className="eyebrow">Exclusive</div><h2>Más privacidad. Más tiempo. Menos ruido.</h2><p>Rutas adaptadas al ritmo del grupo y experiencias que pueden convertirse en una expedición privada.</p><Link className="text-link" href="/viajes-a-medida">Diseñar una ruta ↗</Link></div></article>
      <article><span>04</span><div><div className="eyebrow">Origen</div><h2>La cultura se transita.</h2><p>Propuestas de relación con el territorio que integran memoria, gastronomía y experiencias de raíz local.</p><Link className="text-link" href="/experiencias">Conocer productos ↗</Link></div></article>
    </section>
    <div className="sheet-pair"><EditorialSheet image={luxury} /><EditorialSheet image={adventure} /></div>
    <EditorialSheet image={origin} className="sheet-contained" />
  </>;
}
