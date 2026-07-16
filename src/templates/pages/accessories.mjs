import { icon } from "../icons.mjs";
import { photo } from "../media.mjs";
import { path } from "../routes.mjs";

export function accessoriesPage({ locale, t, accessoryGroups, category }) {
  const catalogue = path(locale, "catalogue");
  const contact = path(locale, "contact");

  const groupNav = accessoryGroups
    .map((g) => `<a href="#${g.key}">${g.title[locale]}</a>`)
    .join("");

  const sections = accessoryGroups
    .map(
      (group, gi) => `
<section class="section ${gi % 2 === 1 ? "section--muted" : ""}" id="${group.key}">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow">${t.nav.accessories}</p>
      <h2 class="text-h2">${group.title[locale]}</h2>
      <p class="text-lead">${group.intro[locale]}</p>
    </div>
    <div class="filmstrip-zone" data-reveal>
      <p class="filmstrip-hint">${group.items.length} ${locale === "pt" ? "objetos" : "objects"}</p>
      <div class="filmstrip" data-filmstrip>
        ${group.items
          .map(
            (item) => `
        <div class="accessory-card">
          <div class="media-frame">
            ${photo(item.image, `${item.name[locale]} — Base Movement`)}
          </div>
          ${item.sku ? `<p class="series-card__ref">${t.product.refLabel} ${item.sku}</p>` : ""}
          <h3>${item.name[locale]}</h3>
          <p>${item.spec}</p>
          <a class="icon-link accessory-card__cta" href="${contact}?produto=${encodeURIComponent((item.sku ? item.sku + " — " : "") + item.name[locale])}">${t.product.requestQuote} ${icon("arrowRight")}</a>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </div>
</section>`
    )
    .join("");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${catalogue}">${t.nav.catalogue}</a><span>/</span><span>${category.name[locale]}</span></div>
    <p class="eyebrow">${t.nav.accessories}</p>
    <h1 class="text-h1">${category.name[locale]}</h1>
    <p class="text-lead">${category.shortDescription[locale]}</p>
    <nav class="group-nav" aria-label="${t.nav.accessories}">${groupNav}</nav>
  </div>
</div>

${sections}

<section class="section">
  <div class="container">
    <div class="quote-banner" data-reveal>
      <p class="text-lead">${t.customisation.headingLines[0]}</p>
      <a class="btn btn--secondary" href="${contact}">${t.product.requestQuote}</a>
    </div>
  </div>
</section>`;
}
