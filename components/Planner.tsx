'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

export default function Planner(){
  const [dates,setDates]=useState(''); const [pax,setPax]=useState('2'); const [interest,setInterest]=useState('Paisajes y clásicos');
  return <div className="planner">
    <div><label>¿Cuándo vienes?</label><input value={dates} onChange={e=>setDates(e.target.value)} placeholder="Ej. 12–16 octubre" /></div>
    <div><label>¿Cuántos viajan?</label><select value={pax} onChange={e=>setPax(e.target.value)}><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div>
    <div><label>¿Qué te mueve?</label><select value={interest} onChange={e=>setInterest(e.target.value)}><option>Paisajes y clásicos</option><option>Aventura y trekking</option><option>Alta montaña</option><option>Cielo y astronomía</option><option>Cultura local</option><option>Wellness y descanso</option><option>Un poco de todo</option></select></div>
    <a className="button button-dark" href={site.salesWhatsAppUrl} target="_blank" rel="noreferrer">Hablar con ventas</a>
  </div>
}
