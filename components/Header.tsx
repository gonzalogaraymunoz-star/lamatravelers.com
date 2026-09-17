'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`${styles.header} site-header`}>
        <div className={`${styles.wrap} nav-wrap`}>
          <Link className={`${styles.brand} brand`} href="/" aria-label="LAMA Travelers inicio" onClick={close}>
            <img src="/lama-logo.svg" alt="LAMA Travelers" />
          </Link>

          <button
            className={styles.menu}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="site-menu-panel"
          >
            <span>{open ? 'Cerrar' : 'Menú'}</span>
            <span className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <button
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        aria-label="Cerrar menú"
        tabIndex={open ? 0 : -1}
        onClick={close}
      />

      <aside
        id="site-menu-panel"
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        aria-hidden={!open}
      >
        <div className={styles.panelInner}>
          <div className={styles.group}>
            <span className={styles.label}>Explora</span>
            <Link href="/experiencias" onClick={close}>Experiencias</Link>
            <Link href="/colecciones" onClick={close}>Colecciones</Link>
            <Link href="/alta-montana" onClick={close}>Alta montaña</Link>
          </div>

          <div className={styles.group}>
            <span className={styles.label}>Planifica</span>
            <Link href="/viajes-a-medida" onClick={close}>A tu medida</Link>
            <Link href="/contacto" onClick={close}>Contacto</Link>
          </div>

          <div className={styles.groupSmall}>
            <span className={styles.label}>Complementos</span>
            <Link href="/transfers" onClick={close}>Traslados y logística</Link>
          </div>

          <div className={styles.panelFooter}>
            <a className={styles.sales} href={site.salesWhatsAppUrl} target="_blank" rel="noreferrer" onClick={close}>
              WhatsApp ventas <span>↗</span>
            </a>
            <span className={styles.location}>San Pedro de Atacama · Chile</span>
          </div>
        </div>
      </aside>
    </>
  );
}
