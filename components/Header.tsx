'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={`${styles.header} site-header`}>
      <div className={`${styles.wrap} nav-wrap`}>
        <Link className="brand" href="/" aria-label="LAMA Travelers inicio">
          <img src="/lama-logo.svg" alt="LAMA Travelers" />
        </Link>
        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          <Link href="/experiencias" onClick={() => setOpen(false)}>Experiencias</Link>
          <Link href="/colecciones" onClick={() => setOpen(false)}>Colecciones</Link>
          <Link href="/alta-montana" onClick={() => setOpen(false)}>Alta montaña</Link>
          <Link href="/viajes-a-medida" onClick={() => setOpen(false)}>A tu medida</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          <a className={styles.sales} href={site.salesWhatsAppUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp</a>
        </nav>
        <button className={styles.menu} onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? 'Cerrar' : 'Menú'}</button>
      </div>
    </header>
  );
}
