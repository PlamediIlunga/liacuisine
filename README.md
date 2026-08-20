# 🍽️ Lia Cuisine — Site Vitrine

Site vitrine professionnel pour **Lia Cuisine**, restaurant de cuisine africaine (congolaise / Afrique centrale) situé au 693 Bd Saint-Joseph, Gatineau, QC.

> 4,6 ★ · 233 avis Google · 20–30 $ par personne

---

## ✨ Aperçu

Lia Cuisine est un projet full-stack réalisé avec **Next.js 16 App Router** et **TypeScript**, sans aucun framework CSS — tout le design est écrit à la main en **SCSS modulaire** avec un design system centralisé (`_tokens.scss`). Le site est déployé en production sur **Vercel**.

---

## 🛠️ Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Langage | TypeScript |
| Style | SCSS artisanal + design system `_tokens.scss` |
| Emails | Resend (API serverless) |
| Déploiement | Vercel |
| Données | JSON (pseudo-base locale) |
| Animations | IntersectionObserver (composant `Reveal` custom) |


## 🚀 Fonctionnalités

### Pages
- **Accueil** — Hero, feature strip, plats spéciaux, carousel galerie, section valeurs, formulaire de contact
- **Menu** — Grille de plats fetchée depuis `/api/menu`, effet polaroïd décalé
- **Galerie** — Grille masonry avec overlay au hover, cards larges/normales alternées
- **À propos** — Histoire, stats, valeurs, équipe chargée depuis API
- **Contact** — Formulaire complet avec états idle/loading/success/error
- **404** — Page personnalisée dans le thème du restaurant

### Sécurité & UX
- **Honeypot anti-spam** sur les formulaires
- **Validation double** : côté client (`contactValidation.ts`) + côté serveur (API route)
- **`font-size: max(16px, ...)`** sur les inputs pour éviter le zoom automatique iOS
- **`background-attachment: scroll`** partout (fix iOS — pas de `fixed`)
- **`env(safe-area-inset-*)`** sur header et footer (iPhone avec encoche)
- **`prefers-reduced-motion`** respecté sur toutes les animations
- **`@media (hover: hover)`** sur tous les effets hover (pas de faux hover tactile)

### Design system
- Fichier `_tokens.scss` central importé par tous les fichiers SCSS via `@use 'tokens' as *`
- Palette cohérente rose/rouge (`#C24A62`), or (`#C9A227`), crème (`#FAF6F0`)
- 3 breakpoints unifiés : `$bp-tablet: 1024px`, `$bp-mobile: 768px`, `$bp-small: 480px`
- Ombres, radius, easings centralisés

### Animations
- Composant `Reveal` custom basé sur `IntersectionObserver`
- Variantes : `up`, `left`, `right`, `zoom`
- Support `delay` en ms
- Désactivé automatiquement si `prefers-reduced-motion: reduce`

---

## ⚙️ Installation

```bash
# Cloner le repo
git clone https://github.com/ton-username/liacuisine.git
cd liacuisine

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir RESEND_API_KEY et MAIL_TO dans .env.local

# Démarrer en développement
npm run dev
```

### Variables d'environnement requises

```bash
# .env.local — ne jamais committer ce fichier
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx   # Clé API Resend (resend.com)
MAIL_TO=votre-email@domaine.com          # Adresse qui reçoit les messages contact
```

---

## 🌐 Déploiement (Vercel)

1. Importer le repo sur [vercel.com](https://vercel.com)
2. Ajouter les variables d'environnement dans **Settings → Environment Variables**
3. Vercel détecte automatiquement Next.js — aucune configuration supplémentaire
4. Les routes `app/api/` deviennent des fonctions serverless automatiquement

> ⚠️ Le fichier `.env.local` ne doit jamais être commité. Il est listé dans `.gitignore` par défaut avec Next.js.

---

## 📦 Dépendances notables

```json
{
  "next": "^16.2.10",
  "react": "^19.0.0",
  "typescript": "^5.0.0",
  "resend": "^4.x",
  "sass": "^1.x"
}
```

---

## 📄 Licence

Projet réalisé pour **Lia Cuisine**, Gatineau, QC. Code source partagé à titre de portfolio — tout usage commercial non autorisé sans accord préalable.