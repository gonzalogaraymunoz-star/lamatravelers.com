'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="LAMA Travelers inicio">
          <img src="/lama-logo.svg" alt="LAMA Travelers" />
        </Link>
        <nav className={open ? 'nav open' : 'nav'}>
          <Link href="/experiencias" onClick={() => setOpen(false)}>Experiencias</Link>
          <Link href="/colecciones" onClick={() => setOpen(false)}>Colecciones</Link>
          <Link href="/viajes-a-medida" onClick={() => setOpen(false)}>A tu medida</Link>
          <Link href="/transfers" onClick={() => setOpen(false)}>Transfers</Link>
          <Link href="/wellness" onClick={() => setOpen(false)}>Wellness</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          <a className="nav-sales" href={site.salesWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp</a>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? 'Cerrar' : 'Menú'}</button>
      </div>
    </header>
  );
}
