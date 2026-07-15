import { icon } from "./icons.mjs";
import { path } from "./routes.mjs";
import { INSTAGRAM_URL, LINKEDIN_URL } from "./config.mjs";
import categoriesData from "../data/categories.json" with { type: "json" };

function categoryHref(locale, cat) {
  return cat.productSlug ? path(locale, "product", cat.productSlug) : path(locale, "accessories");
}

export function footer({ locale, t, pageId, param }) {
  const home = path(locale, "home");
  const catalogue = path(locale, "catalogue");
  const about = path(locale, "about");
  const contact = path(locale, "contact");
  const altHref = (loc) => path(loc, pageId || "home", param);
  const year = new Date().getFullYear();

  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand-logo" href="${home}" aria-label="${t.meta.siteName}">
          <span class="brand-logo__mark"></span>
          <span class="brand-logo__text">
            <span class="brand-logo__name">BASE MOVEMENT</span>
            <span class="brand-logo__tagline">Pilates Supply</span>
          </span>
        </a>
        <p>${t.footer.tagline}</p>
        <div class="footer-social">
          <a href="${INSTAGRAM_URL}" aria-label="Instagram" target="_blank" rel="noopener">${icon("instagram")}</a>
          <a href="${LINKEDIN_URL}" aria-label="LinkedIn" target="_blank" rel="noopener">${icon("linkedin")}</a>
        </div>
      </div>

      <div class="footer-col">
        <h3>${t.footer.navHeading}</h3>
        <ul>
          <li><a href="${home}">${t.nav.home}</a></li>
          <li><a href="${catalogue}">${t.nav.catalogue}</a></li>
          <li><a href="${home}#personalizacao">${t.nav.customisation}</a></li>
          <li><a href="${about}">${t.nav.about}</a></li>
          <li><a href="${contact}">${t.nav.contact}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>${t.footer.shopHeading}</h3>
        <ul>
          ${categoriesData.map((cat) => `<li><a href="${categoryHref(locale, cat)}">${cat.name[locale]}</a></li>`).join("")}
        </ul>
      </div>

      <div class="footer-col footer-newsletter">
        <h3>${t.footer.newsletterHeading}</h3>
        <p style="color:rgba(248,248,246,0.65);font-size:var(--fs-small);">${t.footer.newsletterText}</p>
        <form data-form aria-label="${t.footer.newsletterHeading}">
          <input type="email" required placeholder="${t.footer.newsletterPlaceholder}" aria-label="${t.footer.newsletterPlaceholder}" />
          <button type="submit" aria-label="${t.footer.newsletterCta}">${icon("send")}</button>
        </form>
        <p class="form-success">${t.footer.newsletterSuccess}</p>
        <p class="disclaimer">${t.footer.newsletterDisclaimer}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; ${year} ${t.meta.siteName}. ${t.footer.rights}</span>
      <div class="footer-lang-inline">
        <a href="${altHref("pt")}" ${locale === "pt" ? 'aria-current="true"' : ""}>PT</a>
        <a href="${altHref("en")}" ${locale === "en" ? 'aria-current="true"' : ""}>EN</a>
      </div>
    </div>
  </div>
</footer>`;
}
