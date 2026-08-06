import { header } from "./header.mjs";
import { footer } from "./footer.mjs";
import { logoMark } from "./logoMark.mjs";
import { path, locales } from "./routes.mjs";
import { SITE_URL, SITE_NAME } from "./config.mjs";
import { icon } from "./icons.mjs";

function alternateLinks(pageId, param) {
  return locales
    .map((loc) => `<link rel="alternate" hreflang="${loc}" href="${SITE_URL}${path(loc, pageId, param)}" />`)
    .join("\n  ");
}

export function layout({
  locale,
  t,
  pageId,
  param,
  title,
  description,
  transparentHeader = false,
  bodyClass = "",
  content,
  structuredData = [],
  ogImageCaption = "",
}) {
  const canonical = `${SITE_URL}${path(locale, pageId, param)}`;
  const xDefault = `${SITE_URL}${path("pt", pageId, param)}`;
  const ld = structuredData.length
    ? `<script type="application/ld+json">${JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData)}</script>`
    : "";

  return `<!doctype html>
<html lang="${locale === "pt" ? "pt-PT" : "en"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-N63R45WX');</script>
  <!-- End Google Tag Manager -->

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PSQXY7F7VP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PSQXY7F7VP');
  </script>

  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  ${alternateLinks(pageId, param)}
  <link rel="alternate" hreflang="x-default" href="${xDefault}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="${locale === "pt" ? "pt_PT" : "en_GB"}" />
  <meta property="og:image" content="${SITE_URL}/assets/img/og-cover.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />

  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#111111" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/assets/css/main.css" />
  <script>document.documentElement.className += " js";</script>
  ${ld}
</head>
<body class="${transparentHeader ? "has-transparent-header" : ""} ${bodyClass}">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N63R45WX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div class="preloader" aria-hidden="true">
    <div class="preloader__mark">${logoMark()}</div>
    <div class="preloader__bar"></div>
  </div>

  ${header({ locale, t, pageId, transparent: transparentHeader, param })}

  <main id="main">
    ${content}
  </main>

  ${footer({ locale, t, pageId, param })}

  <div class="lightbox" data-lightbox-root aria-hidden="true">
    <button class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Previous">${icon("chevronLeft")}</button>
    <div class="lightbox__frame" data-lightbox-frame></div>
    <button class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Next">${icon("chevronRight")}</button>
    <button class="lightbox__close" data-lightbox-close aria-label="${t.nav.close}">${icon("close")}</button>
  </div>

  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}
