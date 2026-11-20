# Wolion Technologies Website

React-powered, responsive website for Wolion Technologies. The homepage keeps company information, workforce and technology solutions, industries, differentiators, approach, and the contact form together in one scrolling experience. Privacy, Terms, and the not-found page use the same React application.

## Brand assets

- `assets/logo/lion_logo.svg` — supplied lion logo used in headers and the footer without alteration
- `assets/logo/wolion-favicon.svg` — favicon with the supplied lion logo on a navy background
- `assets/wolion-hero-city.png` — supplied city image used in the homepage hero background
- The header and footer use the deep navy brand background so the original logo remains legible.
- The homepage's blue/mint light trails use lightweight Canvas 2D and do not require WebGL.

The site uses Manrope for headings and Inter for body text. Both are loaded with `display=swap` and system fallbacks; responsive typography and layout rules live in `styles.css`.

## Run locally

Install dependencies and run the Vite development server:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Production build

```powershell
npm run build
npm run preview
```

The multi-page build is written to `dist/`; the `public/` directory contains static SEO files.

## GitHub Pages deployment

The `main` branch deploys automatically through `.github/workflows/deploy.yml`; the workflow can also be started manually with `workflow_dispatch`. In the repository settings, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

The expected site URL is <https://meettankskyglobal.github.io/Wolion-Technologies/>.

To publish changes:

```powershell
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

GitHub Actions must complete successfully before the new site is live.

## Form integration

Set `window.WOLION_FORM_ENDPOINT` in `form-config.js` to an HTTPS or same-origin form endpoint. The homepage form accepts business and candidate inquiries.

The endpoint must:
- Accept `POST` multipart/form-data
- Validate and sanitize all fields server-side
- Apply CSRF, spam, and rate-limit controls
- Verify file type and size again server-side
- Return a successful 2xx response only after the submission is durably accepted
- Never expose provider keys in frontend files

Suggested environment variables for a production backend:
- `FORM_PROVIDER_API_KEY`
- `FORM_PROVIDER_SENDER`
- `FORM_INQUIRY_RECIPIENT`
- `FORM_CAREERS_RECIPIENT`
- `FORM_ALLOWED_ORIGIN`
- `FORM_UPLOAD_MAX_BYTES`
- `FORM_RATE_LIMIT_WINDOW_SECONDS`

No endpoint or credentials are configured, so forms deliberately show a configuration notice instead of pretending to submit successfully.

## Before production

Replace placeholder URLs in `public/sitemap.xml` and `public/robots.txt` with the verified domain.
Add verified email, phone, WhatsApp, social, and address details only after confirmation.
Review and finalize privacy and terms content with appropriate legal guidance.
