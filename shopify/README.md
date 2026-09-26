# Šaltukas — Shopify install

This folder is a ready-to-install Shopify product page: a custom layout, section, and product template that reproduce the GitHub Pages site inside your Shopify store, with a **real** add-to-cart (Shopify's own cart, not a demo).

## What's in here

```
shopify/
  layout/saltukas.liquid              minimal page shell (no theme header/footer — avoids double chrome)
  sections/saltukas-product.liquid    the whole page: header, hero, all marketing sections, footer
  templates/product.saltukas.json     tells Shopify "use the saltukas layout + section for this product"
  assets/saltukas.css                 all styling (same design as the GitHub Pages version)
  assets/saltukas.js                  gallery thumbnails, qty selector, real add-to-cart via Shopify's Cart API
  assets/saltukas-*.jpg               the 4 real product photos
```

## Why a custom layout

Shopify normally wraps every page in your theme's own header/footer (`layout/theme.liquid`). Since this page ships with its **own** header and footer (matching the GitHub Pages design), using the theme's default layout would show two headers stacked. `layout/saltukas.liquid` is a minimal, self-contained page shell used **only** for this product, so the rest of your store is untouched.

## Install steps (~15 minutes)

1. **Create the product** in Shopify admin → Products → Add product.
   - Title: `Šaltukas`
   - Price: `29.99`, Compare-at price: `39.99`
   - Upload the same 4 photos as the product's images (for cart thumbnails, search results, related-products, etc. — the page itself uses its own bundled copies, so this is for everywhere *else* Shopify shows the product)
   - Save, and note the product is created (you don't need the variant ID — the template looks it up automatically)

2. **Upload the files** via Online Store → Themes → your theme → **Edit code**:
   - Under `Layout`, click **Add a new layout**, name it `saltukas`, paste in `layout/saltukas.liquid`
   - Under `Sections`, click **Add a new section**, name it `saltukas-product`, paste in `sections/saltukas-product.liquid`
   - Under `Templates`, click **Add a new template** → choose `product` → JSON → name it `saltukas`, paste in `templates/product.saltukas.json`
   - Under `Assets`, click **Add a new asset** → **Upload file** for each of `saltukas.css`, `saltukas.js`, and the 4 `saltukas-*.jpg` photos

3. **Assign the template** to the product: go back to the Šaltukas product → scroll to **Theme template** (right sidebar) → select `product.saltukas`. Save.

4. **View the live page**: Product page → "Preview" or visit `/products/saltukas` on your store domain.

## Demand-test mode (currently ON)

`assets/saltukas.js` has a flag near the top: `var DEMAND_TEST_MODE = true;`

While it's `true`, clicking "Noriu Šaltuko" **never** hits Shopify's real cart:

1. It fires a Meta Pixel `AddToCart` event (for traffic/interest tracking in Ads Manager). This requires a Meta Pixel already connected to the store — Shopify admin → **Settings → Customer events** (or the "Facebook & Instagram" sales channel) — otherwise nothing fires, silently.
2. The buy box is replaced with a "Šiuo metu išparduota" (out of stock) message and an email form.
3. That email form is Shopify's own customer form — submitted emails become real **Customers** in your store, tagged `saltukas-waitlist`. Find them at Shopify admin → **Customers** → search/filter by tag `saltukas-waitlist`. Export as CSV or email them via the Shopify Email app whenever you're ready.

Keep the product's actual inventory at **0 stock** (Product → Inventory → Quantity `0`, "Continue selling when out of stock" **off**) so nothing can be purchased through any other route (direct API calls, cached pages, etc.) while this is on.

**To go live for real** once stock exists: set `DEMAND_TEST_MODE = false` in `saltukas.js`, and set real inventory > 0. The real Shopify AJAX add-to-cart code is already there, untouched, ready to go.

## What's real vs. what to double check

- **Price/compare-at price** pull live from the product (`{{ product.price }}`), so changing it in Shopify admin updates the page automatically — no code edit needed.
- **All copy, specs, test results** are hardcoded in `saltukas-product.liquid` exactly as confirmed on the GitHub Pages version (price aside, since that now comes from the product). If any of those numbers change, edit the section file directly (search-and-replace is easiest, matching the GitHub Pages source at `index.html`).
- **Single-variant assumption**: the add-to-cart form uses `product.selected_or_first_available_variant`. If you add real variants (e.g. color) later, you'll want a variant picker — ask and I'll add one.
- This template is scoped to **this one product**. If you add more products, they'll use your normal theme template unless you build a similar custom one for them.

## Local vs. Shopify version

The GitHub Pages version (`/index.html`, `/assets/`) stays as a free-standing static site — useful for quick previews/sharing without touching the live store. The two aren't linked; if you change copy on one, update the other manually (or ask me to keep them in sync).
