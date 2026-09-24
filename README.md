# Šaltukas — windshield cover shop

A single-product ecommerce landing page for "Šaltukas," a windshield frost/snow cover (Lithuanian market). Design matches a reference mockup 1:1 in layout, spacing, and color/typography treatment: minimal white header, hero with gallery + big display price, a merged dark "Problema/Tikroji priežastis" split section, a 3-step process row, an "Įrodymas" proof section with status pills, a comparison table with a dark header bar, a dark "Tinkamumas" section with two info cards, an honesty split table, a solid-red offer band, a flat accordion DUK, and a dark closing band. Copy is the Lithuanian text from the supplied landing page brief; font is Figtree per the supplied style guide.

## Structure

```
index.html              main page (product, FAQ, cart)
assets/css/styles.css   all styling
assets/js/cart.js       cart logic (localStorage) + demo checkout
assets/img/             real product photos
```

No build step — open `index.html` directly, or serve with any static server:

```bash
python3 -m http.server 8000
```

## Design decisions vs. the reference mockup

The reference (a Lovable-built preview) was made before pricing/specs were confirmed, so it shows placeholders ("Bus paskelbta," empty photo boxes, bundle-free hero, no trust-icon row). This build keeps the reference's **visual system** but fills in what's actually known:

- **Real photos** (`assets/img/`) instead of camera-icon placeholders, since we have them.
- **Real price** (€29,99, was €39,99) instead of "Bus paskelbta."
- **Confirmed specs/test results** (dimensions, attachment, weight, install time, wind/frost test outcomes) instead of "bus išmatuota" placeholders — see below for what's still open.
- Cart + checkout drawer kept (not in the reference, which is marketing-only) since it was working functionality from a prior iteration.
- Font is Figtree (the confirmed brand typeface from your separate style guide), not whatever generic sans the Lovable build used.

## Confirmed product facts (live on the page)

- Price: **€29,99**, down from €39,99. Delivery: **5 darbo dienas**, by **kurjeris**.
- Dimensions: **200 × 170 cm** overall; covers glass up to **200 cm wide × 70 cm tall**.
- Attachment: **2× siurbtukai** (suction cups). Install: **60 sek.**, remove: **30 sek.**
- Storage: **maišelis**, included in the box. Weight: **450 g**.
- Test results: no frost formed under the cover; didn't freeze to wet glass; held through **30,1 m/s** wind; scraper **15 min.** vs. Šaltukas **30 sek.**; no ice after freezing rain.
- Overnight test conditions: **−17 °C, pūga (blizzard), 30,1 m/s** wind.
- Field-tested over **67** cold nights at Lithuanian test sites.
- Material: **100% poliesteris su PVC danga**.
- Returns: 14 days, unopened/unused item in original packaging. Contact: **info@saltukas.lt**.

## Still open

Nothing is currently flagged with `class="pill pill-todo"` — every field the page asks for has a confirmed value. If new specs or test data come in later, search for that class to find where placeholders used to live, or just search the page for any remaining `pill-todo` you reintroduce.

## Cart / checkout

The cart computes real totals from `PRODUCT.price` in `assets/js/cart.js`. Checkout is a working demo (collects name/email/address, shows a confirmation) — **no payment processing is wired up**. Integrate a real provider (Stripe, Paysera, etc.) before taking orders.

## Images

Real product photos in `assets/img/`, used across the hero gallery, proof section, and Tinkamumas cards. One supplied photo (a dimension diagram showing "200 × 70 cm") was left out since it contradicts the confirmed 200 × 170 cm overall size.
