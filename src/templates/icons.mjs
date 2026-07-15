// Minimal line-icon set (24x24, stroke-based, Lucide-style weight) —
// hand-authored since no icon package can be installed in this environment.

const wrap = (inner, viewBox = "0 0 24 24") =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const icons = {
  chevronDown: wrap(`<path d="M6 9l6 6 6-6"/>`),
  close: wrap(`<path d="M6 6l12 12M18 6L6 18"/>`),
  arrowUpRight: wrap(`<path d="M7 17L17 7M9 7h8v8"/>`),
  arrowRight: wrap(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  check: wrap(`<path d="M5 13l4 4L19 7"/>`),
  chevronLeft: wrap(`<path d="M15 6l-6 6 6 6"/>`),
  chevronRight: wrap(`<path d="M9 6l6 6-6 6"/>`),
  send: wrap(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  instagram: wrap(
    `<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/>`
  ),
  linkedin: wrap(
    `<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5v6M8 7.8v.01M12 16.5v-3.6c0-1.2 1-2.1 2.1-2.1 1.2 0 2 .9 2 2.1v3.6"/>`
  ),
  download: wrap(`<path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14"/>`),
  mapPin: wrap(`<path d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.2"/>`, "0 0 24 24"),
  gem: wrap(`<path d="M4 9l3-5h10l3 5-8 12z"/><path d="M4 9h16M9 4l3 5 3-5M8 9l4 12 4-12"/>`),
  sliders: wrap(`<path d="M5 6h14M5 12h14M5 18h14"/><circle cx="9" cy="6" r="1.6" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="10" cy="18" r="1.6" fill="currentColor" stroke="none"/>`),
  shieldCheck: wrap(`<path d="M12 3l7 3v6c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>`),
  truck: wrap(`<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>`),
  plus: wrap(`<path d="M12 5v14M5 12h14"/>`),
  quote: wrap(`<path d="M7 8c-2 0-3 1.6-3 3.6C4 14 5.6 16 8 16v3c-3.6 0-6.5-2.8-6.5-7C1.5 8.4 4 6 7 6zM17 8c-2 0-3 1.6-3 3.6 0 2.4 1.6 4.4 4 4.4v3c-3.6 0-6.5-2.8-6.5-7C11.5 8.4 14 6 17 6z" fill="currentColor" stroke="none"/>`),
};

export function icon(name, extraClass = "") {
  const svg = icons[name] || "";
  if (!extraClass) return svg;
  return svg.replace("<svg ", `<svg class="${extraClass}" `);
}
