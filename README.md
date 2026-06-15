# BRB Auto Pro

Site vitrine du concessionnaire et centre detailing **BRB Auto Pro** — Beaucaire (30300), Gard.
Import de véhicules d'Allemagne, studio detailing (polissage, céramique 9H) et achat-vente.

## Stack

- **React 18** + **React Router 6**
- **Vite 5** (build & dev server)
- **Tailwind CSS 3**
- **Firebase** (Auth + Firestore) pour les formulaires et l'espace admin
- **lucide-react** (icônes)

## Démarrage

```bash
npm install          # installer les dépendances
cp .env.example .env # créer le fichier d'environnement, puis renseigner les clés Firebase
npm run dev          # serveur de dev → http://localhost:5173
```

## Scripts

| Commande          | Description                                 |
|-------------------|---------------------------------------------|
| `npm run dev`     | Serveur de développement (hot reload)       |
| `npm run build`   | Build de production dans `dist/`            |
| `npm run preview` | Prévisualise le build de production         |

## Variables d'environnement

Définies dans `.env` (non versionné). Voir `.env.example` :

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Déploiement

Configuré pour **Netlify** (voir `netlify.toml`). Le build génère `dist/`.

## Structure

```
src/
  components/   # Navbar, Footer, SEO
  lib/          # firebase.js, useScrollReveal.js
  pages/        # Home, Import, Detailing, BuySell, Booking, Contact, Admin, NotFound
  App.jsx       # routes + code splitting (React.lazy)
public/         # favicon.svg, robots.txt, sitemap.xml, logo.jpg
```
