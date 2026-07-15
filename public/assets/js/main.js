// Base Movement — front-end interactions. Vanilla JS, zero dependencies.
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
   * Preloader
   * ------------------------------------------------------------------- */
  function initPreloader() {
    var done = function () {
      document.body.classList.add("is-loaded");
    };
    if (document.readyState === "complete") {
      requestAnimationFrame(function () { setTimeout(done, prefersReducedMotion ? 0 : 350); });
    } else {
      window.addEventListener("load", function () {
        setTimeout(done, prefersReducedMotion ? 0 : 350);
      });
    }
    // Safety net: never let the preloader block content indefinitely.
    setTimeout(done, 2500);
  }

  /* ---------------------------------------------------------------------
   * Header scroll state
   * ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var threshold = 24;
    var onScroll = function () {
      if (window.scrollY > threshold) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Mobile menu
   * ------------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var header = document.querySelector(".site-header");
    var body = document.body;
    if (!toggle) return;

    // The mobile menu panel has a light background, so the header must
    // sit in its solid/dark-text state while open — otherwise a
    // transparent (light-text) header over a hero blends into it.
    var syncHeaderForMenu = function (isOpen) {
      if (!header) return;
      if (isOpen) {
        header.classList.add("is-scrolled");
      } else if (window.scrollY <= 24) {
        header.classList.remove("is-scrolled");
      }
    };

    toggle.addEventListener("click", function () {
      var isOpen = body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      body.style.overflow = isOpen ? "hidden" : "";
      syncHeaderForMenu(isOpen);
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
        syncHeaderForMenu(false);
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Language switch dropdown (desktop)
   * ------------------------------------------------------------------- */
  function initLangSwitch() {
    document.querySelectorAll("[data-lang-switch]").forEach(function (root) {
      var toggle = root.querySelector("[data-lang-toggle]");
      if (!toggle) return;
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = root.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll("[data-lang-switch].is-open").forEach(function (root) {
        root.classList.remove("is-open");
        var toggle = root.querySelector("[data-lang-toggle]");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll("[data-lang-switch].is-open").forEach(function (root) {
          root.classList.remove("is-open");
        });
      }
    });
  }

  /* ---------------------------------------------------------------------
   * FAQ accordion
   * ------------------------------------------------------------------- */
  function initAccordion() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var trigger = item.querySelector(".faq-item__trigger");
      var panel = item.querySelector(".faq-item__panel");
      if (!trigger || !panel) return;
      var inner = panel.firstElementChild;
      trigger.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";
        // Close siblings within the same list for a single-open accordion feel.
        item.closest(".faq-list").querySelectorAll('.faq-item[data-open="true"]').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.setAttribute("data-open", "false");
            openItem.querySelector(".faq-item__trigger").setAttribute("aria-expanded", "false");
            openItem.querySelector(".faq-item__panel").style.height = "0px";
          }
        });
        if (isOpen) {
          item.setAttribute("data-open", "false");
          trigger.setAttribute("aria-expanded", "false");
          panel.style.height = "0px";
        } else {
          item.setAttribute("data-open", "true");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.height = inner.offsetHeight + "px";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Scroll reveal (IntersectionObserver)
   * ------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll("[data-reveal], [data-reveal-group]");
    if (!targets.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
   * Subtle hero parallax
   * ------------------------------------------------------------------- */
  function initParallax() {
    if (prefersReducedMotion) return;
    var layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length) return;
    var ticking = false;
    var update = function () {
      var y = window.scrollY;
      layers.forEach(function (layer) {
        var speed = parseFloat(layer.getAttribute("data-parallax")) || 0.15;
        var offset = Math.min(y * speed, 140);
        layer.style.transform = "translate3d(0, " + offset + "px, 0)";
      });
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---------------------------------------------------------------------
   * Product gallery — thumbnail swap
   * ------------------------------------------------------------------- */
  function initProductGallery() {
    var main = document.querySelector("[data-gallery-main]");
    if (!main) return;
    var thumbs = document.querySelectorAll("[data-gallery-thumb]");
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        thumbs.forEach(function (t) { t.setAttribute("aria-current", "false"); });
        thumb.setAttribute("aria-current", "true");
        var variant = thumb.getAttribute("data-gallery-thumb");
        main.setAttribute("data-variant", variant);
        var newClass = thumb.querySelector(".art-placeholder").className;
        var art = main.querySelector(".art-placeholder");
        if (art) art.className = newClass.replace("art-placeholder--square", "").trim() + " " + (main.getAttribute("data-main-ratio") || "art-placeholder--wide");
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Product tabs
   * ------------------------------------------------------------------- */
  function initTabs() {
    document.querySelectorAll(".product-tabs").forEach(function (tabs) {
      var buttons = tabs.querySelectorAll(".product-tabs__btn");
      var panels = tabs.querySelectorAll(".product-tabs__panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = btn.getAttribute("data-tab");
          buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
          btn.setAttribute("aria-selected", "true");
          panels.forEach(function (p) {
            p.setAttribute("data-active", p.getAttribute("data-tab") === target ? "true" : "false");
          });
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Gallery lightbox
   * ------------------------------------------------------------------- */
  function initLightbox() {
    var lightbox = document.querySelector("[data-lightbox-root]");
    var items = document.querySelectorAll("[data-lightbox]");
    if (!lightbox || !items.length) return;
    var frame = lightbox.querySelector("[data-lightbox-frame]");
    var closeBtn = lightbox.querySelector("[data-lightbox-close]");
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    var index = 0;

    function render() {
      var source = items[index].querySelector(".art-placeholder");
      frame.innerHTML = source ? source.outerHTML : "";
    }
    function open(i) {
      index = i;
      render();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function step(dir) {
      index = (index + dir + items.length) % items.length;
      render();
    }

    items.forEach(function (item, i) {
      item.addEventListener("click", function () { open(i); });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---------------------------------------------------------------------
   * Forms — client-side validation + simulated submit
   * (No backend is wired up yet: swap the TODO below for a real endpoint,
   * e.g. Formspree, a serverless function, or the studio's CRM webhook.)
   * ------------------------------------------------------------------- */
  function initForms() {
    document.querySelectorAll("[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll("[required]").forEach(function (field) {
          var wrapper = field.closest(".form-field");
          var fieldValid = field.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) : field.value.trim().length > 0;
          if (wrapper) wrapper.classList.toggle("has-error", !fieldValid);
          if (!fieldValid) valid = false;
        });
        if (!valid) return;

        // TODO: wire to a real submission endpoint.
        form.classList.add("is-success");
        if (form.reset) form.reset();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPreloader();
    initHeader();
    initMobileMenu();
    initLangSwitch();
    initAccordion();
    initReveal();
    initParallax();
    initProductGallery();
    initTabs();
    initLightbox();
    initForms();
  });
})();
