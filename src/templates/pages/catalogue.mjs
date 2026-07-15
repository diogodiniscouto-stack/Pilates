import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";
import categoriesData from "../../data/categories.json" with { type: "json" };

function categoryHref(locale, cat) {
  return cat.productSlug ? path(locale, "product", cat.productSlug) : path(locale, "accessories");
}

export function cataloguePage({ locale, t }) {
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
    <div class="category-grid">
      ${categoriesData
        .map(
          (cat, i) => `
      <a class="category-card" href="${categoryHref(locale, cat)}" data-reveal style="--reveal-delay:${i * 70}ms">
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
  </div>
</section>`;
}
