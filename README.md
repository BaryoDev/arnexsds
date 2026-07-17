# arnexsds.com

Marketing + compliance website for **Arnex Software Development Services**. Plain
static HTML/CSS/JS — no build step — designed to be served from GitHub Pages at
`https://arnexsds.com`.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Services, products, how payments work, about |
| Services | `services.html` | Detailed services + engagement/pricing models |
| Terms & Conditions | `terms.html` | Required by Xendit merchant review |
| Privacy Policy | `privacy.html` | PH Data Privacy Act (RA 10173) compliant |
| Refund & Cancellation | `refund.html` | Required by Xendit merchant review |
| Contact | `contact.html` | Business details + spam-protected form |

Shared: `styles.css`, `main.js`, `assets/logo.svg`.

## Local preview

```sh
cd arnexsds
python3 -m http.server 8080
# open http://localhost:8080
```

(Use a server, not file://, so the absolute `/styles.css` and `/main.js` paths resolve.)

## Deploy to GitHub Pages

1. Push this folder to a repo (e.g. `BaryoDev/arnexsds`).
2. Repo → **Settings → Pages** → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. The `CNAME` file already contains `arnexsds.com`.
4. At your DNS provider, point the domain at GitHub Pages:
   - `A` records for the apex `arnexsds.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `<your-github-username>.github.io`
5. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued.

## Configure the contact form (Typeform)

The contact page embeds a [Typeform](https://www.typeform.com). The form lives on
Typeform's domain, so your email never appears on the page, and Typeform handles
submissions, notifications, and spam filtering.

1. Build your form in Typeform and publish it.
2. Copy the id from its share link: `https://form.typeform.com/to/<ID>`.
3. In `contact.html`, replace `YOUR_TYPEFORM_ID` in the iframe `src` with `<ID>`.

Your email and phone are also shown on the contact page, but they are **assembled by
JavaScript at runtime**, so they never appear as plain text in the HTML source for
scrapers to harvest.

## Editing business details

- Email / phone: `data-user` / `data-domain` / `data-phone` attributes (in
  `contact.html`, `privacy.html`, `refund.html`, `terms.html`).
- Address, hours, business name: search the files for “Koronadal” / “Arnex”.
- Logo: `assets/logo.svg` (scalable; used for header, footer, and favicon).

> The legal pages are written specifically for this business but are not a
> substitute for legal advice. Have them reviewed by counsel, and add your DTI/SEC
> registration number if you want it shown.
