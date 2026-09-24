(function () {
  "use strict";

  // ===== Product config =====
  var PRODUCT = {
    id: "saltukas-cover",
    name: "Šaltukas uždangalas",
    price: 29.99, // was €39,99
  };

  var CART_KEY = "saltukas_cart";

  // ===== Helpers =====
  function money(v) {
    if (v === null || isNaN(v)) return "[KAINA]";
    return "€" + v.toFixed(2).replace(".", ",");
  }

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : { qty: 0 };
    } catch (e) {
      return { qty: 0 };
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) { /* storage unavailable — cart just won't persist */ }
  }

  var cart = loadCart();

  // ===== DOM refs =====
  var cartCount = document.getElementById("cartCount");
  var cartItems = document.getElementById("cartItems");
  var cartEmpty = document.getElementById("cartEmpty");
  var cartTotal = document.getElementById("cartTotal");
  var checkoutBtn = document.getElementById("checkoutBtn");
  var cartDrawer = document.getElementById("cartDrawer");
  var cartOverlay = document.getElementById("cartOverlay");
  var openCartBtn = document.getElementById("openCart");
  var closeCartBtn = document.getElementById("closeCart");

  var qtyInput = document.getElementById("qtyInput");
  var qtyMinus = document.getElementById("qtyMinus");
  var qtyPlus = document.getElementById("qtyPlus");
  var addToCartBtn = document.getElementById("addToCart");
  var bundleRadios = document.querySelectorAll('input[name="bundle"]');

  var checkoutOverlay = document.getElementById("checkoutOverlay");
  var closeCheckoutBtn = document.getElementById("closeCheckout");
  var checkoutForm = document.getElementById("checkoutForm");
  var checkoutFormWrap = document.getElementById("checkoutFormWrap");
  var checkoutSuccess = document.getElementById("checkoutSuccess");
  var closeSuccessBtn = document.getElementById("closeSuccess");
  var orderSummary = document.getElementById("orderSummary");

  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  // ===== Render cart =====
  function render() {
    var qty = cart.qty || 0;
    cartCount.textContent = qty;

    cartItems.innerHTML = "";
    if (qty === 0) {
      cartEmpty.style.display = "block";
      cartItems.appendChild(cartEmpty);
      checkoutBtn.disabled = true;
    } else {
      checkoutBtn.disabled = false;
      var row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<img class="cart-item-thumb" src="assets/img/product-flat-suction-cups.jpg" alt="">' +
        '<div class="cart-item-info">' +
          '<h4>' + PRODUCT.name + '</h4>' +
          '<div class="cart-item-qty">' +
            '<button type="button" data-action="dec">−</button>' +
            '<span>' + qty + '</span>' +
            '<button type="button" data-action="inc">+</button>' +
          '</div>' +
          '<button type="button" class="cart-item-remove" data-action="remove">Pašalinti</button>' +
        '</div>' +
        '<div class="cart-item-price">' + money(PRODUCT.price !== null ? PRODUCT.price * qty : null) + '</div>';
      cartItems.appendChild(row);

      row.querySelector('[data-action="inc"]').addEventListener("click", function () {
        cart.qty = Math.min(10, cart.qty + 1);
        saveCart(cart);
        render();
      });
      row.querySelector('[data-action="dec"]').addEventListener("click", function () {
        cart.qty = Math.max(0, cart.qty - 1);
        saveCart(cart);
        render();
      });
      row.querySelector('[data-action="remove"]').addEventListener("click", function () {
        cart.qty = 0;
        saveCart(cart);
        render();
      });
    }

    cartTotal.textContent = PRODUCT.price !== null
      ? money(PRODUCT.price * qty)
      : (qty > 0 ? qty + " vnt. × [KAINA]" : "[KAINA]");
  }

  // ===== Quantity selector (product page) =====
  qtyMinus.addEventListener("click", function () {
    var v = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
    qtyInput.value = v;
  });
  qtyPlus.addEventListener("click", function () {
    var v = Math.min(10, parseInt(qtyInput.value || "1", 10) + 1);
    qtyInput.value = v;
  });
  qtyInput.addEventListener("change", function () {
    var v = parseInt(qtyInput.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 10) v = 10;
    qtyInput.value = v;
  });

  // ===== Bundle selector syncs quantity =====
  bundleRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      var option = radio.closest(".bundle-option");
      var qty = parseInt(option.getAttribute("data-qty"), 10) || 1;
      qtyInput.value = qty;
    });
  });

  addToCartBtn.addEventListener("click", function () {
    var add = parseInt(qtyInput.value, 10) || 1;
    cart.qty = Math.min(10, (cart.qty || 0) + add);
    saveCart(cart);
    render();
    openCart();
  });

  // ===== Cart drawer open/close =====
  function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  }
  function closeCart() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
  openCartBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // ===== Mobile nav toggle =====
  menuToggle.addEventListener("click", function () {
    var open = mainNav.style.display === "flex";
    mainNav.style.display = open ? "none" : "flex";
    mainNav.style.flexDirection = "column";
    mainNav.style.position = "absolute";
    mainNav.style.top = "76px";
    mainNav.style.left = "0";
    mainNav.style.right = "0";
    mainNav.style.background = "#ffffff";
    mainNav.style.padding = "16px 24px";
    mainNav.style.borderBottom = "1px solid #D8E3EC";
    mainNav.style.zIndex = "50";
  });

  // ===== Gallery thumbnails (real product photos) =====
  var thumbs = document.querySelectorAll(".gallery-thumbs .thumb");
  var galleryMainImg = document.getElementById("galleryMainImg");

  thumbs.forEach(function (t) {
    t.addEventListener("click", function () {
      thumbs.forEach(function (o) { o.classList.remove("active"); });
      t.classList.add("active");
      if (galleryMainImg) {
        galleryMainImg.src = t.getAttribute("data-img");
        galleryMainImg.alt = t.getAttribute("data-alt") || "";
      }
    });
  });

  // ===== Tabs (Ką gauni section) =====
  var tabBtns = document.querySelectorAll(".tab-btn");
  var tabPanels = document.querySelectorAll(".tab-panel");
  tabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtns.forEach(function (b) { b.classList.remove("active"); });
      tabPanels.forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById("tab-" + btn.getAttribute("data-tab")).classList.add("active");
    });
  });

  // ===== Fit illustration shapes (vehicle silhouettes) =====
  var SHAPES = {
    hatchback: "M8 62 Q10 40 30 38 L70 38 Q90 40 95 62 L95 74 Q95 80 88 80 L80 80 Q78 70 68 70 Q58 70 56 80 L38 80 Q36 70 26 70 Q16 70 14 80 L8 80 Q2 80 2 74 Z",
    sedan: "M4 62 Q6 38 26 36 L46 20 L78 20 L92 36 Q112 38 114 62 L114 76 Q114 82 106 82 L98 82 Q96 72 86 72 Q76 72 74 82 L44 82 Q42 72 32 72 Q22 72 20 82 L10 82 Q4 82 4 76 Z",
    crossover: "M4 58 Q6 32 28 30 L44 14 L84 14 L100 30 Q122 32 124 58 L124 78 Q124 84 116 84 L106 84 Q104 74 94 74 Q84 74 82 84 L46 84 Q44 74 34 74 Q24 74 22 84 L12 84 Q4 84 4 78 Z",
    suv: "M2 54 Q4 26 28 24 L42 8 L92 8 L110 24 Q136 26 138 54 L138 80 Q138 86 130 86 L118 86 Q116 76 106 76 Q96 76 94 86 L46 86 Q44 76 34 76 Q24 76 22 86 L10 86 Q2 86 2 80 Z",
    van: "M2 46 L2 78 Q2 84 10 84 L18 84 Q20 74 30 74 Q40 74 42 84 L98 84 Q100 74 110 74 Q120 74 122 84 L130 84 Q138 84 138 78 L138 30 Q138 22 128 22 L46 22 Q30 22 20 32 Z",
  };
  document.querySelectorAll(".fit-illustration").forEach(function (el) {
    var shape = SHAPES[el.getAttribute("data-shape")];
    if (!shape) return;
    el.innerHTML =
      '<svg viewBox="0 0 140 90" style="position:absolute;inset:0;width:100%;height:100%;">' +
        '<path d="' + shape + '" fill="#3E7CB1" opacity="0.85"/>' +
      '</svg>';
  });

  // ===== Checkout modal =====
  function openCheckout() {
    if (!cart.qty) return;
    orderSummary.textContent =
      PRODUCT.name + " × " + cart.qty + " — Viso: " + (PRODUCT.price !== null ? money(PRODUCT.price * cart.qty) : "[KAINA] (kaina bus patvirtinta)");
    checkoutFormWrap.classList.remove("hidden");
    checkoutSuccess.classList.add("hidden");
    checkoutOverlay.classList.add("active");
    closeCart();
  }
  function closeCheckout() {
    checkoutOverlay.classList.remove("active");
  }
  checkoutBtn.addEventListener("click", openCheckout);
  closeCheckoutBtn.addEventListener("click", closeCheckout);
  checkoutOverlay.addEventListener("click", function (e) {
    if (e.target === checkoutOverlay) closeCheckout();
  });

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Demo only: no real payment processing is wired up.
    // Integrate a payment provider (Stripe, Paysera, etc.) here before going live.
    checkoutFormWrap.classList.add("hidden");
    checkoutSuccess.classList.remove("hidden");
    cart.qty = 0;
    saveCart(cart);
    render();
  });
  closeSuccessBtn.addEventListener("click", closeCheckout);

  // ===== Footer year =====
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  render();
})();
