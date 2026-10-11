export default function TrasladosOrbitaOct() {
  const dm = "https://ig.me/m/lamatravelers";
  return <div className="orbita-landing">
    <style>{`
      body:has(.orbita-landing) header,body:has(.orbita-landing) nav,body:has(.orbita-landing) footer,body:has(.orbita-landing) a[href*="wa.me"],body:has(.orbita-landing) a[href*="api.whatsapp.com"]{display:none!important}
      body:has(.orbita-landing) main{padding:0!important;max-width:none!important}
      html{scroll-behavior:smooth}
      .orbita-landing{min-height:100vh;background:#08090e;color:#fff;font-family:Arial,Helvetica,sans-serif}
      .orbita-hero{position:relative;width:100%;max-width:1448px;margin:0 auto;aspect-ratio:1448/1086;background:#08090e url("https://lpirjwifzosdzgdncsbt.supabase.co/functions/v1/publish-orbita-poster") center/100% 100% no-repeat;overflow:hidden}
      .orbita-hotspot{position:absolute;display:block;z-index:2;border-radius:40px;cursor:pointer}
      .orbita-hotspot:focus-visible{outline:3px solid #fff;outline-offset:4px;background:#ffffff20}
      .orbita-dm-top{top:2.5%;right:8.4%;width:12.3%;height:5.2%}
      .orbita-menu{top:2.5%;right:2.4%;width:4.7%;height:5.5%}
      .orbita-dm-main{top:69.5%;left:33.3%;width:33.5%;height:10.5%}
      .orbita-fares{max-width:960px;margin:auto;padding:42px 20px 75px;text-align:center}
      .orbita-fares h1{font-size:clamp(25px,4vw,42px);margin:0 0 10px;font-weight:900}
      .orbita-subtitle{color:#dfd5ce;font-size:16px;margin:0}
      .orbita-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:26px auto}
      .orbita-fare{border:1px solid #bd4a24;border-radius:16px;background:#141014;padding:25px 12px}
      .orbita-fare strong{display:block;font-size:clamp(32px,5vw,50px);color:#ff631e;margin:12px 0}
      .orbita-fare span{font-size:14px;color:#e7d8d1;line-height:1.5}
      .orbita-cta{display:block;max-width:520px;margin:25px auto 0;padding:20px 18px;background:#ff5b18;color:white!important;text-decoration:none;font-size:22px;font-weight:900;border-radius:60px}
      .orbita-cta:hover{background:#ff7637}
      .orbita-note{font-size:13px;color:#bfb2ac;margin-top:18px}
      @media(max-width:600px){.orbita-grid{grid-template-columns:1fr}.orbita-fares{padding:30px 15px 55px}.orbita-dm-top{right:8%;width:13%}.orbita-cta{font-size:19px}}
    `}</style>
    <section className="orbita-hero" aria-label="Órbita Primer Aniversario, Planeta Perreo: traslado en San Pedro de Atacama">
      <a className="orbita-hotspot orbita-dm-top" href={dm} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por Instagram"/>
      <a className="orbita-hotspot orbita-menu" href="#tarifas" aria-label="Ver tarifas de traslado"/>
      <a className="orbita-hotspot orbita-dm-main" href={dm} target="_blank" rel="noopener noreferrer" aria-label="Reserva tu traslado por mensaje directo de Instagram"/>
    </section>
    <section className="orbita-fares" id="tarifas">
      <h1>RESERVA TU TRASLADO</h1>
      <p className="orbita-subtitle">Ida o regreso · Valores por tramo</p>
      <div className="orbita-grid">
        <div className="orbita-fare">PRIVADO<strong>$5.000</strong><span>Por persona · Hasta 4 cupos<br/>Vehículo completo: $20.000</span></div>
        <div className="orbita-fare">COMPARTIDO<strong>$4.000</strong><span>Por persona · Hasta 10 cupos</span></div>
      </div>
      <a className="orbita-cta" href={dm} target="_blank" rel="noopener noreferrer">ESCRÍBENOS AL DM ↗</a>
      <p className="orbita-note">Prioridad con reserva previa. Cupos sujetos a disponibilidad. Reserva confirmada con pago.</p>
    </section>
  </div>;
}