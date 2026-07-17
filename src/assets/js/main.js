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
   * Custom cursor — dot + trailing ring with contextual labels
   * ------------------------------------------------------------------- */
  function initCursor() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var dot = document.createElement("div");
    dot.className = "cursor";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.innerHTML = '<span class="cursor-label"></span>';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("has-cursor");

    var label = ring.querySelector(".cursor-label");
    var mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = "translate(" + (mx - 3) + "px," + (my - 3) + "px)";
    }, { passive: true });

    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + (rx - ring.offsetWidth / 2) + "px," + (ry - ring.offsetHeight / 2) + "px)";
      requestAnimationFrame(loop);
    })();

    var hint = document.documentElement.lang.indexOf("pt") === 0
      ? { view: "Ver" }
      : { view: "View" };

    document.addEventListener("mouseover", function (e) {
      var media = e.target.closest("[data-lightbox], .chapter__media");
      var link = e.target.closest("a, button");
      if (media) {
        ring.classList.add("is-hover");
        label.textContent = hint.view;
      } else if (link) {
        ring.classList.add("is-hover");
        label.textContent = "";
      } else {
        ring.classList.remove("is-hover");
        label.textContent = "";
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Scroll scrub — chapter numerals drift, chapter media de-zooms
   * ------------------------------------------------------------------- */
  function initScrub() {
    if (prefersReducedMotion) return;
    var speedEls = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
    var zoomEls = Array.prototype.slice.call(document.querySelectorAll("[data-zoom]"));
    if (!speedEls.length && !zoomEls.length) return;

    var vh = window.innerHeight;
    window.addEventListener("resize", function () { vh = window.innerHeight; }, { passive: true });

    var ticking = false;
    function update() {
      speedEls.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-speed"));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      zoomEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        // progress 0 (entering) -> 1 (leaving): settle from 1.12 to 1
        var p = Math.min(1, Math.max(0, 1 - rect.top / vh));
        var img = el.querySelector(".photo, img");
        if (img) img.style.transform = "scale(" + (1.1 - 0.1 * Math.min(1, p * 1.6)).toFixed(3) + ")";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
   * Chapter rail — highlights the chapter in view
   * ------------------------------------------------------------------- */
  function initChapterRail() {
    var rail = document.querySelector(".chapter-rail");
    var chapters = document.querySelectorAll("[data-chapter]");
    if (!rail || !chapters.length || !("IntersectionObserver" in window)) return;
    var links = rail.querySelectorAll("[data-rail]");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    chapters.forEach(function (ch) { observer.observe(ch); });
  }

  /* ---------------------------------------------------------------------
   * Magnetic buttons — drift a few px toward the cursor
   * ------------------------------------------------------------------- */
  function initMagnetic() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".btn--magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
        var dy = (e.clientY - rect.top - rect.height / 2) * 0.3;
        btn.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------
   * Hero pointer parallax — the photo drifts gently towards the cursor
   * ------------------------------------------------------------------- */
  function initHeroPointer() {
    if (prefersReducedMotion) return;
    var media = document.querySelector("[data-hero-media]");
    if (!media) return;
    var img = media.querySelector("img");
    if (!img) return;
    var hero = media.closest(".hero, .prologue");
    if (!hero) return;
    var raf = null;
    var targetX = 0, targetY = 0;

    hero.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      var rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * -2; // -1..1
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
      if (!raf) {
        raf = requestAnimationFrame(function () {
          img.classList.add("is-tracking");
          img.style.setProperty("--hero-x", (targetX * 1.1).toFixed(2) + "%");
          img.style.setProperty("--hero-y", (targetY * 1.1).toFixed(2) + "%");
          raf = null;
        });
      }
    });
    hero.addEventListener("pointerleave", function () {
      img.classList.remove("is-tracking");
      img.style.setProperty("--hero-x", "0%");
      img.style.setProperty("--hero-y", "0%");
    });
  }

  /* ---------------------------------------------------------------------
   * Quote request prefill — /contacto/?produto=REF pre-fills the message
   * ------------------------------------------------------------------- */
  function initQuotePrefill() {
    var message = document.querySelector("form[data-form] #message");
    if (!message) return;
    var params = new URLSearchParams(window.location.search);
    var product = params.get("produto") || params.get("product");
    if (!product || message.value) return;
    var lang = document.documentElement.lang || "pt-PT";
    message.value = lang.indexOf("pt") === 0
      ? "Gostaria de solicitar um orçamento para: " + product + "\n\n"
      : "I would like to request a quote for: " + product + "\n\n";
  }

  /* ---------------------------------------------------------------------
   * Product gallery — thumbnail swap
   * ------------------------------------------------------------------- */
  function initProductGallery() {
    var main = document.querySelector("[data-gallery-main]");
    if (!main) return;
    var mainImg = main.querySelector("img");
    var thumbs = document.querySelectorAll("[data-gallery-thumb]");
    if (!mainImg) return;
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        thumbs.forEach(function (t) { t.setAttribute("aria-current", "false"); });
        thumb.setAttribute("aria-current", "true");
        mainImg.src = thumb.getAttribute("data-src");
        mainImg.alt = thumb.getAttribute("data-alt") || "";
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
      var source = items[index].querySelector("img, .art-placeholder");
      frame.innerHTML = source ? source.outerHTML : "";
      var img = frame.querySelector("img");
      if (img) {
        img.style.cssText = "position:static;width:100%;height:100%;object-fit:contain;padding:0;background:transparent;";
      }
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
    initCursor();
    initScrub();
    initChapterRail();
    initMagnetic();
    initHeroPointer();
    initQuotePrefill();
    initProductGallery();
    initTabs();
    initLightbox();
    initForms();
  });
})();
