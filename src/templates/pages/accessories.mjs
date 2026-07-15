import { art } from "../art.mjs";
import { path } from "../routes.mjs";

function fmtEUR(n) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

const accessoryTones = ["ivory", "sand", "charcoal", "ivory", "sand", "ink"];

export function accessoriesPage({ locale, t, accessories, category }) {
  const catalogue = path(locale, "catalogue");
  const contact = path(locale, "contact");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${catalogue}">${t.nav.catalogue}</a><span>/</span><span>${category.name[locale]}</span></div>
    <p class="eyebrow">${t.nav.accessories}</p>
    <h1 class="text-h1">${category.name[locale]}</h1>
    <p class="text-lead">${category.shortDescription[locale]}</p>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="accessory-grid">
      ${accessories
        .map(
          (item, i) => `
      <div class="accessory-card" data-reveal style="--reveal-delay:${(i % 3) * 70}ms">
        <div class="media-frame">
          ${art({ tone: accessoryTones[i % accessoryTones.length], ratio: "square", glyphName: "accessories", noCaption: true })}
        </div>
        <h3>${item.name[locale]}</h3>
        <p>${item.description[locale]}</p>
        <p class="price">${fmtEUR(item.price)}</p>
      </div>`
        )
        .join("")}
    </div>

    <div class="quote-banner" data-reveal>
      <p class="text-lead">${t.customisation.headingLines[0]}</p>
      <a class="btn btn--secondary" href="${contact}">${t.product.requestQuote}</a>
    </div>
  </div>
</section>`;
}
