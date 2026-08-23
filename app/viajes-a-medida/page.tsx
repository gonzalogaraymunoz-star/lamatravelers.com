import Planner from '@/components/Planner';
import { images } from '@/lib/site';
export const metadata={title:'Viajes a medida'};
export default function Page(){return <>
  <section className="page-hero image-hero"><img src={images.desert} alt="San Pedro de Atacama"/><div className="hero-shade"/><div><div className="eyebrow light">Diseño de viaje</div><h1>Tus días son limitados.<br/>Tu itinerario no tiene por qué ser genérico.</h1><p>Ordenamos altura, horarios, descansos y experiencias para que el viaje tenga ritmo.</p></div></section>
  <section className="section"><div className="split"><h2>Primero entendemos tu viaje.<br/>Después elegimos los tours.</h2><p>Fechas, número de pasajeros, vuelos, alojamiento, experiencia previa en altura, intereses y nivel de actividad cambian por completo una buena recomendación.</p></div><div className="steps"><div><span>01</span><h3>Contexto</h3><p>Fechas, vuelos, pasajeros y alojamiento.</p></div><div><span>02</span><h3>Ritmo</h3><p>Qué te interesa y cuánto quieres moverte.</p></div><div><span>03</span><h3>Secuencia</h3><p>Ordenamos experiencias, transfers y descanso.</p></div><div><span>04</span><h3>Confirmación</h3><p>Validamos disponibilidad y recién ahí cerramos.</p></div></div></section>
  <section className="section plan-section"><div className="eyebrow">Cuéntanos lo básico</div><h2>Construyamos la primera versión de tu viaje.</h2><Planner/></section>
</>}
