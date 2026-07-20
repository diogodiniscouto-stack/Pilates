import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };
import productsData from "../../data/products.json" with { type: "json" };

const seriesCount = {};
for (const p of productsData.products) seriesCount[p.categoryKey] = p.series.length;
const itemCount = {};
for (const a of productsData.accessoryCategories) itemCount[a.key] = a.items.length;

function categoryHref(locale, cat) {
  // Both equipment and accessory categories resolve to /<catalogue>/<slug>/
  return path(locale, "category", cat.kind === "equipment" ? cat.productSlug : cat.slug);
}

function count(cat) {
  return cat.kind === "equipment" ? seriesCount[cat.key] || 0 : itemCount[cat.key] || 0;
}

/**
 * The full collection page. Every category — the six named accessory lines
 * first, then the equipment, then the remaining accessory lines — is shown
 * as an equally weighted card in one responsive grid. No horizontal scroll;
 * everything is visible and directly reachable.
 */
export function cataloguePage({ locale, t }) {
  const modelsWord = (n) =>
    locale === "pt" ? (n === 1 ? "modelo" : "modelos") : n === 1 ? "model" : "models";

  const cards = categoriesData
    .map(
      (cat, i) => `
      <a class="collection-card" href="${categoryHref(locale, cat)}" data-reveal style="--reveal-delay:${(i % 4) * 60}ms">
        <div class="media-frame">
          ${photo(cat.key === "kit" ? "base-077b" : cat.image, `${cat.name[locale]} — Base Movement`)}
        </div>
        <div class="collection-card__title">
          <h3>${cat.name[locale]}</h3>
          ${icon("arrowUpRight")}
        </div>
        <p>${cat.shortDescription[locale]}</p>
        <span class="collection-card__meta">${count(cat)} ${modelsWord(count(cat))}</span>
      </a>`
    )
    .join("");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${path(locale, "home")}">${t.nav.home}</a><span>/</span><span>${t.nav.catalogue}</span></div>
    <p class="eyebrow">${t.catalogue.eyebrow}</p>
    <h1 class="text-h1">${t.catalogue.heading}</h1>
    <p class="text-lead">${t.catalogue.intro}</p>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="collection-grid">
      ${cards}
    </div>
  </div>
</section>`;
}
