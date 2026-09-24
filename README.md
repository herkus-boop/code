# Šaltukas — windshield cover shop

A single-product ecommerce landing page for "Šaltukas," a windshield frost/snow cover (Lithuanian market). Visual structure (header, gallery + buy box, trust icons, dark comparison table, tabbed specs, accordion FAQ, closing CTA band) follows the reference layout supplied; copy is the Lithuanian text from the supplied landing page copy brief; typography and colors follow the supplied "Stiliaus Gidas" (style guide).

## Design system (Stiliaus Gidas)

- **Font**: Figtree (800 for headings, 400 body, 700 buttons/labels/price), falling back to Nunito Sans, loaded from Google Fonts in `index.html`.
- **Colors** (all as CSS custom properties in `assets/css/styles.css`): Night Ink `#0E1B2C` (headings), Slate `#4A5563` (body), Fog `#8593A3` (captions), Deep Frost `#16324F` (primary CTA), Glacier `#3E7CB1` (accents/labels/links), Ice `#EEF4F8` (section bg), Snow `#F8FAFC` (page bg), Frost Line `#D8E3EC` (borders), Warm Red `#C8372D` (price/discount only).
- **Type scale**: H1 56/36px, H2 36/28px, H3 24/20px, body 17/16px, caption 14/13px, uppercase label 12/11px (+0.12em), button 16px, price 20/18px — desktop/mobile, switching at 640px, exactly per the guide's table.
- Buttons: 14×28px padding, 6px radius, white text on Deep Frost.

## Structure

```
index.html              main page (product, FAQ, cart)
assets/css/styles.css   all styling
assets/js/cart.js       cart logic (localStorage) + demo checkout
```

No build step — open `index.html` directly, or serve with any static server:

```bash
python3 -m http.server 8000
```

## Confirmed product facts

- Price: **€29,99**, down from €39,99 — hero, bundle options, offer section, final CTA, `assets/js/cart.js` (`PRODUCT.price`). 2-pack is a straight ×2 (€59,98).
- Delivery: **5 darbo dienas**, by **kurjeris** — top bar, trust row, shipping tab, offer section, FAQ.
- Dimensions: **200 × 170 cm** overall — hero, fit-guide, specs table.
- Fit threshold: cover covers glass up to **200 cm wide × 70 cm tall** — fit-guide.
- Attachment: **2× siurbtukai** (suction cups) — "Kaip veikia" steps, "Ką gauni" box contents, wind FAQ, scratch/paint FAQ.
- Install/removal time: **60 sek. to install, 30 sek. to remove** — hero checklist, "Kaip veikia" step 1, DUK.
- Storage: goes in a **maišelis** (bag), one **included in the box**.
- Weight: **450 g**.
- Test results: no frost formed under the cover; didn't freeze to wet glass; held through 30,1 m/s wind; scraper 15 min vs. Šaltukas 30 sek; no ice after freezing rain.
- Returns: 14 days, **unopened/unused item in original packaging**.
- Contact: **info@saltukas.lt** (confirmed real).
- Custom fit questions answered within **24 val.**

## Still open

- **Field-test count** ("Išbandyta per [X] šaltų naktų") — you gave "200," which would mean over 200 individual sub-zero nights of testing; a single Lithuanian winter has only ~32 per the research doc, so as stated this reads as an inflated claim on a page built around not overclaiming. Left as `[X]` pending a number that reflects what was actually tested (e.g. nights × test units, or a smaller real count).
- **Fabric material** ("Medžiaga: [patvirtinti]", specs table) — still needs an answer (e.g. Oxford cloth, aluminized film, etc.); "2× siurbtukai" answered attachment hardware, not fabric.
- **Video proof asset** — the "Įrodymas" section has a placeholder poster image; swap in the real overnight-comparison footage once filmed.
- **Reviews** — intentionally left empty ("Renkame pirmuosius atsiliepimus") rather than showing fabricated testimonials or star ratings.

## Cart / checkout

The cart computes real totals now that `PRODUCT.price` is set in `assets/js/cart.js`. The checkout form is a working demo (collects name/email/address, shows a confirmation) — **no payment processing is wired up**. Integrate a real provider (Stripe, Paysera, etc.) before taking orders.

## Images

Real product photos are in `assets/img/` and used across the page:

- `installed-clean.jpg` — cover installed, default gallery image, DUK visual
- `installed-no-scraper.jpg` — cover installed in snow, gallery thumbnail, video-section poster
- `product-flat-suction-cups.jpg` — cover + 2 suction cups laid out, "Ką gauni" section, bundle thumbnails, cart item thumbnail
- `problem-scraping.jpg` — hand scraping a frozen windshield, "Problema" section

**Not used**: a supplied dimension-diagram photo showed "200 × 70 cm," which contradicts the confirmed 200 × 170 cm — left out rather than publishing a page that contradicts itself. Flag if 70 cm was actually correct.

Vehicle-type fit cards (Hečbekas, Sedanas, etc.) remain illustrative SVG silhouettes — no real photos of the cover on those specific vehicle types were supplied yet.
