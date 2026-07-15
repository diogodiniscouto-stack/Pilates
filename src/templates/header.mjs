import { icon } from "./icons.mjs";
import { path, otherLocale } from "./routes.mjs";
import categoriesData from "../data/categories.json" with { type: "json" };

function categoryHref(locale, cat) {
  return cat.productSlug ? path(locale, "product", cat.productSlug) : path(locale, "accessories");
}

export function header({ locale, t, pageId, transparent, param }) {
  const home = path(locale, "home");
  const catalogue = path(locale, "catalogue");
  const about = path(locale, "about");
  const contact = path(locale, "contact");
  const other = otherLocale(locale);

  const current = (id) => (pageId === id ? ' aria-current="page"' : "");

  const dropdown = categoriesData
    .map((cat) => `<a href="${categoryHref(locale, cat)}">${cat.name[locale]}</a>`)
    .join("");

  const altHref = (loc) => path(loc, pageId || "home", param);
  const langOption = (loc) => {
    return `<a class="lang-switch__option" href="${altHref(loc)}" ${locale === loc ? 'aria-current="true"' : ""} hreflang="${loc}">${loc.toUpperCase()} — ${loc === "pt" ? "Português" : "English"}</a>`;
  };

  return `
<a class="skip-link" href="#main">${t.common.skipToContent}</a>
<header class="site-header ${transparent ? "has-transparent" : ""}" data-site-header>
  <div class="container site-header__bar">
    <a class="brand-logo site-header__logo" href="${home}" aria-label="${t.meta.siteName} — ${t.meta.siteTagline}">
      <span class="brand-logo__mark"></span>
      <span class="brand-logo__text">
        <span class="brand-logo__name">BASE MOVEMENT</span>
        <span class="brand-logo__tagline">Pilates Supply</span>
      </span>
    </a>

    <nav class="site-nav" aria-label="Main">
      <div class="site-nav__item">
        <a class="site-nav__link" href="${catalogue}"${current("catalogue")}>${t.nav.catalogue}</a>
        <div class="site-nav__dropdown">${dropdown}</div>
      </div>
      <a class="site-nav__link" href="${home}#personalizacao">${t.nav.customisation}</a>
      <a class="site-nav__link" href="${about}"${current("about")}>${t.nav.about}</a>
      <a class="site-nav__link" href="${contact}"${current("contact")}>${t.nav.contact}</a>
    </nav>

    <div class="site-header__actions">
      <div class="lang-switch" data-lang-switch>
        <button class="lang-switch__toggle" data-lang-toggle aria-haspopup="true" aria-expanded="false">
          ${locale.toUpperCase()} ${icon("chevronDown")}
        </button>
        <div class="lang-switch__menu">
          ${langOption("pt")}
          ${langOption("en")}
        </div>
      </div>
      <a class="btn btn--secondary site-header__cta" href="${contact}" style="min-height:2.6rem;padding:0.7em 1.4em;">${t.nav.requestQuote}</a>
      <button class="menu-toggle" data-menu-toggle aria-label="${t.nav.menu}" aria-expanded="false">
        <span class="menu-toggle__bars"><span></span><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu">
  <nav class="mobile-menu__nav" aria-label="Mobile">
    <a class="mobile-menu__link" href="${home}">${t.nav.home}</a>
    <a class="mobile-menu__link" href="${catalogue}">${t.nav.catalogue}</a>
    <div class="mobile-menu__sub">
      ${categoriesData.map((cat) => `<a href="${categoryHref(locale, cat)}">${cat.name[locale]}</a>`).join("")}
    </div>
    <a class="mobile-menu__link" href="${home}#personalizacao">${t.nav.customisation}</a>
    <a class="mobile-menu__link" href="${about}">${t.nav.about}</a>
    <a class="mobile-menu__link" href="${contact}">${t.nav.contact}</a>
  </nav>
  <div class="mobile-menu__footer">
    <a class="btn btn--primary btn--full" href="${contact}">${t.nav.requestQuote}</a>
    <div class="mobile-menu__langs">
      <a href="${altHref("pt")}" ${locale === "pt" ? 'aria-current="true"' : ""}>PT</a>
      <a href="${altHref("en")}" ${locale === "en" ? 'aria-current="true"' : ""}>EN</a>
    </div>
  </div>
</div>`;
}
