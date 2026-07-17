import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };
import productsData from "../../data/products.json" with { type: "json" };

const ROMANS = ["I", "II", "III", "IV", "V"];

function categoryHref(locale, cat) {
  return path(locale, "category", cat.kind === "equipment" ? cat.productSlug : cat.slug);
}

function catCount(cat) {
  if (cat.kind === "equipment") {
    const p = productsData.products.find((p) => p.categoryKey === cat.key);
    return p ? p.series.length : 0;
  }
  const a = productsData.accessoryCategories.find((a) => a.key === cat.key);
  return a ? a.items.length : 0;
}

/* Split the two headline lines, italicising one word for editorial rhythm */
function headlineLines(t) {
  return t.hero.headlineLines
    .map((line, i) => {
      const words = line.split(" ");
      const last = words.pop().replace(/\.$/, "");
      const lead = words.join(" ");
      return `<span class="line"><span style="--line-delay:${200 + i * 160}ms">${lead} <em>${last}.</em></span></span>`;
    })
    .join("");
}

export function homePage({ locale, t }) {
  const contact = path(locale, "contact");
  const catalogue = path(locale, "catalogue");
  const x = t.experience;
  const modelsWord = (n) =>
    locale === "pt" ? (n === 1 ? "modelo" : "modelos") : n === 1 ? "model" : "models";

  /* ---------- Prologue ---------- */
  const heroAlt =
    locale === "pt"
      ? "Estúdio Base Movement — reformer com torre e acessórios em tons neutros"
      : "Base Movement studio — tower reformer and accessories in neutral tones";
  const prologue = `
<section class="prologue" id="prologo" data-chapter data-chapter-label="✳">
  <div class="prologue__media" data-hero-media data-parallax="0.1">
    ${photo("hero", heroAlt, { eager: true, extraClass: "hero__photo" })}
  </div>
  <div class="container prologue__content">
    <p class="prologue__breathe" data-reveal="fade">${x.prologueIntro}</p>
    <h1 class="prologue__headline">${headlineLines(t)}</h1>
    <p class="prologue__sub" data-reveal style="--reveal-delay:350ms">${t.hero.subheadline}</p>
    <div class="prologue__actions" data-reveal style="--reveal-delay:500ms">
      <a class="btn btn--primary btn--magnetic" href="${catalogue}">${t.hero.ctaPrimary}</a>
      <a class="btn btn--secondary btn--magnetic" href="${contact}">${t.hero.ctaSecondary}</a>
    </div>
  </div>
  <div class="hero__scroll">
    <span>${t.hero.scrollHint}</span>
    <span class="hero__scroll-line"></span>
  </div>
</section>`;

  /* ---------- Manifesto ---------- */
  const manifesto = `
<section class="manifesto" id="manifesto">
  <div class="living"></div>
  <div class="container" style="position:relative;">
    <h2 class="manifesto__words" aria-label="${x.manifestoWords.join(" ")}">
      ${x.manifestoWords.map((w, i) => `<span class="word" data-reveal style="--reveal-delay:${i * 140}ms"><span>${w}</span></span>`).join("")}
    </h2>
    <p class="manifesto__lead" data-reveal>${x.manifestoLead}</p>
    <div class="manifesto__index" data-reveal-group>
      ${x.manifestoIndex
        .map(
          (row) => `
      <div class="manifesto__row">
        <span class="num">${row.num}</span>
        <h3>${row.title}</h3>
        <p>${row.text}</p>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  /* ---------- The Collection — every category, one full grid, accessories
       first, equal weight, no horizontal scroll. This is where a visitor
       immediately sees everything, including the accessory lines. ---------- */
  const collection = `
<section class="section section--muted" id="colecao" data-chapter data-chapter-label="◇">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${t.categories.eyebrow}</p>
      <h2 class="text-h2">${t.categories.heading}</h2>
      <p class="text-lead">${t.categories.intro}</p>
    </div>
    <div class="collection-grid">
      ${categoriesData
        .map(
          (cat, i) => `
      <a class="collection-card" href="${categoryHref(locale, cat)}" data-reveal style="--reveal-delay:${(i % 4) * 55}ms">
        <div class="media-frame">${photo(cat.image, `${cat.name[locale]} — Base Movement`)}</div>
        <div class="collection-card__title">
          <h3>${cat.name[locale]}</h3>
          ${icon("arrowUpRight")}
        </div>
        <p>${cat.shortDescription[locale]}</p>
        <span class="collection-card__meta">${catCount(cat)} ${modelsWord(catCount(cat))}</span>
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  /* ---------- Equipment chapters I–V — editorial storytelling, each with a
       compact preview grid (first models) linking to the full category. ---------- */
  const chapters = productsData.products
    .map((product, i) => {
      const cat = categoriesData.find((c) => c.key === product.categoryKey);
      const roman = ROMANS[i];
      const odd = i % 2 === 1;
      const href = categoryHref(locale, cat);
      const dims = product.dimensions;
      const preview = product.series
        .slice(0, 4)
        .map(
          (model) => `
      <div class="series-card">
        <div class="media-frame">${photo(model.image, `${model.name[locale]} — ${cat.name[locale]}`)}</div>
        <div class="series-card__body">
          <p class="series-card__ref">${t.product.refLabel} ${model.sku}</p>
          <h4>${model.name[locale]}</h4>
          <p class="series-card__dims">${model.dims}</p>
          <a class="icon-link" href="${contact}?produto=${encodeURIComponent(model.sku + " — " + model.name[locale])}">${t.product.requestQuote} ${icon("arrowRight")}</a>
        </div>
      </div>`
        )
        .join("");

      return `
<section class="chapter ${odd ? "chapter--odd" : "chapter--even"} ${i % 2 === 0 ? "" : "chapter--muted"}" id="cap-${roman.toLowerCase()}" data-chapter data-chapter-label="${roman}">
  <div class="chapter__num" aria-hidden="true" data-speed="-0.06">${String(i + 1).padStart(2, "0")}</div>
  <div class="container">
    <div class="chapter__head">
      <div class="chapter__media" data-reveal="scale" data-zoom>
        ${photo(product.images[0], `${product.name} — ${cat.name[locale]}`)}
        <span class="chapter__dim">${dims.length_cm} × ${dims.width_cm} × ${dims.height_cm} cm</span>
      </div>
      <div>
        <div class="chapter__kicker" data-reveal>
          <span class="roman">${roman}</span>
          <span class="eyebrow">${x.chapterLabel} ${String(i + 1).padStart(2, "0")}</span>
        </div>
        <h2 class="chapter__title" data-reveal>${cat.name[locale]}</h2>
        <p class="chapter__tagline" data-reveal>${product.tagline[locale]}</p>
        <p class="chapter__desc" data-reveal>${cat.shortDescription[locale]} ${product.description[locale].split(".")[0]}.</p>
        <div class="chapter__cta" data-reveal>
          <a class="icon-link" href="${href}">${x.exploreChapter} ${icon("arrowUpRight")}</a>
        </div>
      </div>
    </div>
    <p class="grid-hint" data-reveal>${x.viewHint} — ${product.series.length} ${modelsWord(product.series.length)}</p>
    <div class="series-grid">${preview}</div>
    <div style="margin-top:var(--space-lg)" data-reveal>
      <a class="btn btn--secondary btn--magnetic" href="${href}">${t.categories.viewAll}</a>
    </div>
  </div>
</section>`;
    })
    .join("");

  /* ---------- Interlude: matter ---------- */
  const matterImages = ["fabric", "reformer-2", "metal-frame"];
  const matter = `
<section class="matter" id="materia">
  <div class="living living--dark"></div>
  <div class="container" style="position:relative;">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${x.matterEyebrow}</p>
      <h2 class="text-h2">${x.matterTitle}</h2>
      <p class="text-lead">${x.matterIntro}</p>
    </div>
    <div class="matter__bands" data-reveal-group>
      ${x.matterBands
        .map(
          (band, i) => `
      <a class="matter__band" href="${path(locale, "home")}#personalizacao-detalhe" data-band>
        ${photo(matterImages[i], band.label)}
        <span class="matter__band-label">
          <span class="big">${band.label}</span>
          <span class="sub">${band.sub}</span>
        </span>
      </a>`
        )
        .join("")}
    </div>
    <div id="personalizacao-detalhe" style="margin-top:var(--space-2xl);display:grid;gap:var(--space-md);grid-template-columns:repeat(auto-fill,minmax(13rem,1fr));" data-reveal-group>
      ${t.customisation.options
        .map(
          (opt) => `
      <div class="customisation-option">
        <h4 style="color:var(--c-gold);">${opt.title}</h4>
        <p style="color:rgba(248,248,246,0.65);">${opt.text}</p>
      </div>`
        )
        .join("")}
    </div>
    <div style="margin-top:var(--space-xl);" data-reveal>
      <a class="btn btn--gold btn--magnetic" href="${contact}">${t.customisation.cta}</a>
    </div>
  </div>
</section>`;

  /* ---------- Contexts ticker ---------- */
  const tickerItems = t.designedFor.items.map((item) => `<span class="ticker__item">${item.title}</span>`).join("");
  const ticker = `
<section class="ticker" aria-label="${t.designedFor.heading}">
  <div class="ticker__inner">${tickerItems}${tickerItems}</div>
</section>`;

  /* ---------- Voices — static grid (no horizontal scroll) ---------- */
  const quotes = `
<section class="quotes">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${x.quotesEyebrow}</p>
      <h2 class="text-h2">${t.testimonials.heading}</h2>
    </div>
    <div class="testimonial-grid" data-reveal-group>
      ${t.testimonials.items
        .map(
          (item) => `
      <div class="testimonial-card">
        <div class="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</div>
        <blockquote>&ldquo;${item.quote}&rdquo;</blockquote>
        <footer><cite>${item.name}</cite><span class="role">${item.role}</span></footer>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  /* ---------- FAQ (final notes) ---------- */
  const faq = `
<section class="section section--muted">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow eyebrow--center">${x.faqEyebrow}</p>
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

  /* ---------- Epilogue ---------- */
  const finalWords = t.finalCta.heading.split(" ");
  const finalLast = finalWords.pop().replace(/\.$/, "");
  const epilogue = `
<section class="epilogue" id="epilogo" data-chapter data-chapter-label="∞">
  <div class="living living--dark"></div>
  <div class="container epilogue__content">
    <p class="eyebrow eyebrow--center" style="color:var(--c-gold);" data-reveal>${x.epilogueEyebrow}</p>
    <h2 data-reveal>${finalWords.join(" ")} <em>${finalLast}.</em></h2>
    <p data-reveal>${t.finalCta.text}</p>
    <a class="btn btn--gold btn--magnetic" href="${contact}" data-reveal>${t.finalCta.cta}</a>
  </div>
</section>`;

  /* ---------- Chapter rail ---------- */
  const railStops = [
    { label: "✳", target: "prologo" },
    { label: "◇", target: "colecao" },
    ...ROMANS.map((r) => ({ label: r, target: `cap-${r.toLowerCase()}` })),
    { label: "∞", target: "epilogo" },
  ];
  const rail = `
<nav class="chapter-rail" aria-label="${x.chapterLabel}">
  ${railStops
    .map(
      (s, i) =>
        `<a href="#${s.target}" data-rail>${s.label}</a>${i < railStops.length - 1 ? '<span class="chapter-rail__line"></span>' : ""}`
    )
    .join("")}
</nav>`;

  return [rail, prologue, manifesto, collection, chapters, matter, ticker, quotes, faq, epilogue].join("\n");
}
