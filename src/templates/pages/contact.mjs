import { icon } from "../icons.mjs";
import { path } from "../routes.mjs";
import { INSTAGRAM_URL, LINKEDIN_URL } from "../config.mjs";

export function contactPage({ locale, t }) {
  const f = t.contact.fields;
  const options = f.studioTypeOptions.map((o) => `<option>${o}</option>`).join("");

  return `
<div class="page-header">
  <div class="container">
    <div class="page-header__breadcrumb"><a href="${path(locale, "home")}">${t.nav.home}</a><span>/</span><span>${t.nav.contact}</span></div>
    <p class="eyebrow">${t.contact.eyebrow}</p>
    <h1 class="text-h1">${t.contact.heading}</h1>
    <p class="text-lead">${t.contact.intro}</p>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="contact-layout">
      <div data-reveal>
        <h2 class="text-h3" style="margin-bottom:var(--space-lg);">${t.contact.formHeading}</h2>
        <form data-form novalidate>
          <div class="form-fields">
            <div class="form-row form-row--2">
              <div class="form-field">
                <label for="name">${f.name} <span class="req">*</span></label>
                <input id="name" name="name" type="text" required />
                <p class="contact-form-error">${locale === "pt" ? "Por favor, indique o seu nome." : "Please enter your name."}</p>
              </div>
              <div class="form-field">
                <label for="email">${f.email} <span class="req">*</span></label>
                <input id="email" name="email" type="email" required />
                <p class="contact-form-error">${locale === "pt" ? "Indique um email válido." : "Please enter a valid email."}</p>
              </div>
            </div>
            <div class="form-row form-row--2">
              <div class="form-field">
                <label for="phone">${f.phone}</label>
                <input id="phone" name="phone" type="tel" />
              </div>
              <div class="form-field">
                <label for="studioType">${f.studioType}</label>
                <select id="studioType" name="studioType">${options}</select>
              </div>
            </div>
            <div class="form-field">
              <label for="message">${f.message} <span class="req">*</span></label>
              <textarea id="message" name="message" required placeholder="${f.messagePlaceholder}"></textarea>
              <p class="contact-form-error">${locale === "pt" ? "Por favor, escreva a sua mensagem." : "Please write your message."}</p>
            </div>
            <p class="form-note">${f.requiredNote}</p>
            <button class="btn btn--primary btn--full" type="submit" style="margin-top:var(--space-md);">${f.submit}</button>
          </div>
          <div class="form-success">
            ${icon("check")}
            <h3>${f.successTitle}</h3>
            <p>${f.successMessage}</p>
          </div>
        </form>
      </div>

      <div data-reveal style="--reveal-delay:120ms">
        <h2 class="text-h3" style="margin-bottom:var(--space-sm);">${t.contact.infoHeading}</h2>
        <div class="contact-info-list">
          <div class="contact-info-item">
            <h3>${t.contact.addressLabel}</h3>
            <p>${t.footer.address}</p>
          </div>
          <div class="contact-info-item">
            <h3>${t.contact.phoneLabel}</h3>
            <a href="tel:${t.footer.phone.replace(/\s/g, "")}">${t.footer.phone}</a>
          </div>
          <div class="contact-info-item">
            <h3>${t.contact.emailLabel}</h3>
            <a href="mailto:${t.footer.email}">${t.footer.email}</a>
          </div>
          <div class="contact-info-item">
            <h3>${t.contact.hoursLabel}</h3>
            <p>${t.contact.hoursText}</p>
          </div>
          <div class="contact-info-item">
            <h3>${t.contact.socialHeading}</h3>
            <div class="footer-social" style="margin-top:0.5rem;">
              <a href="${INSTAGRAM_URL}" aria-label="Instagram" target="_blank" rel="noopener" style="border-color:var(--c-border-strong);color:var(--c-ink);">${icon("instagram")}</a>
              <a href="${LINKEDIN_URL}" aria-label="LinkedIn" target="_blank" rel="noopener" style="border-color:var(--c-border-strong);color:var(--c-ink);">${icon("linkedin")}</a>
            </div>
          </div>
        </div>

        <div class="map-frame">
          <div class="art-placeholder art-placeholder--sand art-placeholder--fill">
            <span class="art-placeholder__caption">${t.contact.mapCaption}</span>
          </div>
          <span class="map-frame__pin">${icon("mapPin")}</span>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
