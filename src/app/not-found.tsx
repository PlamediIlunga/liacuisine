// app/not-found.tsx — LIA CUISINE
import Link from "next/link";
import "../app/scss/not-found.scss";

export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__card">

                {/* Numéro 404 en dégradé */}
                <span className="not-found__code">404</span>

                {/* Icône assiette/couverts */}
                <div className="not-found__icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {/* Fourchette */}
                        <path d="M3 2v7c0 1.1.9 2 2 2h1v11h2V11h1a2 2 0 0 0 2-2V2h-2v5H7V2H5v5H4V2H3z" />
                        {/* Couteau */}
                        <path d="M19 2c-1.5 0-4 1.5-4 6v4h2v8h2V2z" />
                    </svg>
                </div>

                {/* Titre */}
                <h1 className="not-found__title">
                    Cette page s'est évaporée<br />
                    comme une sauce en cuisine
                </h1>

                {/* Séparateur or */}
                <div className="not-found__divider" />

                {/* Description */}
                <p className="not-found__desc">
                    La page que vous cherchez n'existe pas ou a été déplacée.
                    Mais nos tables, elles, vous attendent toujours au
                    693 Bd Saint-Joseph, Gatineau.
                </p>

                {/* Boutons */}
                <div className="not-found__actions">
                    <Link href="/home" className="not-found__btn-primary">
                        Retour à l&apos;accueil
                    </Link>
                    <Link href="/menu" className="not-found__btn-secondary">
                        Voir le menu
                    </Link>
                </div>

                {/* Mention discrète */}
                <p className="not-found__hint">
                    Ou appelez-nous : <span>(819) 576-4927</span>
                </p>

            </div>
        </div>
    );
}