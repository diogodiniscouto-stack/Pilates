import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };

function fmtEUR(n) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function swatchRowLocalised(items, locale) {
  if (!items || !items.length) return "";
  return `<div class="swatch-row">
    ${items.map((s) => `<span class="swatch"><span class="swatch__dot" style="background:${s.hex}"></span>${s.name[locale]}</span>`).join("")}
  </div>`;
}

export function productPage({ locale, t, product, category }) {
  const catalogue = path(locale, "catalogue");
  const contact = path(locale, "contact");
  const viewWord = locale === "pt" ? "vista" : "view";
  const altFor = (i) => `${product.name} — ${category.name[locale]}, ${viewWord} ${i + 1}`;

  const thumbs = product.images
    .map(
      (img, i) => `
    <button data-gallery-thumb data-src="/assets/img/products/${img}.jpg" data-alt="${altFor(i)}" aria-current="${i === 0 ? "true" : "false"}" aria-label="${altFor(i)}">
      ${photo(img, altFor(i))}
    </button>`
    )
    .join("");

  const related = product.relatedSlugs
    .map((slug) => {
      const relCat = categoriesData.find((c) => c.productSlug === slug);
      if (!relCat) return "";
      return `
    <a class="category-card" href="${path(locale, "product", slug)}">
      <div class="media-frame">
        ${photo(relCat.image, `${relCat.name[locale]} — Base Movement`)}
      </div>
      <div class="category-card__title">
        <h3>${relCat.name[locale]}</h3>
        ${icon("arrowUpRight")}
      </div>
      <p>${relCat.shortDescription[locale]}</p>
    </a>`;
    })
    .join("");

  return `
<div class="page-header page-header--slim">
  <div class="container">
    <div class="page-header__breadcrumb">
      <a href="${catalogue}">${t.nav.catalogue}</a>
      <span>/</span>
      <span>${category.name[locale]}</span>
    </div>
  </div>
</div>

<section class="section section--tight">
  <div class="container">
    <div class="product-layout">
      <div data-reveal>
        <div class="media-frame product-gallery__main" data-gallery-main>
          ${photo(product.images[0], altFor(0), { eager: true })}
        </div>
        <div class="product-gallery__thumbs">${thumbs}</div>
      </div>

      <div class="product-info" data-reveal style="--reveal-delay:120ms">
        <p class="eyebrow product-info__cat">${category.name[locale]}</p>
        <h1 class="text-h1">${product.name}</h1>
        <p class="tagline">${product.tagline[locale]}</p>
        <p class="price"><small>${t.product.startingFrom}</small>${fmtEUR(product.priceFrom)}</p>
        <p class="overview">${product.description[locale]}</p>

        <div class="product-info__actions">
          <a class="btn btn--primary" href="${contact}">${t.product.requestQuote}</a>
        </div>

        ${
          product.colourways?.length
            ? `<div class="swatch-group"><h3>${t.product.colourways}</h3>${swatchRowLocalised(product.colourways, locale)}</div>`
            : ""
        }
        ${
          product.woodFinishes?.length
            ? `<div class="swatch-group"><h3>${t.product.woodFinishes}</h3>${swatchRowLocalised(product.woodFinishes, locale)}</div>`
            : ""
        }
        ${
          product.metalFinishes?.length
            ? `<div class="swatch-group"><h3>${t.product.metalFinishes}</h3>${swatchRowLocalised(product.metalFinishes, locale)}</div>`
            : ""
        }

        <table class="spec-table">
          <tbody>
            <tr><th>${t.product.dimensionsValue}</th><td>${product.dimensions.length_cm} × ${product.dimensions.width_cm} × ${product.dimensions.height_cm} cm</td></tr>
            <tr><th>${t.product.weightCapacity}</th><td>${product.weightCapacityKg} kg</td></tr>
            <tr><th>${t.product.material}</th><td>${product.material[locale]}</td></tr>
            <tr><th>${t.product.leadTime}</th><td>${product.leadTimeWeeks} ${locale === "pt" ? "semanas" : "weeks"}</td></tr>
            <tr><th>${t.product.warranty}</th><td>${product.warrantyYears} ${locale === "pt" ? "anos" : "years"}</td></tr>
          </tbody>
        </table>

        <div style="margin-top:var(--space-lg);">
          <h3 style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:var(--ls-wide);color:var(--c-text-muted);margin-bottom:0.75rem;">${t.product.downloads}</h3>
          <div class="product-downloads">
            <a class="product-download" href="#">${icon("download")}${t.product.downloadSpec}</a>
            <a class="product-download" href="#">${icon("download")}${t.product.download3d}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="quote-banner" data-reveal>
      <p class="text-lead">${t.customisation.headingLines[0]}</p>
      <a class="btn btn--secondary" href="${contact}">${t.customisation.cta}</a>
    </div>
  </div>
</section>

<section class="section section--muted">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${t.product.relatedHeading}</p>
      <h2 class="text-h2">${t.categories.heading}</h2>
    </div>
    <div class="related-grid">${related}</div>
  </div>
</section>`;
}
