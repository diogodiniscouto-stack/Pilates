import { mkdir, writeFile, readFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import nodePath from "node:path";

import { layout } from "../src/templates/layout.mjs";
import { homePage } from "../src/templates/pages/home.mjs";
import { cataloguePage } from "../src/templates/pages/catalogue.mjs";
import { productPage } from "../src/templates/pages/product.mjs";
import { accessoriesPage } from "../src/templates/pages/accessories.mjs";
import { aboutPage } from "../src/templates/pages/about.mjs";
import { contactPage } from "../src/templates/pages/contact.mjs";
import { notFoundPage } from "../src/templates/pages/notFound.mjs";
import { path as routePath, locales } from "../src/templates/routes.mjs";
import { SITE_URL, SITE_NAME } from "../src/templates/config.mjs";

import categoriesData from "../src/data/categories.json" with { type: "json" };
import productsDataFile from "../src/data/products.json" with { type: "json" };
import ptDict from "../src/data/i18n/pt.json" with { type: "json" };
import enDict from "../src/data/i18n/en.json" with { type: "json" };

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));
const ROOT = nodePath.resolve(__dirname, "..");
const SRC = nodePath.join(ROOT, "src");
const PUBLIC = nodePath.join(ROOT, "public");

const dict = { pt: ptDict, en: enDict };
const products = productsDataFile.products;
const accessories = productsDataFile.accessories;

async function writePage(pathname, html) {
  const filePath = pathname.endsWith("/") ? nodePath.join(PUBLIC, pathname, "index.html") : nodePath.join(PUBLIC, pathname);
  await mkdir(nodePath.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
}

function orgStructuredData(locale) {
  const t = dict[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t.meta.siteName,
    alternateName: t.meta.siteTagline,
    url: `${SITE_URL}${routePath(locale, "home")}`,
    logo: `${SITE_URL}/assets/img/og-cover.svg`,
    description: t.meta.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida da Liberdade 110",
      addressLocality: "Lisboa",
      postalCode: "1250-146",
      addressCountry: "PT",
    },
    sameAs: ["https://www.instagram.com/basemovement.pt", "https://www.linkedin.com/company/basemovement"],
  };
}

function productStructuredData(locale, product, categoryHref) {
  const t = dict[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description[locale],
    brand: { "@type": "Brand", name: t.meta.siteName },
    url: `${SITE_URL}${categoryHref}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceFrom,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${categoryHref}`,
    },
  };
}

function breadcrumbStructuredData(locale, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

async function buildLocale(locale) {
  const t = dict[locale];

  // Home
  await writePage(
    routePath(locale, "home"),
    layout({
      locale,
      t,
      pageId: "home",
      title: t.meta.defaultTitle,
      description: t.meta.defaultDescription,
      transparentHeader: true,
      content: homePage({ locale, t }),
      structuredData: [orgStructuredData(locale)],
    })
  );

  // Catalogue overview
  await writePage(
    routePath(locale, "catalogue"),
    layout({
      locale,
      t,
      pageId: "catalogue",
      title: `${t.catalogue.heading} | ${t.meta.siteName}`,
      description: t.catalogue.intro,
      content: cataloguePage({ locale, t }),
      structuredData: [
        breadcrumbStructuredData(locale, [
          { name: t.nav.home, path: routePath(locale, "home") },
          { name: t.nav.catalogue, path: routePath(locale, "catalogue") },
        ]),
      ],
    })
  );

  // Product / category flagship pages
  for (const product of products) {
    const category = categoriesData.find((c) => c.key === product.categoryKey);
    const pagePath = routePath(locale, "product", product.slug);
    await writePage(
      pagePath,
      layout({
        locale,
        t,
        pageId: "product",
        param: product.slug,
        title: `${product.name} | ${t.meta.siteName}`,
        description: product.description[locale],
        content: productPage({ locale, t, product, category }),
        structuredData: [
          productStructuredData(locale, product, pagePath),
          breadcrumbStructuredData(locale, [
            { name: t.nav.home, path: routePath(locale, "home") },
            { name: t.nav.catalogue, path: routePath(locale, "catalogue") },
            { name: category.name[locale], path: pagePath },
          ]),
        ],
      })
    );
  }

  // Accessories collection
  const accessoryCategory = categoriesData.find((c) => c.key === "accessories");
  await writePage(
    routePath(locale, "accessories"),
    layout({
      locale,
      t,
      pageId: "accessories",
      title: `${accessoryCategory.name[locale]} | ${t.meta.siteName}`,
      description: accessoryCategory.shortDescription[locale],
      content: accessoriesPage({ locale, t, accessories, category: accessoryCategory }),
      structuredData: [
        breadcrumbStructuredData(locale, [
          { name: t.nav.home, path: routePath(locale, "home") },
          { name: t.nav.catalogue, path: routePath(locale, "catalogue") },
          { name: accessoryCategory.name[locale], path: routePath(locale, "accessories") },
        ]),
      ],
    })
  );

  // About
  await writePage(
    routePath(locale, "about"),
    layout({
      locale,
      t,
      pageId: "about",
      title: `${t.about.heading} | ${t.meta.siteName}`,
      description: t.about.intro,
      content: aboutPage({ locale, t }),
    })
  );

  // Contact
  await writePage(
    routePath(locale, "contact"),
    layout({
      locale,
      t,
      pageId: "contact",
      title: `${t.contact.heading} | ${t.meta.siteName}`,
      description: t.contact.intro,
      content: contactPage({ locale, t }),
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: t.contact.heading,
          url: `${SITE_URL}${routePath(locale, "contact")}`,
        },
      ],
    })
  );

  // 404
  const notFoundHtml = layout({
    locale,
    t,
    pageId: "home",
    title: `${t.common.notFoundTitle} | ${t.meta.siteName}`,
    description: t.common.notFoundText,
    content: notFoundPage({ locale, t }),
  });
  if (locale === "pt") {
    await writeFile(nodePath.join(PUBLIC, "404.html"), notFoundHtml, "utf8");
  } else {
    await writePage(`/${locale}/404.html`, notFoundHtml);
  }
}

