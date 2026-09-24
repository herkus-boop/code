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
