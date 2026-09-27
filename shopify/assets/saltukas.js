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

  // ===== Add to cart button: shows "out of stock" instead of adding =====
  var form = document.getElementById("saltukasForm");
  var soldOutNote = document.getElementById("soldOutNote");

  function showNote(el) {
    if (!el) return;
    el.classList.add("visible");
    window.setTimeout(function () { el.classList.remove("visible"); }, 6000);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showNote(soldOutNote);
    });
  }

  // ===== Footer year =====
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
