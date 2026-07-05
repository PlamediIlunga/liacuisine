'use client';

import { useState } from 'react';
import { validateContactPayload } from '@/lib/contactValidation';
import '../scss/contact.scss';

// ─── Types ────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    prenom:  string;
    nom:     string;
    email:   string;
    message: string;
    website: string;
}

const INITIAL_FORM: FormData = {
    prenom:  '',
    nom:     '',
    email:   '',
    message: '',
    website: '',
};

// ─── Composant ────────────────────────────────────────────
export default function Contact() {
    const [formData, setFormData]   = useState<FormData>(INITIAL_FORM);
    const [formState, setFormState] = useState<FormState>('idle');
    const [formError, setFormError] = useState<string | null>(null);

    // ── Mise à jour des champs ─────────────────────────────
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ── Soumission ────────────────────────────────────────
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);

        const validation = validateContactPayload({
            prenom:  formData.prenom,
            nom:     formData.nom,
            email:   formData.email,
            message: formData.message,
            website: formData.website,
        });

        if (!validation.ok) {
            setFormError(validation.error);
            setFormState('error');
            return;
        }

        setFormState('loading');

        try {
            const response = await fetch('/api/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...validation.data,
                    website: formData.website,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setFormState('success');
                setFormData(INITIAL_FORM);
            } else {
                setFormError(result.error ?? null);
                setFormState('error');
            }
        } catch {
            setFormState('error');
        }
    };

    // ── Rendu ─────────────────────────────────────────────
    return (
        <section className="contact-section">

            {/* Hero banner */}
            <div className="contact-hero">
                <div className="contact-hero__left">
                    <h2 className="contact-hero__title">
                        Contactez<br />Lia Cuisine&nbsp;!
                    </h2>
                    <p className="contact-hero__subtitle">
                        Une question, une réservation ou simplement
                        l&apos;envie d&apos;en savoir plus ? Nous sommes là
                        et ravis de vous répondre.
                    </p>
                </div>

                <div className="contact-hero__right">
                    <p className="contact-hero__desc">
                        Vous pouvez aussi nous appeler directement au
                        <strong> (819) 576-4927</strong> ou nous rendre visite
                        au 693 Bd Saint-Joseph, Gatineau, QC J8Y 4B4.
                    </p>
                    <div className="contact-hero__icon" aria-hidden="true">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="30" x2="30" y2="10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <polyline points="16,10 30,10 30,24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Form wrapper avec blocs décoratifs */}
            <div className="contact-form-wrapper">
                <div className="blockRouge blockRouge--gauche" aria-hidden="true" />

                <div className="contact-card">
                    <h2 className="contact-card__title">Envoyez-nous un message</h2>

                    {/* ── Message de succès ─────────────────────── */}
                    {formState === 'success' && (
                        <div className="contact-feedback contact-feedback--success" role="alert">
                            <span className="contact-feedback__icon">✓</span>
                            <div>
                                <strong>Message envoyé avec succès !</strong>
                                <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                            </div>
                        </div>
                    )}

                    {/* ── Message d'erreur ──────────────────────── */}
                    {formState === 'error' && (
                        <div className="contact-feedback contact-feedback--error" role="alert">
                            <span className="contact-feedback__icon">✕</span>
                            <div>
                                <strong>Une erreur est survenue.</strong>
                                <p>{formError ?? 'Veuillez réessayer ou nous appeler au (819) 576-4927.'}</p>
                            </div>
                        </div>
                    )}

                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* Prénom + Nom */}
                        <div className="contact-form__row">
                            <div className="contact-form__field">
                                <label className="contact-form__label" htmlFor="prenom">
                                    Prénom <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className="contact-form__input"
                                    id="prenom"
                                    name="prenom"
                                    type="text"
                                    placeholder="Votre prénom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                    disabled={formState === 'loading'}
                                />
                            </div>
                            <div className="contact-form__field">
                                <label className="contact-form__label" htmlFor="nom">
                                    Nom <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    className="contact-form__input"
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    placeholder="Votre nom de famille"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                    disabled={formState === 'loading'}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="email">
                                Adresse courriel <span aria-hidden="true">*</span>
                            </label>
                            <input
                                className="contact-form__input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={formState === 'loading'}
                            />
                        </div>

                        {/* Message */}
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="message">
                                Message <span aria-hidden="true">*</span>
                            </label>
                            <textarea
                                className="contact-form__textarea"
                                id="message"
                                name="message"
                                placeholder="Votre message, une question, une réservation..."
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={formState === 'loading'}
                            />
                        </div>

                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="form-honeypot"
                            value={formData.website}
                            onChange={handleChange}
                        />

                        <button
                            className="contact-form__submit"
                            type="submit"
                            disabled={formState === 'loading'}
                        >
                            {formState === 'loading' ? (
                                <>
                                    <span className="contact-form__spinner" aria-hidden="true" />
                                    Envoi en cours…
                                </>
                            ) : (
                                'Envoyer le message'
                            )}
                        </button>
                    </form>
                </div>

                <div className="blockRouge blockRouge--droite" aria-hidden="true" />
            </div>

        </section>
    );
}