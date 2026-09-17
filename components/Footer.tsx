import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer(){
  return <footer className="footer">
    <div className="footer-grid">
      <div><div className="footer-brand"><img src="/lama-logo.svg" alt="LAMA Travelers" /></div><p>Experiencias y expediciones en San Pedro de Atacama.</p><p className="muted">Registro SERNATUR vigente.</p></div>
      <div><span className="footer-label">Explora</span><Link href="/experiencias">Experiencias</Link><Link href="/colecciones">Colecciones</Link><Link href="/alta-montana">Alta montaña</Link></div>
      <div><span className="footer-label">Planifica</span><Link href="/viajes-a-medida">Viaje a tu medida</Link><Link href="/transfers">Traslados y logística</Link><Link href="/contacto">Contacto</Link><Link href="/guia/san-pedro-de-atacama">Guía de San Pedro</Link><Link href="/politicas/cancelaciones">Políticas y condiciones</Link></div>
      <div><span className="footer-label">Ventas</span><a href={site.salesWhatsAppUrl} target="_blank" rel="noreferrer">WhatsApp ventas</a><a href={`mailto:${site.email}`}>{site.email}</a><span>{site.location}</span></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} LAMA Travelers</span><span>Viajar bien empieza antes de salir.</span></div>
  </footer>
}
