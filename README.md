# julielichty.com

Static site for Julie Lichty (Leadership Coach), deployed to Kinsta Static Site Hosting via GitHub push-to-deploy.

## Stack
- Plain HTML + CSS, no build step
- Google Fonts: **Work Sans** (sans) + **EB Garamond** (serif italic for accent lines). These are free-licensed analogs for the brand spec of Tablet Gothic + Garamond Premier Pro. If the client activates an Adobe Fonts / Typekit kit, swap the `<link>` tag and the `--f-sans` / `--f-serif` stacks in `assets/css/styles.css`.

## Folder structure
```
index.html                homepage (door-knob + golden-arrow banners)
about/index.html          About Julie
coaching/index.html       Work With Me
speaking/index.html       Speaking (keynotes + workshops)
testimonials/index.html   Client quotes
faq/index.html            FAQ (includes FAQPage JSON-LD for AEO/GEO)
contact/index.html        Contact + form
assets/css/styles.css     all styles
assets/js/main.js         mobile nav toggle
assets/images/            hero backgrounds, photos, logos
robots.txt
sitemap.xml
_source_docs/             original docx + screenshots (gitignored)
```

## Local preview
```bash
cd julielichty.com
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Kinsta Static Site Hosting
1. Create a private GitHub repo named `julielichty-com` under Dahlia's GitHub account.
2. From this folder: `git init && git add . && git commit -m "Initial rebuild" && git branch -M main && git remote add origin git@github.com:<user>/julielichty-com.git && git push -u origin main`.
3. In Kinsta (My Kinsta → Static Sites → Add site), connect GitHub and select the repo. Build command: leave empty. Publish directory: `/`.
4. Kinsta assigns a `*.kinsta.page` preview URL. Verify the site loads correctly.
5. In Kinsta → Domains, add `julielichty.com` (and `www.julielichty.com`), then update DNS at the registrar to the records Kinsta provides.
6. Every `git push` to `main` auto-deploys.

## Clean URLs
All internal links use folder-style paths (`/about/`, `/coaching/`). Kinsta Static Hosting serves `folder/index.html` at `/folder/` by default, and the canonical tags use the no-trailing-slash form (`/about`). No `.html` extensions appear in user-facing URLs.

## Editing content
- **Text**: edit the relevant `index.html` directly in VS Code. Push to `main`. Live in about 30 seconds.
- **Images**: drop new WebP/JPG into `assets/images/` and reference them.
- **Styles**: `assets/css/styles.css` controls everything. Brand tokens live at the top (`:root`).
- **Banner typography fix**: the signature italic serif accent lines (`*"This is your time to elevate."*`) use the `.serif-italic` class, which maps to EB Garamond Italic. If it ever falls back to plain serif, either Google Fonts failed to load or the class is missing.

## Contact form
The contact form posts to a placeholder Formspree endpoint. Replace `REPLACE_WITH_FORM_ID` in `contact/index.html` with the client's real Formspree form ID before launch. Alternatives: Kinsta form handler, Basin, or Tally.

## SEO / AEO
- Per-page `<title>` + `<meta description>` from the SEO doc
- Canonical URLs on each page
- OG + Twitter Card on homepage (add to other pages as needed)
- JSON-LD: `Person` on homepage, `Service` on Coaching, `FAQPage` on FAQ
- `sitemap.xml` + `robots.txt` at root
- Internal linking follows the approved plan in `_source_docs/JulieLichty-Internal-Linking-Strategy-Final.docx`

## What's not in this rebuild
- Blog posts (shell only; add under `/blog/` when ready)
- Newsletter signup (flag for later)
- Booking widget (keep email + form for now)