async function buildCss() {
  const order = [
    "tokens.css",
    "base.css",
    "logo.css",
    "buttons.css",
    "header.css",
    "footer.css",
    "hero.css",
    "art-placeholder.css",
    "sections.css",
    "forms.css",
    "product.css",
    "misc.css",
    "animations.css",
  ];
  const cssDir = nodePath.join(SRC, "assets", "css");
  const chunks = await Promise.all(order.map((file) => readFile(nodePath.join(cssDir, file), "utf8")));
  const banner = `/* Base Movement — compiled stylesheet. Source partials live in /src/assets/css/. Do not edit this file directly; edit the partials and run \`npm run build\`. */\n\n`;
  await mkdir(nodePath.join(PUBLIC, "assets", "css"), { recursive: true });
  await writeFile(nodePath.join(PUBLIC, "assets", "css", "main.css"), banner + chunks.join("\n\n"), "utf8");
}

async function buildJs() {
  await mkdir(nodePath.join(PUBLIC, "assets", "js"), { recursive: true });
  await cp(nodePath.join(SRC, "assets", "js", "main.js"), nodePath.join(PUBLIC, "assets", "js", "main.js"));
}

async function buildStaticAssets() {
  await mkdir(nodePath.join(PUBLIC, "assets", "img"), { recursive: true });

  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111111"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#F8F8F6" stroke-width="1.6"/>
  <line x1="24" y1="32" x2="40" y2="32" stroke="#F8F8F6" stroke-width="1.6"/>
  <line x1="32" y1="24" x2="32" y2="40" stroke="#C9A96A" stroke-width="1.6"/>
</svg>`;
  await writeFile(nodePath.join(PUBLIC, "favicon.svg"), favicon, "utf8");

  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B1B1A"/>
      <stop offset="60%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="600" cy="255" r="46" fill="none" stroke="#F8F8F6" stroke-width="1.4"/>
  <line x1="582" y1="255" x2="618" y2="255" stroke="#F8F8F6" stroke-width="1.4"/>
  <line x1="600" y1="237" x2="600" y2="273" stroke="#C9A96A" stroke-width="1.4"/>
  <text x="600" y="360" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#F8F8F6" letter-spacing="2">BASE MOVEMENT</text>
  <text x="600" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="6" fill="#C9A96A">PILATES SUPPLY</text>
</svg>`;
  await writeFile(nodePath.join(PUBLIC, "assets", "img", "og-cover.svg"), og, "utf8");
}

async function buildSitemap() {
  const pageIds = [
    { id: "home" },
    { id: "catalogue" },
    { id: "accessories" },
    { id: "about" },
    { id: "contact" },
    ...products.map((p) => ({ id: "product", param: p.slug })),
  ];

  const urls = [];
  for (const page of pageIds) {
    const alternates = locales.map((loc) => `      <xhtml:link rel="alternate" hreflang="${loc}" href="${SITE_URL}${routePath(loc, page.id, page.param)}" />`).join("\n");
    for (const locale of locales) {
      urls.push(`  <url>
    <loc>${SITE_URL}${routePath(locale, page.id, page.param)}</loc>
${alternates}
    <changefreq>weekly</changefreq>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  await writeFile(nodePath.join(PUBLIC, "sitemap.xml"), xml, "utf8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(nodePath.join(PUBLIC, "robots.txt"), robots, "utf8");
}

async function main() {
  if (existsSync(PUBLIC)) {
    await rm(PUBLIC, { recursive: true, force: true });
  }
  await mkdir(PUBLIC, { recursive: true });

  await Promise.all(locales.map(buildLocale));
  await buildCss();
  await buildJs();
  await buildStaticAssets();
  await buildSitemap();

  console.log(`Built ${SITE_NAME} — ${locales.length} locales into /public`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
