import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";

/**
 * An accessory category page — e.g. Mat, Weights, Pilates Ring. Renders the
 * whole line as a responsive grid (no horizontal scroll), matching the
 * equipment pages in weight and treatment.
 */
export function accessoryCategoryPage({ locale, t, category }) {
  const catalogue = path(locale, "catalogue");
  const contact = path(locale, "contact");
  const n = category.items.length;
  const objectsWord = locale === "pt" ? (n === 1 ? "produto" : "produtos") : n === 1 ? "product" : "products";

  const cards = category.items
    .map(
      (item, i) => `
      <div class="accessory-card" data-reveal style="--reveal-delay:${(i % 4) * 55}ms">
        <div class="media-frame">
          ${photo(item.image, `${item.name[locale]} — ${category.name[locale]}`)}
        </div>
        ${item.sku ? `<p class="series-card__ref">${t.product.refLabel} ${item.sku}</p>` : ""}
        <h3>${item.name[locale]}</h3>
        <p>${item.spec}</p>
        <a class="icon-link accessory-card__cta" href="${contact}?produto=${encodeURIComponent((item.sku ? item.sku + " · " : "") + item.name[locale])}">${t.product.requestQuote} ${icon("arrowRight")}</a>
      </div>`
    )
    .join("");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${catalogue}">${t.nav.catalogue}</a><span>/</span><span>${category.name[locale]}</span></div>
    <p class="eyebrow">${t.nav.catalogue}</p>
    <h1 class="text-h1">${category.name[locale]}</h1>
    <p class="chapter__tagline" style="margin-top:var(--space-sm)">${category.tagline[locale]}</p>
    <p class="text-lead" style="max-width:38rem;margin-top:var(--space-sm)">${category.intro[locale]}</p>
  </div>
</div>

<section class="section">
  <div class="container">
    <p class="grid-hint" data-reveal>${n} ${objectsWord}</p>
    <div class="item-grid">
      ${cards}
    </div>

    <div class="quote-banner" data-reveal style="margin-top:var(--space-2xl)">
      <p class="text-lead">${t.customisation.headingLines[0]}</p>
      <a class="btn btn--secondary" href="${contact}">${t.product.requestQuote}</a>
    </div>
  </div>
</section>`;
}
