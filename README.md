# FrostGuard — windshield cover shop

A single-product ecommerce landing page for a windshield frost/snow cover (Lithuanian market), built from the supplied customer/offer research.

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

## What's real vs. placeholder

The copy sticks to the claim boundaries from the research (no "universal fit," no "waterproof," no fabricated testimonials — the research dossier explicitly flagged that authentic Lithuanian first-person reviews were too sparse to use, so none are shown).

Still placeholders you need to fill in before launch:
- **Price** (`€24,99` — hardcoded in `index.html` and `assets/js/cart.js`, pricing was explicitly out of scope in the research)
- **Product photos** — currently illustrative SVG graphics, not real product photos
- **Exact dimensions/attachment hardware** — the research notes the final SKU/BOM wasn't locked yet
- **Shipping & returns terms, contact email** — generic placeholders in the footer
- **Checkout** — the "Patvirtinti užsakymą" form is a working demo (saves nothing, charges nothing). Wire up a real payment provider (Stripe, Paysera, etc.) and an order backend before taking real orders.

## Naming

Used "FrostGuard" as a working name from the offer brief's candidate list. Swap it (search/replace in `index.html`) once trademark/domain checks are done — the research flagged all name candidates as unverified.
