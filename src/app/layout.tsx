// app/layout.tsx — LIA CUISINE (v5 — palette rose-rouge fidèle maquette)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./scss/layout.scss";
import "./scss/home.scss";
import Link from "next/link";
import HeaderNav from "./component/HeaderNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lia Cuisine — Saveurs d'Afrique · Gatineau",
  description:
    "Restaurant africain authentique au 693 Bd Saint-Joseph, Gatineau QC. " +
    "Cuisine congolaise et d'Afrique centrale. Note 4,6/5 · (819) 576-4927.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>

        {/* ─── HEADER ──────────────────────────────── */}
        <header className="header">
          <div className="header__inner">
            <div className="header__logo">
              <Link href="/home">LIA CUISINE</Link>
              <span>Saveurs d'Afrique • Gatineau</span>
            </div>
            <HeaderNav />
          </div>
        </header>

        {/* ─── CONTENU ─────────────────────────────── */}
        <main>{children}</main>

        {/* ─── FOOTER — fond rouge-rosé, 3 colonnes + réseaux sociaux ── */}
        <footer className="footer">
          <div className="footer__grid">

            {/* Col 1 — Branding */}
            <div className="footer__brand">
              <p className="footer__logo">LiaCuisine</p>
              <p className="footer__tagline">Saveurs d'Afrique • Gatineau</p>
              <p>
                Découvrez les saveurs riches et authentiques de l'Afrique au
                cœur d'Ottawa–Gatineau. Des ragoûts traditionnels aux
                spécialités grillées, chaque plat raconte une histoire.
              </p>
            </div>

            {/* Col 2 — Navigation */}
            <div className="footer__col">
              <h4>Navigation</h4>
              <ul>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="/menu">Menu</Link></li>
                <li><Link href="/galerie">Gallerie</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Col 3 — Réseaux sociaux avec icônes cercles */}
            <div className="footer__col footer__social-section">
              <h4 className="footer__social-title">Réseaux sociaux</h4>
              <p className="footer__social-subtitle">Suivez-nous</p>
              <div className="footer__social-icons">
                <Link href="#" className="social-icon social-icon--fb" aria-label="Facebook">f</Link>
                <Link href="#" className="social-icon social-icon--x"  aria-label="X/Twitter">𝕏</Link>
                <Link href="#" className="social-icon social-icon--ig" aria-label="Instagram">◎</Link>
                <Link href="#" className="social-icon social-icon--li" aria-label="LinkedIn">in</Link>
                <Link href="#" className="social-icon social-icon--gp" aria-label="Google+">g+</Link>
              </div>
            </div>

          </div>

          <div className="footer__bottom">
            <p>© 2026 Lia Cuisine — Gatineau, Québec. Tous droits réservés.</p>
            <p>Developpé par Plamedi Ilunga -- merdiilunga15@gmail.com</p>
          </div>
        </footer>

      </body>
    </html>
  );
}