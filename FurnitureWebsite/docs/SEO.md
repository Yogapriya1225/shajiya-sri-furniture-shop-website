# SEO Notes

## What's already in place

- `frontend/index.html` — meta description, keywords, canonical tag, Open
  Graph tags, and Twitter Card tags.
- `frontend/public/robots.txt` — allows all crawling except `/admin`.
- `frontend/public/sitemap.xml` — static sitemap covering the fixed routes
  (home, about, products, gallery, contact).

## Updating the canonical domain

Search and replace `https://www.shajiyasrifurniture.com` across:
- `frontend/index.html`
- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`

once the real production domain is known.

## Structured data

Add JSON-LD `LocalBusiness` structured data (name, address, phone, opening
hours, geo coordinates, aggregateRating) to the `<head>` of `index.html` or
inject it via a small component in the home page once the exact GPS
coordinates for the showroom (from the Google Business listing) are
confirmed.

## Dynamic product pages

`/products/:slug` pages are rendered client-side from data fetched from the
backend. Because the URL list changes as products are added/removed in the
admin panel, the static `sitemap.xml` above only lists the fixed top-level
routes. If organic search traffic to individual product pages becomes a
priority, consider adding a small backend endpoint (e.g. `/api/sitemap`)
that generates an up-to-date sitemap including all current product slugs.
