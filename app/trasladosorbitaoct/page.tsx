'use client';
import { useState } from 'react';
const dm='https://ig.me/m/lamatravelers';
export default function TrasladosOrbitaOct(){const [service,setService]=useState<'privado'|'compartido'>('compartido');const [pax,setPax]=useState(1);const [trip,setTrip]=useState('ida-vuelta');const [time,setTime]=useState('');const max=service==='privado'?4:10;const legs=trip==='ida-vuelta'?2:1;const total=(service==='privado'?5000*pax:4000*pax)*legs;const message='ÓRBITA — Reserva '+service+' | '+pax+' pasajero(s) | '+trip+' | Horario: '+(time||'por coordinar')+' | Total referencial: $'+total.toLocaleString('es-CL')+'.';return <div className="orbita">
<style>{`
body:has(.orbita) header,body:has(.orbita) footer,body:has(.orbita) a[href*="wa.me"],body:has(.orbita) a[href*="api.whatsapp.com"]{display:none!important}body:has(.orbita) main{max-width:none!important;padding:0!important}
.orbita{background:#06090e;color:#fff;font-family:Arial,Helvetica,sans-serif;min-height:100vh}
.orbita-grid{max-width:1440px;margin:auto;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(350px,.8fr);gap:0}
.orbita-art{min-height:100vh;background:#080a12 url('/orbita-bg.webp') center top/cover no-repeat;position:relative}
.orbita-art:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 85%,#06090e)}
.orbita-panel{padding:55px clamp(22px,4vw,65px);background:#090b10;align-self:start;position:sticky;top:0;min-height:100vh;box-sizing:border-box}
.orbita-overline{color:#ff7134;letter-spacing:.22em;font-size:11px;font-weight:800}
.orbita-panel h1{font-size:clamp(30px,3.5vw,54px);line-height:1.05;margin:20px 0 10px}
.orbita-lead{color:#c7bfc0;font-size:14px;line-height:1.65}
.orbita-choices{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:30px 0}
.orbita-choice{background:#11151b;color:#fff;border:1px solid #434044;border-radius:12px;padding:17px 10px;text-align:left;cursor:pointer}
.orbita-choice[aria-pressed="true"]{border:2px solid #ff5a16;background:#27160f}
.orbita-choice strong{display:block;font-size:23px;margin:10px 0;color:#ff6a2b}
.orbita-choice span{font-size:12px;color:#c6bbba}
.orbita-field{display:block;margin:18px 0;font-size:12px;letter-spacing:.05em;color:#dfd5d0;font-weight:700}
.orbita-field select,.orbita-field input{display:block;width:100%;box-sizing:border-box;background:#15191e;border:1px solid #4b4442;border-radius:9px;color:#fff;padding:15px;margin-top:9px;font-size:16px}
.orbita-total{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #4d3830;margin-top:24px;padding-top:23px}
.orbita-total strong{font-size:32px}
.orbita-cta{display:block;width:100%;box-sizing:border-box;background:#ff5a16;color:#fff!important;text-decoration:none;text-align:center;border-radius:12px;padding:20px 14px;font-weight:900;font-size:17px;margin-top:24px}
.orbita-foot{color:#b9aaa4;font-size:12px;line-height:1.7;margin-top:15px}
.orbita-mobile-hero{display:none}
@media(max-width:850px){.orbita-grid{display:block}.orbita-art{min-height:0;aspect-ratio:16/11;background-size:cover;background-position:center 35%}.orbita-art:after{background:linear-gradient(180deg,transparent 65%,#090b10)}.orbita-panel{min-height:0;position:static;padding:30px 20px 60px}}
`}</style>
<div className="orbita-grid">
<div className="orbita-art" role="img" aria-label="Gráfica oficial Órbita Planeta Perreo: cielo estrellado, cordillera y traslado en Atacama"/>
<div className="orbita-panel"><div className="orbita-overline">ÓRBITA · PLANETA PERREO · 10 OCTUBRE</div>
<h1>Reserva tu traslado</h1><p className="orbita-lead">Traslados por tramo. Puedes reservar ida, regreso o ambos. Cupos limitados y prioridad con reserva previa.</p>
<div className="orbita-choices">
<button className="orbita-choice" aria-pressed={service==='privado'} onClick={()=>{setService('privado');setPax(Math.min(pax,4))}}><span>VEHÍCULO PRIVADO</span><strong>$5.000</strong><span>Por persona y tramo · hasta completar 4 cupos ($20.000 vehículo completo)</span></button>
<button className="orbita-choice" aria-pressed={service==='compartido'} onClick={()=>setService('compartido')}><span>COMPARTIDO</span><strong>$4.000</strong><span>Por persona y tramo · hasta 10 cupos</span></button>
</div>
<label className="orbita-field">PASAJEROS<select value={pax} onChange={e=>setPax(Number(e.target.value))}>{Array.from({length:max},(_,i)=><option key={i+1} value={i+1}>{i+1} {i===0?'persona':'personas'}</option>)}</select></label>
<label className="orbita-field">TRAYECTO<select value={trip} onChange={e=>setTrip(e.target.value)}><option value="ida-vuelta">Ida y vuelta</option><option value="ida">Solo ida (consultar disponibilidad)</option><option value="vuelta">Solo regreso (consultar disponibilidad)</option></select></label>
<label className="orbita-field">HORARIO PREFERIDO<input value={time} onChange={e=>setTime(e.target.value)} placeholder="Ej. 23:30 / regreso 04:00"/></label>
<div className="orbita-total"><span>TOTAL SEGÚN TRAYECTO</span><strong>$ {total.toLocaleString('es-CL')}</strong></div>
<a className="orbita-cta" href={dm} target="_blank" rel="noopener noreferrer" title={message}>ESCRÍBENOS AL DM ↗</a>
<p className="orbita-foot">Envía «ÓRBITA» y los datos seleccionados por mensaje directo. La selección no bloquea cupos ni realiza un cobro. Reserva confirmada únicamente después de validar disponibilidad y pago.</p>
</div></div></div>}
