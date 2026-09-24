# Šaltukas — windshield cover shop

A single-product ecommerce landing page for "Šaltukas," a windshield frost/snow cover (Lithuanian market). Visual structure (header, gallery + buy box, trust icons, dark comparison table, tabbed specs, accordion FAQ, closing CTA band) follows the reference layout supplied; all copy is the Lithuanian text from the supplied landing page copy brief.

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

## Placeholders — `[X]` fields

The copy brief marks every unconfirmed fact (price, dimensions, attachment method, test results, delivery time, etc.) with bracketed placeholders like `[X]` or `[KAINA]`. Those are kept **visibly flagged** on the live page (yellow highlight, same convention as the source document) rather than filled with invented numbers — the brief is explicit that these come from actual product testing and supplier confirmation, not from copywriting.

Search the page for `mark class="todo"` (or just look for the yellow-highlighted text) to find every field that needs a real value before launch:

- **Price** (`[KAINA]`) — appears in the hero, bundle options, offer section, cart and footer
- **Dimensions / fit thresholds** — currently the supplier's claimed 200×70 cm, not yet verified against a size matrix
- **Attachment method, install/removal time, wind test results** — pending the physical validation tests described in the research
- **Delivery time, storage bag inclusion, return terms**
- **Video proof asset** — the "Įrodymas" section has a placeholder video block; swap in the real overnight-comparison footage once filmed
- **Reviews** — intentionally left empty ("Renkame pirmuosius atsiliepimus") rather than showing fabricated testimonials or star ratings; the source research explicitly found too few authentic first-person reviews to use

## Cart / checkout

Since price isn't set yet, the cart tracks quantity but displays `[KAINA]` instead of a computed total. Once you set `PRODUCT.price` in `assets/js/cart.js`, totals compute automatically. The checkout form is a working demo (collects name/email/address, shows a confirmation) — **no payment processing is wired up**. Integrate a real provider (Stripe, Paysera, etc.) before taking orders.

## Images

All product/vehicle imagery is illustrative SVG (clearly labeled "Iliustracija — ne faktinė nuotrauka"), not real product photos. Replace the gallery and section graphics with real photos/video once the sample is in hand.
