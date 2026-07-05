// app/home/page.tsx — LIA CUISINE (v5 — fidèle maquette, palette rose-rouge)
"use client"
import "../scss/home.scss";
import Link from "next/link";
import DishCardComponent from '../component/DishCardComponent'
import { DishItem } from '../types/DishItem'
import menuBD from '../BD/menu.json'
import { useState, useEffect } from "react";
import Image from "next/image";


// ─── Types ────────────────────────────────────────────────
type HomeFormState = 'idle' | 'loading' | 'success' | 'error';

interface HomeFormData {
    name: string;
    email: string;
    message: string;
}

const INITIAL_HOME_FORM: HomeFormData = { name: '', email: '', message: '' };

export default function Home() {

    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // ── État du formulaire de contact ─────────────────────
    const [homeForm, setHomeForm] = useState<HomeFormData>(INITIAL_HOME_FORM);
    const [homeFormState, setHomeFormState] = useState<HomeFormState>('idle');

    useEffect(() => {
        const getDishes = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('api/menu')

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data: DishItem[] = await response.json();

                setDishes(data.slice(0, 4));
            } catch (error) {
                console.error("Erreur lors de la récupération des plats spéciaux :", error);
            } finally {
                setIsLoading(false);
            }
        };
        getDishes();
    }, []);

    // ── Mise à jour des champs ─────────────────────────────
    const handleHomeChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setHomeForm(prev => ({ ...prev, [name]: value }));
    };

    // ── Soumission vers /api/contact ───────────────────────
    const handleHomeSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHomeFormState('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prenom: homeForm.name,   // champ unique "nom complet"
                    nom: '(accueil)',      // identifie que ça vient du formulaire home
                    email: homeForm.email,
                    message: homeForm.message,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setHomeFormState('success');
                setHomeForm(INITIAL_HOME_FORM);
            } else {
                setHomeFormState('error');
            }
        } catch {
            setHomeFormState('error');
        }
    };

    return (
        <div className="home-page">

            {/* ══════════════════════════════════════════
          1. HERO — fond image sombre, texte gauche
             Badge Google Maps flottant haut-droite
      ══════════════════════════════════════════ */}
            <section className="hero">

                <div className="hero__badge">
                    <div className="badge__stars">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className="badge__score">4,6</div>
                    <div className="badge__count">231 avis Google</div>
                    <div className="badge__range">20–30 $ / personne</div>
                </div>

                <div className="hero__content">
                    <p className="section-eyebrow hero__eyebrow">Cuisine africaine authentique</p>
                    <h1 className="hero__title">
                        L'Art Culinaire<br />
                        <em>Congolaise</em>
                    </h1>
                    <p className="hero__subtitle">
                        Une expérience gastronomique unique au cœur de Gatineau —
                        saveurs d'Afrique centrale, ambiance chaleureuse,
                        recettes transmises de génération en génération.
                    </p>
                    <div className="hero__actions">
                        <Link href="/kart" className="btn btn--rouge-plein">Commander</Link>
                        <Link href="/menu" className="btn btn--outline-blanc">Menu</Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
          2. FEATURE STRIP
      ══════════════════════════════════════════ */}
            <section className="features">
                <div className="features__grid">

                    <div className="feature-row">
                        <div className="feature-card__img">
                            <Image
                                src="/image/images_1.jpg"
                                alt="La salle Lia Cuisine"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="feature-card__body" id="feature-card__body_right">
                            <h3>Une salle où il fait bon se retrouver</h3>
                            <p>
                                Décorée avec soin, notre salle allie chaleur africaine et
                                modernité. Que ce soit en famille, entre amis ou pour une
                                occasion spéciale, Lia Cuisine vous accueille dans une
                                ambiance unique au 693 Bd Saint-Joseph, Gatineau.
                            </p>
                            <Link href="/galerie" className="feature-cta">
                                Apprendre encore plus
                            </Link>
                        </div>
                    </div>

                    <div className="feature-row">
                        <div className="feature-card__body" id="feature-card__body_left">
                            <h3>Des saveurs qui traversent les frontières</h3>
                            <p>
                                Chaque plat est préparé avec des épices soigneusement
                                sélectionnées et des recettes authentiques d'Afrique
                                centrale. Poulet Moambé, Garba, Attièké — une cuisine
                                de cœur, fidèle aux traditions.
                            </p>
                            <Link href="/menu" className="btn--lien-rose">
                                Apprendre encore plus
                            </Link>
                        </div>
                        <div className="feature-card__img">
                            <Image
                                src="/image/lia-cuisine-food2.jpg"
                                alt="Nos plats maison"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════
          3. PLATS SPÉCIAUX
      ══════════════════════════════════════════ */}
            <section className="specials">
                <div className="specials__header">
                    <h2>Nos plats spéciaux</h2>
                </div>

                <div className="specials__grid">
                    {(menuBD as DishItem[]).slice(0, 4).map((dish, index) => (
                        <DishCardComponent key={index} dish={dish} index={index} />
                    ))}
                </div>

                <div className="specials__cta">
                    <Link href="/menu" className="btn-voir-plus">Voir plus</Link>
                </div>
            </section>

            {/* ══════════════════════════════════════════
          4. ABOUT SPLIT
      ══════════════════════════════════════════ */}
            <section className="about-split">
                <div className="about-split__inner">

                    <div className="about-split__img-wrap">
                        <div className="img-main">
                            {/* ← <img src="/images/famille.jpg" alt="La famille Lia Cuisine" /> */}
                        </div>
                        <div className="img-badge">
                            <strong>4,6</strong>
                            <span className="badge-label">sur Google</span>
                            <span className="badge-count">231 avis</span>
                        </div>
                    </div>

                    <div className="about-split__text">
                        <h2>
                            Comment pouvons-nous<br />
                            travailler ensemble
                        </h2>
                        <p>
                            Lia Cuisine est né d'un amour profond pour la gastronomie
                            africaine et du désir de partager les richesses culinaires
                            du Congo et d'Afrique centrale avec la communauté de Gatineau.
                            Chaque plat est une histoire, chaque repas un moment de partage.
                        </p>

                        <div className="review-quote">
                            <div className="stars">★★★★★</div>
                            <blockquote>
                                "Lia Cuisine est une véritable pépite culinaire qui séduit
                                dès la première bouchée. Les plats sont préparés avec soin,
                                mettant en valeur des saveurs authentiques et généreuses."
                            </blockquote>
                            <cite>— Ibrahima S., il y a 5 mois</cite>
                        </div>

                        <Link href="/about" className="btn-about">
                            En savoir plus
                        </Link>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════
          5. WHY US
      ══════════════════════════════════════════ */}
            <section className="why-us">
                <div className="why-us__header">
                    <h2>Pourquoi choisir Lia Cuisine</h2>
                    <p>
                        Une cuisine authentique préparée avec passion, des ingrédients frais
                        sélectionnés chaque jour et l'héritage culinaire du Congo au cœur
                        de chaque assiette.
                    </p>
                </div>

                <div className="why-us__grid">

                    <div className="why-card">
                        <div className="why-card__icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </div>
                        <h3 className="why-card__title">Saveur Congolaise</h3>
                        <p className="why-card__desc">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
                        </p>
                        <Link href="/menu" className="why-card__link">Gagne Plus</Link>
                    </div>

                    <div className="why-card">
                        <div className="why-card__icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                        <h3 className="why-card__title">Produit Frais</h3>
                        <p className="why-card__desc">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
                        </p>
                        <Link href="/menu" className="why-card__link">Gagne Plus</Link>
                    </div>

                    <div className="why-card">
                        <div className="why-card__icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3 className="why-card__title">Ingrédients de Qualité</h3>
                        <p className="why-card__desc">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
                        </p>
                        <Link href="/menu" className="why-card__link">Gagne Plus</Link>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════
          6. CONNECTONS-NOUS — formulaire branché sur /api/contact
      ══════════════════════════════════════════ */}
            <section className="contact-band">
                <div className="contact-band__inner">

                    <h2 className="contact-band__heading">Connectons-nous</h2>

                    <div className="contact-band__infos">

                        <div className="contact-info">
                            <div className="contact-info__icon-wrap">
                                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <p className="contact-info__label">Notre restaurant</p>
                            <p className="contact-info__value">693 Bd Saint-Joseph<br />Gatineau, QC J8Y 4B4</p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-info__icon-wrap">
                                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                            <p className="contact-info__label">Numéro de téléphone</p>
                            <p className="contact-info__value"><a href="tel:+18195764927">(819) 576-4927</a></p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-info__icon-wrap">
                                <svg viewBox="0 0 24 24"><path d="M3 2h18v20H3zM9 7h6M9 12h6M9 17h4" /></svg>
                            </div>
                            <p className="contact-info__label">Services</p>
                            <p className="contact-info__value">Repas sur place<br />À emporter · Livraison</p>
                        </div>

                        <div className="contact-info">
                            <div className="contact-info__icon-wrap">
                                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            </div>
                            <p className="contact-info__label">Poster</p>
                            <p className="contact-info__value"><a href="mailto:bonjour@liacuisine.ca">bonjour@liacuisine.ca</a></p>
                        </div>

                    </div>

                    <div className="contact-band__bottom">

                        {/* ── Formulaire branché sur /api/contact ───── */}
                        <form className="contact-form" onSubmit={handleHomeSubmit} noValidate>
                            <h3>Des commentaires, suggestions</h3>
                            <p className="form-subtitle">Disponible 24 heures sur 24 !</p>

                            {/* Feedback succès */}
                            {homeFormState === 'success' && (
                                <p className="form-feedback form-feedback--success">
                                    ✓ Message envoyé avec succès !
                                </p>
                            )}

                            {/* Feedback erreur */}
                            {homeFormState === 'error' && (
                                <p className="form-feedback form-feedback--error">
                                    ✕ Une erreur est survenue. Réessayez ou appelez-nous.
                                </p>
                            )}

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Entrez votre nom"
                                    value={homeForm.name}
                                    onChange={handleHomeChange}
                                    disabled={homeFormState === 'loading'}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Entrez votre adresse courriel"
                                    value={homeForm.email}
                                    onChange={handleHomeChange}
                                    disabled={homeFormState === 'loading'}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Entrez votre message"
                                    value={homeForm.message}
                                    onChange={handleHomeChange}
                                    disabled={homeFormState === 'loading'}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-form"
                                disabled={homeFormState === 'loading'}
                            >
                                {homeFormState === 'loading' ? 'Envoi en cours…' : 'Soumettre'}
                            </button>
                        </form>

                        <div className="contact-map">
                            <h3>Nous sommes ici</h3>
                            <div className="map-hours">
                                MAR.–MER. 11H30–22H00 / JEU. 12H00–22H00 / VEN. 11H30–23H00 / SAM. 12H00–23H00 / DIM. 11H00–21H00 / LUN. FERMÉ.
                            </div>
                            <div className="map-frame">
                                {/*
                  ← Remplacez par votre vrai iframe :
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!...693+Bd+Saint-Joseph+Gatineau"
                    allowFullScreen
                    loading="lazy"
                  />
                */}
                                <span>693 Bd Saint-Joseph, Gatineau QC</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}