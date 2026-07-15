import { icon } from "../icons.mjs";
import { art } from "../art.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };

const whyIcons = ["gem", "sliders", "shieldCheck", "truck"];

function categoryHref(locale, cat) {
  return cat.productSlug ? path(locale, "product", cat.productSlug) : path(locale, "accessories");
}

export function homePage({ locale, t }) {
  const contact = path(locale, "contact");
  const catalogue = path(locale, "catalogue");

  const hero = `
<section class="hero">
  <div class="hero__media" data-parallax="0.12">
    ${art({ tone: "ink", ratio: "fill", glyphName: "interiorA", noCaption: true })}
  </div>
  <div class="container hero__content">
    <p class="eyebrow">${t.hero.eyebrow}</p>
    <h1 class="hero__headline">
      ${t.hero.headlineLines.map((line, i) => `<span class="line"><span style="--line-delay:${150 + i * 130}ms">${line}</span></span>`).join("")}
    </h1>
    <p class="hero__sub">${t.hero.subheadline}</p>
    <div class="hero__actions">
      <a class="btn btn--gold" href="${catalogue}">${t.hero.ctaPrimary}</a>
      <a class="btn btn--on-dark" href="${contact}">${t.hero.ctaSecondary}</a>
    </div>
  </div>
  <div class="hero__scroll">
    <span>${t.hero.scrollHint}</span>
    <span class="hero__scroll-line"></span>
  </div>
</section>`;

  const why = `
<section class="section" id="porque">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.why.eyebrow}</p>
      <h2 class="text-h2">${t.why.heading}</h2>
      <p class="text-lead">${t.why.intro}</p>
    </div>
    <div class="why-grid" data-reveal-group>
      ${t.why.cards
        .map(
          (card, i) => `
      <div class="why-card">
        <div class="why-card__icon">${icon(whyIcons[i % whyIcons.length])}</div>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const categories = `
<section class="section section--muted" id="catalogo">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${t.categories.eyebrow}</p>
      <h2 class="text-h2">${t.categories.heading}</h2>
      <p class="text-lead">${t.categories.intro}</p>
    </div>
    <div class="category-grid">
      ${categoriesData
        .map(
          (cat, i) => `
      <a class="category-card" href="${categoryHref(locale, cat)}" data-reveal style="--reveal-delay:${i * 80}ms">
        <div class="media-frame">
          ${photo(cat.image, `${cat.name[locale]} — Base Movement`)}
        </div>
        <div class="category-card__title">
          <h3>${cat.name[locale]}</h3>
          ${icon("arrowUpRight")}
        </div>
        <p>${cat.shortDescription[locale]}</p>
      </a>`
        )
        .join("")}
    </div>
    <div class="categories-footer" data-reveal>
      <a class="btn btn--secondary" href="${catalogue}">${t.categories.viewAll}</a>
    </div>
  </div>
</section>`;

  const customisation = `
<section class="section section--large" id="personalizacao">
  <div class="container">
    <div class="customisation-layout">
      <div class="customisation-gallery" data-reveal="scale">
        <div class="media-frame">${photo("reformer-2", locale === "pt" ? "Reformer em madeira de bordo natural" : "Reformer in natural maple wood")}</div>
        <div class="media-frame media-frame--cover">${photo("fabric", locale === "pt" ? "Estofo técnico em tom creme" : "Technical upholstery in cream tone")}</div>
        <div class="media-frame">${photo("metal-frame", locale === "pt" ? "Estrutura metálica em preto fosco" : "Metal frame in matte black")}</div>
      </div>
      <div class="customisation-copy" data-reveal>
        <p class="eyebrow">${t.customisation.eyebrow}</p>
        <h2 class="text-h2">${t.customisation.headingLines.join("<br/>")}</h2>
        ${t.customisation.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        <div class="customisation-options">
          ${t.customisation.options
            .map(
              (opt) => `
          <div class="customisation-option">
            <h4>${opt.title}</h4>
            <p>${opt.text}</p>
          </div>`
            )
            .join("")}
        </div>
        <a class="btn btn--primary" href="${contact}">${t.customisation.cta}</a>
      </div>
    </div>
  </div>
</section>`;

  const designedFor = `
<section class="section section--sand">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.designedFor.eyebrow}</p>
      <h2 class="text-h2">${t.designedFor.heading}</h2>
      <p class="text-lead">${t.designedFor.intro}</p>
    </div>
    <div class="designed-grid" data-reveal-group>
      ${t.designedFor.items
        .map(
          (item, i) => `
      <div class="designed-card">
        <div class="designed-card__num">${String(i + 1).padStart(2, "0")}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const whyChoose = `
<section class="section">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.whyChoose.eyebrow}</p>
      <h2 class="text-h2">${t.whyChoose.heading}</h2>
      <p class="text-lead">${t.whyChoose.intro}</p>
    </div>
    <div class="timeline">
      ${t.whyChoose.timeline
        .map(
          (item, i) => `
      <div class="timeline-item" data-reveal style="--reveal-delay:${(i % 2) * 60}ms">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const galleryShots = [
    ["cadillac-1", { pt: "Cadillac em madeira de bordo com estofo preto", en: "Maple Cadillac with black upholstery" }],
    ["reformer-1", { pt: "Reformer profissional em madeira de bordo", en: "Professional maple reformer" }],
    ["ladder-tower", { pt: "Torre de barras em madeira", en: "Wooden ladder tower" }],
    ["fabric", { pt: "Estofo técnico em tom creme", en: "Technical upholstery in cream tone" }],
    ["reformer-2", { pt: "Reformer em madeira com carruagem preta", en: "Wood reformer with black carriage" }],
    ["trio-beech", { pt: "Chair, Ladder Barrel e Spine Corrector em faia", en: "Beech Chair, Ladder Barrel and Spine Corrector" }],
    ["cadillac-4", { pt: "Estrutura Cadillac completa", en: "Complete Cadillac frame" }],
    ["acc-blocks", { pt: "Acessórios de cortiça natural", en: "Natural cork accessories" }],
  ];
  const gallery = `
<section class="section section--muted">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.gallery.eyebrow}</p>
      <h2 class="text-h2">${t.gallery.heading}</h2>
      <p class="text-lead">${t.gallery.intro}</p>
    </div>
    <div class="masonry">
      ${galleryShots
        .map(
          ([name, alt], i) => `
      <div class="media-frame" data-lightbox data-reveal="scale" style="--reveal-delay:${(i % 4) * 70}ms">
        ${photo(name, alt[locale])}
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const testimonials = `
<section class="section">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.testimonials.eyebrow}</p>
      <h2 class="text-h2">${t.testimonials.heading}</h2>
    </div>
    <div class="testimonial-grid" data-reveal-group>
      ${t.testimonials.items
        .map(
          (item) => `
      <div class="testimonial-card">
        <div class="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</div>
        <blockquote>&ldquo;${item.quote}&rdquo;</blockquote>
        <footer>
          <cite>${item.name}</cite>
          <span class="role">${item.role}</span>
        </footer>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const faq = `
<section class="section section--muted">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${t.faq.eyebrow}</p>
      <h2 class="text-h2">${t.faq.heading}</h2>
    </div>
    <div class="faq-list" data-reveal>
      ${t.faq.items
        .map(
          (item, i) => `
      <div class="faq-item" data-open="false">
        <h3>
          <button class="faq-item__trigger" aria-expanded="false" aria-controls="faq-panel-${i}">
            <span>${item.q}</span>
            <span class="faq-item__icon"></span>
          </button>
        </h3>
        <div class="faq-item__panel" id="faq-panel-${i}">
          <div class="faq-item__panel-inner"><p>${item.a}</p></div>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  const finalCta = `
<section class="section section--dark final-cta">
  <div class="hero__media" data-parallax="0.08" style="opacity:0.5;">
    ${art({ tone: "ink", ratio: "fill", glyphName: "interiorB", noCaption: true })}
  </div>
  <div class="container final-cta__inner" data-reveal>
    <h2 class="text-h2">${t.finalCta.heading}</h2>
    <p class="text-lead" style="color:rgba(248,248,246,0.75);">${t.finalCta.text}</p>
    <a class="btn btn--gold" href="${contact}">${t.finalCta.cta}</a>
  </div>
</section>`;

  return [hero, why, categories, customisation, designedFor, whyChoose, gallery, testimonials, faq, finalCta].join("\n");
}
