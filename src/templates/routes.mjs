export const locales = ["pt", "en"];
export const defaultLocale = "pt";

const catalogueSlug = { pt: "catalogo", en: "catalogue" };
const accessoriesSlug = { pt: "acessorios", en: "accessories" };
const aboutSlug = { pt: "sobre-nos", en: "about" };
const contactSlug = { pt: "contacto", en: "contact" };

function prefix(locale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Canonical path builder — keeps PT (default, unprefixed) and EN (/en/…)
 * URL trees in lockstep so the language switcher can always resolve the
 * equivalent page.
 */
export function path(locale, pageId, param) {
  const p = prefix(locale);
  switch (pageId) {
    case "home":
      return `${p}/`;
    case "catalogue":
      return `${p}/${catalogueSlug[locale]}/`;
    case "product":
      return `${p}/${catalogueSlug[locale]}/${param}/`;
    case "accessories":
      return `${p}/${catalogueSlug[locale]}/${accessoriesSlug[locale]}/`;
    case "about":
      return `${p}/${aboutSlug[locale]}/`;
    case "contact":
      return `${p}/${contactSlug[locale]}/`;
    default:
      return `${p}/`;
  }
}

export function otherLocale(locale) {
  return locale === "pt" ? "en" : "pt";
}

export function siteUrl(pathname, base) {
  return new URL(pathname, base).toString();
}
