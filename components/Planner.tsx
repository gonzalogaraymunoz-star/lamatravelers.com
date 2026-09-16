'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { site } from '@/lib/site';
import styles from './Planner.module.css';

const intakeUrl = 'https://lpirjwifzosdzgdncsbt.supabase.co/functions/v1/lama-web-lead-intake';

function localToday(){
  const d=new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function formatDate(value:string){
  if(!value) return 'por definir';
  return new Intl.DateTimeFormat('es-CL',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(`${value}T00:00:00Z`));
}

function makeRequestId(){
  if(typeof crypto!=='undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `req_${Date.now()}_${Math.random().toString(36).slice(2,10)}`;
}

export default function Planner(){
  const [checkin,setCheckin]=useState('');
  const [checkout,setCheckout]=useState('');
  const [pax,setPax]=useState('2');
  const [interest,setInterest]=useState('Paisajes y clásicos');
  const [website,setWebsite]=useState('');
  const [submitting,setSubmitting]=useState(false);
  const [status,setStatus]=useState('');
  const requestId=useRef<string>('');
  const today=localToday();

  const nights=useMemo(()=>{
    if(!checkin || !checkout || checkout<checkin) return null;
    const diff=(Date.parse(`${checkout}T00:00:00Z`)-Date.parse(`${checkin}T00:00:00Z`))/86400000;
    return Math.max(0,Math.round(diff));
  },[checkin,checkout]);

  function onCheckin(value:string){
    setCheckin(value);
    if(checkout && checkout<value) setCheckout('');
  }

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setStatus('');
    if(!checkin || !checkout){setStatus('Selecciona llegada y salida.');return;}
    if(checkout<checkin){setStatus('La salida no puede ser anterior a la llegada.');return;}

    if(!requestId.current) requestId.current=makeRequestId();
    setSubmitting(true);

    const pendingWindow=window.open('about:blank','_blank');
    if(pendingWindow){
      pendingWindow.document.title='LAMA Travelers';
      pendingWindow.document.body.innerHTML='<p style="font-family:Arial,sans-serif;padding:24px">Preparando tu conversación con ventas…</p>';
    }

    let leadCode='';
    let registered=false;
    try{
      const response=await fetch(intakeUrl,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          checkin,
          checkout,
          pax:Number(pax),
          interest,
          request_id:requestId.current,
          website,
        }),
      });
      const data=await response.json().catch(()=>({}));
      if(response.ok && data?.lead_code){
        leadCode=String(data.lead_code);
        registered=true;
        setStatus(`Solicitud ${leadCode} registrada. Abrimos WhatsApp para continuar.`);
      }else{
        setStatus('Abrimos WhatsApp, pero el registro interno quedó pendiente. Ventas podrá continuarlo manualmente.');
      }
    }catch{
      setStatus('Abrimos WhatsApp, pero el registro interno quedó pendiente. Ventas podrá continuarlo manualmente.');
    }

    const message=[
      'Hola LAMA, quiero planificar mi viaje a San Pedro de Atacama.',
      leadCode?`Código web: ${leadCode}.`:null,
      `Fechas: ${formatDate(checkin)} al ${formatDate(checkout)}.`,
      `Pasajeros: ${pax}.`,
      `Interés: ${interest}.`,
    ].filter(Boolean).join(' ');
    const separator=site.salesWhatsAppUrl.includes('?')?'&':'?';
    const whatsappUrl=`${site.salesWhatsAppUrl}${separator}text=${encodeURIComponent(message)}`;

    if(pendingWindow){
      pendingWindow.location.href=whatsappUrl;
    }else{
      window.location.href=whatsappUrl;
    }

    if(!registered) requestId.current='';
    setSubmitting(false);
  }

  return <form className={styles.planner} onSubmit={submit}>
    <div className={styles.dateBlock}>
      <label>¿Cuándo vienes?</label>
      <div className={styles.dateRange}>
        <div className={styles.dateField}>
          <span>Llegada</span>
          <input aria-label="Fecha de llegada" type="date" min={today} value={checkin} onChange={e=>onCheckin(e.target.value)} required />
        </div>
        <span className={styles.arrow}>→</span>
        <div className={styles.dateField}>
          <span>Salida</span>
          <input aria-label="Fecha de salida" type="date" min={checkin || today} value={checkout} onChange={e=>setCheckout(e.target.value)} required />
        </div>
      </div>
      {nights!==null && <small className={styles.stay}>{nights} {nights===1?'noche':'noches'} · {nights+1} {nights+1===1?'día':'días'}</small>}
    </div>

    <div className={styles.field}>
      <label htmlFor="planner-pax">¿Cuántos viajan?</label>
      <select id="planner-pax" value={pax} onChange={e=>setPax(e.target.value)}>
        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8+</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="planner-interest">¿Qué te mueve?</label>
      <select id="planner-interest" value={interest} onChange={e=>setInterest(e.target.value)}>
        <option>Paisajes y clásicos</option><option>Aventura y trekking</option><option>Alta montaña</option><option>Cielo y astronomía</option><option>Cultura local</option><option>Wellness y descanso</option><option>Un poco de todo</option>
      </select>
    </div>

    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="planner-website">Website</label>
      <input id="planner-website" tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} />
    </div>

    <button className={`button button-dark ${styles.submit}`} type="submit" disabled={submitting}>{submitting?'Registrando…':'Hablar con ventas'}</button>

    <div className={styles.meta}>
      <span>Tus fechas y preferencias quedan asociadas a una solicitud LAMA antes de abrir WhatsApp, para no empezar de cero en ventas.</span>
      <p className={styles.status} aria-live="polite">{status}</p>
    </div>
  </form>;
}
