# BRB AutoPro

Site vitrine du garage **BRB AutoPro** — 6 Chemin des Moulins, 30300 Beaucaire (Gard).
Achat / vente de véhicules et detailing automobile premium (polish, céramique, correction de peinture).

## Stack

Site **statique, une seule page**, sans build ni dépendance :

- **HTML / CSS / JavaScript** purs (tout est dans `dist/index.html`)
- Polices **Rajdhani** (titres) + **Inter** (corps) via Google Fonts
- Aucun framework, aucun bundler, aucun `node_modules`

## Modifier le site

Tout le contenu (sections, véhicules, prix, textes, couleurs) est dans **`dist/index.html`**.
Ouvre simplement ce fichier dans un navigateur pour le prévisualiser localement.

La galerie de véhicules est générée par le tableau `vehicles` en bas du fichier (dans la balise `<script>`).

## Déploiement

Hébergé sur **Netlify** (voir `netlify.toml`) : publication directe du dossier `dist/`,
sans étape de build. Pousser sur `main` met le site à jour sur https://brbautopro.fr.

## Structure

```
dist/
  index.html     # le site complet (HTML + CSS + JS inline)
  logo-brb.png   # logo affiché dans le header et le footer
  robots.txt
  sitemap.xml
  .htaccess      # fallback Apache (ignoré par Netlify)
netlify.toml     # configuration de déploiement
```
