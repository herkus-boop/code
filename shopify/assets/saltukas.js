(function () {
  "use strict";

  // ===== Quantity selector =====
  var qtyInput = document.getElementById("qtyInput");
  var qtyMinus = document.getElementById("qtyMinus");
  var qtyPlus = document.getElementById("qtyPlus");

  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener("click", function () {
      var v = Math.max(1, parseInt(qtyInput.value || "1", 10) - 1);
      qtyInput.value = v;
    });
  }
  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener("click", function () {
      var v = Math.min(10, parseInt(qtyInput.value || "1", 10) + 1);
      qtyInput.value = v;
    });
  }
  if (qtyInput) {
    qtyInput.addEventListener("change", function () {
      var v = parseInt(qtyInput.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > 10) v = 10;
      qtyInput.value = v;
    });
  }

  // ===== Mobile nav toggle =====
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
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
      mainNav.style.borderBottom = "1px solid #E3E7EC";
      mainNav.style.zIndex = "50";
    });
  }

  // ===== Gallery thumbnails =====
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

  // ===== Real Shopify add-to-cart (AJAX Cart API) =====
  // Requires the section to render a <form id="saltukasForm"> with a
  // hidden input name="id" set to the variant id (see saltukas-product.liquid).
  var form = document.getElementById("saltukasForm");
  var addedNote = document.getElementById("cartAddedNote");
  var errorNote = document.getElementById("cartErrorNote");
  var cartCount = document.getElementById("cartCount");

  function showNote(el) {
    if (!el) return;
    el.classList.add("visible");
    window.setTimeout(function () { el.classList.remove("visible"); }, 4000);
  }

  function refreshCartCount() {
    if (!cartCount) return;
    fetch("/cart.js")
      .then(function (r) { return r.json(); })
      .then(function (cart) { cartCount.textContent = cart.item_count; })
      .catch(function () { /* non-fatal */ });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector("[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      var formData = new FormData(form);

      fetch("/cart/add.js", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (r) {
          if (!r.ok) return r.json().then(function (err) { throw err; });
          return r.json();
        })
        .then(function () {
          showNote(addedNote);
          refreshCartCount();
        })
        .catch(function (err) {
          if (errorNote) {
            errorNote.textContent = (err && err.description) || "Nepavyko pridėti į krepšelį. Bandykite dar kartą.";
          }
          showNote(errorNote);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  refreshCartCount();

  // ===== Footer year =====
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
