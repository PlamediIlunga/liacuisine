'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
    { href: '/',      label: 'Accueil' },
    { href: '/menu',      label: 'Menu' },
    { href: '/galerie',   label: 'Galerie' },
  //{ href: '/evenement', label: 'Événements' },
    { href: '/about',     label: 'À Propos' },
    { href: '/contact',   label: 'Contact' },
] as const;

export default function HeaderNav() {
    const [open, setOpen] = useState(false);
    const scrollY = useRef(0);

    const close = () => setOpen(false);
    const toggle = () => setOpen(prev => !prev);

    // Verrouillage de scroll fiable pour iOS Safari
    useEffect(() => {
        if (open) {
            scrollY.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY.current}px`;
            document.body.style.width = '100%';
            document.body.classList.add('nav-open');
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.classList.remove('nav-open');
            window.scrollTo(0, scrollY.current);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.classList.remove('nav-open');
        };
    }, [open]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 1024) close();
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <button
                type="button"
                className={`header__burger${open ? ' header__burger--open' : ''}`}
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={open}
                aria-controls="header-nav-drawer"
                onClick={toggle}
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </button>

            <div
                className={`header__overlay${open ? ' header__overlay--visible' : ''}`}
                aria-hidden={!open}
                onClick={close}
            />

            <nav
                id="header-nav-drawer"
                className={`header__nav${open ? ' header__nav--open' : ''}`}
                aria-hidden={!open}
            >
                <ul className="nav-list">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} onClick={close}>{label}</Link>
                        </li>
                    ))}
                    <li className="li_commande">
                        <Link href="https://www.ubereats.com/store-browse-uuid/983bca0c-a802-43fc-b484-48c1024f5b15?diningMode=DELIVERY" onClick={close}>
                            <button type="button">Commander</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}