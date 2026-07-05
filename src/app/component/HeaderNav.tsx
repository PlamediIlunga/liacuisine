'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
    { href: '/home',      label: 'Accueil' },
    { href: '/menu',      label: 'Menu' },
    { href: '/galerie',   label: 'Galerie' },
    { href: '/evenement', label: 'Événements' },
    { href: '/about',     label: 'À Propos' },
    { href: '/contact',   label: 'Contact' },
] as const;

export default function HeaderNav() {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);
    const toggle = () => setOpen(prev => !prev);

    useEffect(() => {
        document.body.classList.toggle('nav-open', open);
        return () => document.body.classList.remove('nav-open');
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
                        <Link href="/kart" onClick={close}>
                            <button type="button">Commander</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
