import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };
import productsData from "../../data/products.json" with { type: "json" };

const ROMANS = ["I", "II", "III", "IV", "V", "VI"];

function categoryHref(locale, cat) {
  return cat.productSlug ? path(locale, "product", cat.productSlug) : path(locale, "accessories");
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

  /* ---------- Chapters I–V (equipment) ---------- */
  const chapters = productsData.products
    .map((product, i) => {
      const cat = categoriesData.find((c) => c.key === product.categoryKey);
      const roman = ROMANS[i];
      const odd = i % 2 === 1;
      const href = categoryHref(locale, cat);
      const dims = product.dimensions;
      const strip = product.series
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
    <div class="filmstrip-zone" data-reveal>
      <p class="filmstrip-hint">${x.dragHint} — ${product.series.length} ${locale === "pt" ? "modelos" : "models"}</p>
      <div class="filmstrip" data-filmstrip>${strip}</div>
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

  /* ---------- Chapter VI: accessories ---------- */
  const accTeaser = productsData.accessoryGroups
    .flatMap((g) => g.items)
    .filter((item, idx, arr) => arr.findIndex((o) => o.image === item.image) === idx)
    .slice(0, 12);
  const accessories = `
<section class="chapter chapter--even" id="cap-vi" data-chapter data-chapter-label="VI">
  <div class="chapter__num" aria-hidden="true" data-speed="-0.06">06</div>
  <div class="container">
    <div class="chapter__head">
      <div>
        <div class="chapter__kicker" data-reveal>
          <span class="roman">VI</span>
          <span class="eyebrow">${x.chapterLabel} 06</span>
        </div>
        <h2 class="chapter__title" data-reveal>${x.accessoriesChapterTitle}</h2>
        <p class="chapter__desc" data-reveal>${x.accessoriesChapterText}</p>
        <div class="chapter__cta" data-reveal>
          <a class="icon-link" href="${path(locale, "accessories")}">${x.accessoriesCta} ${icon("arrowUpRight")}</a>
        </div>
      </div>
      <div class="chapter__media" data-reveal="scale" data-zoom>
        ${photo("acc-blocks", locale === "pt" ? "Acessórios de cortiça natural" : "Natural cork accessories")}
      </div>
    </div>
    <div class="filmstrip-zone" data-reveal>
      <p class="filmstrip-hint">${x.dragHint} — 54 ${locale === "pt" ? "objetos" : "objects"}</p>
      <div class="filmstrip" data-filmstrip>
        ${accTeaser
          .map(
            (item) => `
        <div class="accessory-card">
          <div class="media-frame">${photo(item.image, `${item.name[locale]} — Base Movement`)}</div>
          <h4>${item.name[locale]}</h4>
          <p>${item.spec}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </div>
</section>`;

  /* ---------- Contexts ticker ---------- */
  const tickerItems = t.designedFor.items.map((item) => `<span class="ticker__item">${item.title}</span>`).join("");
  const ticker = `
<section class="ticker" aria-label="${t.designedFor.heading}">
  <div class="ticker__inner">${tickerItems}${tickerItems}</div>
</section>`;

  /* ---------- Giant quotes ---------- */
  const quotes = `
<section class="quotes">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${x.quotesEyebrow}</p>
      <h2 class="text-h2">${t.testimonials.heading}</h2>
    </div>
  </div>
  <div class="quotes__strip" data-filmstrip>
    ${t.testimonials.items
      .map(
        (item) => `
    <div class="quote-slide">
      <blockquote>${item.quote}</blockquote>
      <footer><cite>${item.name}</cite><span class="role">${item.role}</span></footer>
    </div>`
      )
      .join("")}
  </div>
</section>`;

  /* ---------- FAQ (final notes) ---------- */
  const faq = `
<section class="section">
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
  const rail = `
<nav class="chapter-rail" aria-label="${x.chapterLabel}">
  ${["✳", ...ROMANS, "∞"]
    .map((label, i) => {
      const targets = ["prologo", "cap-i", "cap-ii", "cap-iii", "cap-iv", "cap-v", "cap-vi", "epilogo"];
      return `<a href="#${targets[i]}" data-rail>${label}</a>${i < 7 ? '<span class="chapter-rail__line"></span>' : ""}`;
    })
    .join("")}
</nav>`;

  return [rail, prologue, manifesto, chapters, matter, accessories, ticker, quotes, faq, epilogue].join("\n");
}
