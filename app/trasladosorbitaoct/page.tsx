import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Traslados Órbita · Planeta Perreo', description: 'Reserva tu traslado de ida y vuelta a Planeta Perreo en San Pedro de Atacama. Prioridad con reserva previa.' };
const dm = 'https://ig.me/m/lamatravelers';
export default function TrasladosOrbitaOct() {
return <section className="orbita-page">
<style>{`
body:has(.orbita-page) header,body:has(.orbita-page) footer,body:has(.orbita-page) .whatsapp-button,body:has(.orbita-page) a[href*="wa.me"],body:has(.orbita-page) a[href*="api.whatsapp.com"]{display:none!important}
body:has(.orbita-page) main{padding:0!important;max-width:none!important}
.orbita-page{min-height:100vh;background:#07090f;color:#fff;font-family:Arial,Helvetica,sans-serif;overflow:hidden}
.orbita-hero{min-height:88vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 75%,#9d310c55,transparent 55%),linear-gradient(180deg,#05080e 0%,#11121a 58%,#391509 100%);padding:60px 20px}
.orbita-hero:before{content:'';position:absolute;inset:0;background-image:url('/orbita-bg.webp');background-size:cover;background-position:center;opacity:.85}
.orbita-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#07090d22 0%,#07090d00 55%,#07090d 100%);pointer-events:none}
.orbita-hero-content{position:relative;z-index:1;width:min(900px,100%);text-shadow:0 3px 22px #000}
.orbita-eyebrow{font-size:clamp(13px,2vw,18px);letter-spacing:.22em;color:#ffb487;font-weight:700}
.orbita-hero h1{font-size:clamp(64px,11vw,150px);font-weight:900;letter-spacing:-.06em;line-height:1;margin:28px 0 0;color:#ff5a16}
.orbita-hero h2{font-size:clamp(26px,5vw,60px);font-weight:900;line-height:1.1;margin:10px 0 25px}
.orbita-hero p{font-size:clamp(16px,2vw,21px);margin:0 auto 25px;max-width:680px}
.orbita-cta{display:inline-block;border:0;border-radius:60px;background:#ff5a16;color:#fff!important;font-weight:900;text-decoration:none;padding:19px 35px;font-size:clamp(18px,2.5vw,25px);box-shadow:0 9px 30px #0009}
.orbita-prices{max-width:920px;margin:-30px auto 0;position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 20px}
.orbita-price{background:#160e0b;border:1px solid #b44722;border-radius:18px;text-align:center;padding:28px 15px}
.orbita-price small{display:block;letter-spacing:.15em;font-weight:700;color:#ffad83}
.orbita-price strong{display:block;font-size:clamp(42px,6vw,70px);margin:8px 0;color:#fff}
.orbita-price span{color:#f0d6c9}
.orbita-bottom{text-align:center;padding:30px 20px 75px;color:#d9c4b8}
.orbita-bottom p{margin:0 auto 22px;max-width:650px;line-height:1.7}
@media(max-width:650px){.orbita-prices{grid-template-columns:1fr}.orbita-hero{min-height:78vh;padding:45px 18px}.orbita-hero:before{background-position:50% center}.orbita-hero h1{font-size:clamp(52px,14vw,85px)}}
`}</style>
<div className="orbita-hero"><div className="orbita-hero-content">
<div className="orbita-eyebrow">ÓRBITA · PRIMER ANIVERSARIO</div>
<h2>PLANETA PERREO</h2><h1>TRASLADO</h1>
<p style={{letterSpacing:'.25em',fontWeight:800}}>IDA Y VUELTA</p>
<p>Prioridad con reserva previa · Cupos limitados</p>
<a className="orbita-cta" href="https://ig.me/m/lamatravelers" target="_blank" rel="noopener noreferrer">ESCRÍBENOS AL DM ↗</a>
</div></div>
<div className="orbita-prices">
<div className="orbita-price"><small>PRIVADO</small><strong>$20.000</strong><span>Precio fijo · Hasta 4 pasajeros</span></div>
<div className="orbita-price"><small>COMPARTIDO</small><strong>$5.000</strong><span>Por persona · Hasta 10 cupos</span></div>
</div>
<div className="orbita-bottom"><p>Reserva tu traslado para Planeta Perreo en San Pedro de Atacama. Escríbenos «ÓRBITA» por Instagram e indica el número de pasajeros. Confirmación sujeta a disponibilidad y pago validado.</p><a className="orbita-cta" href="https://ig.me/m/lamatravelers" target="_blank" rel="noopener noreferrer">RESERVAR POR INSTAGRAM ↗</a></div>
</section>;
}
