import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Traslados Órbita · Planeta Perreo', description: 'Reserva tu traslado de ida y vuelta a Planeta Perreo en San Pedro de Atacama. Prioridad con reserva previa.' };
const dm = 'https://ig.me/m/lamatravelers';
export default function TrasladosOrbitaOct() {
return <div style={{background:'#08090d',color:'#fff',minHeight:'100vh',fontFamily:'Arial,Helvetica,sans-serif'}}>
<style>{` .orbita-wrap{max-width:1050px;margin:auto;padding:75px 22px 100px;text-align:center}.orbita-kicker{font-size:13px;letter-spacing:.32em;text-transform:uppercase;color:#ffb184}.orbita-title{font-size:clamp(46px,10vw,116px);line-height:.94;letter-spacing:-.055em;margin:22px 0;color:#ff5b1a;font-weight:900}.orbita-sub{font-size:clamp(18px,3vw,32px);letter-spacing:.2em}.orbita-desc{max-width:620px;margin:24px auto 40px;line-height:1.7;color:#d5d0cc}.orbita-prices{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:30px auto;max-width:760px}.orbita-prices>div{background:#22150e;border:1px solid #ff5b1a;border-radius:18px;padding:26px 16px}.orbita-prices small,.orbita-prices span{display:block;color:#e6c8b8}.orbita-prices strong{display:block;font-size:clamp(36px,5vw,58px);color:#ff6b24;margin:12px 0}.orbita-prices span{font-size:13px}.orbita-features{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:36px 0}.orbita-feature{border:1px solid #553a2d;border-radius:16px;padding:24px 12px;background:#171313}.orbita-feature strong{display:block;font-size:16px}.orbita-feature span{display:block;font-size:13px;color:#c9b9b1;margin-top:9px}.orbita-button{display:inline-block;padding:22px 35px;border-radius:50px;background:#ff5b1a;color:#111;text-decoration:none;font-size:19px;font-weight:900;box-shadow:0 0 45px #ff5b1a44}.orbita-note{font-size:13px;color:#b6aaa4;margin-top:22px}.orbita-planet{width:180px;height:180px;margin:0 auto 25px;border-radius:50%;background:radial-gradient(circle at 25% 25%,#ffb062,#f45319 48%,#6e180c 80%);box-shadow:0 0 90px #f6531955;position:relative}.orbita-planet:after{content:'';position:absolute;border:12px solid #ff9a3a88;border-radius:50%;width:270px;height:60px;left:-57px;top:55px;transform:rotate(-19deg)}@media(max-width:600px){.orbita-prices{grid-template-columns:1fr}.orbita-features{grid-template-columns:1fr}.orbita-wrap{padding-top:48px}}`}</style>
<div className="orbita-wrap">
<div className="orbita-planet" aria-hidden="true"/>
<div className="orbita-kicker">Órbita · Primer aniversario · 10 octubre 2026</div>
<p className="orbita-sub">PLANETA PERREO</p>
<h1 className="orbita-title">TRASLADO</h1>
<div className="orbita-sub">IDA Y VUELTA</div>
<p className="orbita-desc">Tú disfruta la fiesta. Nosotros nos encargamos del traslado. Servicio privado o compartido, sujeto a disponibilidad. Reserva con anticipación y asegura prioridad en la coordinación de tu viaje.</p>
<div className="orbita-prices"><div><small>TRASLADO PRIVADO</small><strong>$20.000</strong><span>Precio fijo por vehículo · máximo 4 pasajeros</span></div><div><small>TRASLADO COMPARTIDO</small><strong>$5.000</strong><span>Por persona · hasta 10 cupos</span></div></div><div className="orbita-features">
<div className="orbita-feature"><strong>IDA Y VUELTA</strong><span>Coordina tu traslado a la fiesta y tu regreso.</span></div>
<div className="orbita-feature"><strong>PRIVADO O COMPARTIDO</strong><span>Elige la alternativa que mejor se adapte a tu grupo.</span></div>
<div className="orbita-feature"><strong>RESERVA PREVIA</strong><span>Prioridad de coordinación. Cupos limitados.</span></div>
</div>
<a className="orbita-button" href={dm} target="_blank" rel="noopener noreferrer">ESCRÍBENOS AL DM ↗</a>
<p className="orbita-note">Envía «ÓRBITA», cantidad de pasajeros y horario deseado.<br/>La reserva queda confirmada una vez validado el pago y la disponibilidad.</p>
<p className="orbita-note" style={{marginTop:70}}>San Pedro de Atacama · Traslado operado por LAMA Travelers</p>
</div></div>;
}