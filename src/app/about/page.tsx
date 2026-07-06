'use client'
import { useEffect, useState } from 'react'
import "../scss/about.scss"
import TeamCardComponent from '../component/TeamCardComponent'
import { TeamMember } from '../types/TeamMember'
import Reveal from '../component/Reveal'

export default function About() {

    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getTeam = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('/api/team');

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data: TeamMember[] = await response.json();
                setTeam(data);

            } catch (error) {
                console.error("Erreur lors de la récupération de l'équipe :", error);
            } finally {
                setIsLoading(false);
            }
        };

        getTeam();
    }, []);

    return (
        <main className="about">
            {/* ── 1. HISTOIRE + STATS ──────────────────────────────────────── */}
            <section className="about-story">
                <Reveal variant="left" className="about-story__image-col">
                    <div className="about-story__img-wrap">
                        <img src="/images/about-story.jpg" alt="Lia Cuisine" />
                    </div>
                </Reveal>

                <Reveal variant="right" delay={150} className="about-story__text-col">
                    <span className="about__eyebrow">Notre Histoire</span>
                    <h2 className="about__title">
                        Des racines<br />
                        <span className="about__title--accent">profondes</span>
                    </h2>
                    <div className="about__divider" />

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt.
                    </p>

                    <div className="about-story__stats">
                        <div className="about-story__stat about-story__stat--dark">
                            <span className="about-story__stat-icon">⭐</span>
                            <span className="about-story__stat-number">4,6★</span>
                            <span className="about-story__stat-label">233 avis Google</span>
                        </div>
                        <div className="about-story__stat about-story__stat--rose">
                            <span className="about-story__stat-icon">💰</span>
                            <span className="about-story__stat-number">20–30$</span>
                            <span className="about-story__stat-label">Par personne</span>
                        </div>
                        <div className="about-story__stat about-story__stat--rose">
                            <span className="about-story__stat-icon">🍽️</span>
                            <span className="about-story__stat-number">100%</span>
                            <span className="about-story__stat-label">Recettes authentiques</span>
                        </div>
                        <div className="about-story__stat about-story__stat--dark">
                            <span className="about-story__stat-icon">📍</span>
                            <span className="about-story__stat-number">Gatineau</span>
                            <span className="about-story__stat-label">693 Bd Saint-Joseph</span>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ── 2. VALEURS (section sombre) ──────────────────────────────── */}
            <section className="about-values">
                <div className="about-values__inner">
                    <Reveal variant="left" className="about-values__left">
                        <span className="about__eyebrow about__eyebrow--light">Ce qui nous guide</span>
                        <h2 className="about__title about__title--white">
                            L'art de la<br />patience
                        </h2>
                        <p className="about-values__intro">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <ul className="about-values__list">
                            <li className="about-values__item">
                                <span className="about-values__item-icon">🔥</span>
                                <div>
                                    <strong>Lorem ipsum dolor</strong>
                                    <p>
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </li>
                            <li className="about-values__item">
                                <span className="about-values__item-icon">♨️</span>
                                <div>
                                    <strong>Consectetur adipiscing</strong>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </Reveal>
                    <Reveal variant="right" delay={150} className="about-values__right">
                        <div className="about-values__img-wrap">
                            <img src="/images/about-cooking.jpg" alt="Cuisine Lia Cuisine" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 3. PROMESSES ─────────────────────────────────────────────── */}
            <section className="about-promises">
                <Reveal variant="up">
                    <span className="about__eyebrow">Nos engagements</span>
                    <h2 className="about__title about__title--center">Nos Promesses</h2>
                    <div className="about__divider about__divider--center" />
                </Reveal>
                <div className="about-promises__grid">
                    <Reveal variant="zoom" delay={0}>
                        <div className="about-promises__card">
                            <span className="about-promises__icon">⭐</span>
                            <h3>Authenticité</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal variant="zoom" delay={120}>
                        <div className="about-promises__card">
                            <span className="about-promises__icon">🌿</span>
                            <h3>Fraîcheur</h3>
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal variant="zoom" delay={240}>
                        <div className="about-promises__card">
                            <span className="about-promises__icon">🤝</span>
                            <h3>Hospitalité</h3>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 4. ÉQUIPE ────────────────────────────────────────────────── */}
            <section className="about-team">
                <Reveal variant="up">
                    <div className="about-team__header">
                        <span className="about__eyebrow">L&apos;âme de Lia Cuisine</span>
                        <h2 className="about__title about__title--center">Notre Équipe</h2>
                        <p className="about-team__sub">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                </Reveal>

                {isLoading ? (
                    <div className="specials-loading">
                        <svg className="specials-loading__spinner" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
                        </svg>
                        <span>Chargement de l&apos;équipe...</span>
                    </div>
                ) : team.length > 0 ? (
                    <div className="about-team__grid">
                        {team.map((member, index) => (
                            <Reveal key={member.name} variant="up" delay={index * 120}>
                                <TeamCardComponent member={member} />
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    <p className="specials-empty">Aucun membre d&apos;équipe disponible pour le moment.</p>
                )}
            </section>

        </main>
    );
}