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

- Price: **€29,99**, down from €39,99 — set in `index.html` (hero, bundle options, offer section, final CTA) and `assets/js/cart.js` (`PRODUCT.price`). The 2-pack bundle is a straight ×2 (€59,98); no extra bundle discount was specified, so none was invented.
- Delivery: **5 darbo dienas** — set in the top bar, trust row, shipping tab, offer section and FAQ.
- Dimensions: **200 × 170 cm** — set in the hero, fit-guide and specs table.
- Attachment: **2× siurbtukai** (2 suction cups) — set in the "Kaip veikia" steps, "Ką gauni" box contents, and the wind-retention FAQ answer.

## Remaining placeholders — `[X]` fields

The copy brief marks every other unconfirmed fact (install/removal time, wind test results, delivery courier, fit thresholds by vehicle, etc.) with bracketed placeholders like `[X]`. Those stay **visibly flagged** on the live page (yellow highlight, same convention as the source document) rather than filled with invented numbers — the brief is explicit that these come from actual product testing and supplier confirmation, not from copywriting.

Search the page for `mark class="todo"` (or just look for the yellow-highlighted text) to find every field that still needs a real value before launch:

- **Install/removal time** (seconds to put on/take off) and **wind test results** — pending the physical validation tests described in the research
- **Fit thresholds** (max glass width/height the 200×170 cm cover will still cover) — the overall cover size is now set, but which vehicles it actually fits still needs the size-matrix test
- **Delivery courier/method, storage bag inclusion, exact return terms**
- **Video proof asset** — the "Įrodymas" section has a placeholder video block; swap in the real overnight-comparison footage once filmed
- **Reviews** — intentionally left empty ("Renkame pirmuosius atsiliepimus") rather than showing fabricated testimonials or star ratings; the source research explicitly found too few authentic first-person reviews to use

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
