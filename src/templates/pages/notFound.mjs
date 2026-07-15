import { path } from "../routes.mjs";

export function notFoundPage({ locale, t }) {
  return `
<section class="not-found">
  <div class="container">
    <div class="digits">404</div>
    <h1 class="text-h2">${t.common.notFoundTitle}</h1>
    <p class="text-lead" style="margin-top:var(--space-sm);">${t.common.notFoundText}</p>
    <div style="margin-top:var(--space-lg);">
      <a class="btn btn--primary" href="${path(locale, "home")}">${t.common.backHome}</a>
    </div>
  </div>
</section>`;
}
