import { path } from "../routes.mjs";

export function aboutPage({ locale, t }) {
  const contact = path(locale, "contact");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${path(locale, "home")}">${t.nav.home}</a><span>/</span><span>${t.nav.about}</span></div>
    <p class="eyebrow">${t.about.eyebrow}</p>
    <h1 class="text-h1">${t.about.heading}</h1>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="about-intro" data-reveal>
      <p class="about-intro__statement">${t.about.intro}</p>
      <div class="about-intro__body">
        ${t.about.leadParagraphs.map((p) => `<p>${p}</p>`).join("")}
      </div>
    </div>
  </div>
</section>

<section class="section section--muted">
  <div class="container">
    <figure class="about-ethos" data-reveal="scale">
      <p class="about-ethos__quote">${t.about.ethos}</p>
      <figcaption class="about-ethos__by">Base Movement</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="container container--narrow">
    <div class="pillar-list">
      ${t.about.pillars
        .map(
          (pillar, i) => `
      <div class="pillar" data-reveal style="--reveal-delay:${i * 60}ms">
        <div class="pillar__num">${String(i + 1).padStart(2, "0")}</div>
        <div>
          <h3>${pillar.title}</h3>
          <p>${pillar.text}</p>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section--dark final-cta">
  <div class="container about-closing" data-reveal>
    <h2 class="text-h2">${t.about.closingHeading}</h2>
    <p class="text-lead">${t.about.closingText}</p>
    <div style="margin-top:var(--space-lg);">
      <a class="btn btn--gold" href="${contact}">${t.finalCta.cta}</a>
    </div>
  </div>
</section>`;
}
