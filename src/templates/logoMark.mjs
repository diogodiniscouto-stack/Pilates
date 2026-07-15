// Hand-traced approximation of the supplied "BASE" logotype (thin outline
// serif wordmark, open-apex A, two-bar E) — recreated as SVG since only
// visual (not file) access to the source asset was available in this
// environment. Rendered in currentColor so it inherits the neutral/gold
// palette rather than the source image's coral, per brand direction.
// Swap this markup for the real vector file when it's added to the repo.
export const logoMarkViewBox = "0 0 420 120";

export const logoMarkPaths = `
  <path d="M30,15 L30,105" />
  <path d="M30,15 C68,15 85,25 85,42 C85,58 68,60 30,60" />
  <path d="M30,60 C72,60 92,63 92,82 C92,100 72,105 30,105" />
  <path d="M165,15 L120,105" />
  <path d="M165,15 L210,105" />
  <path d="M295,35 C295,15 265,12 245,20 C222,29 222,50 248,58 C275,66 278,85 253,95 C232,103 210,100 205,82" />
  <path d="M330,15 L330,105" />
  <path d="M330,15 L394,15" />
  <path d="M330,60 L380,60" />
  <path d="M330,105 L394,105" />
`;

export function logoMark(extraAttrs = "") {
  return `<svg class="brand-logo__mark-svg" viewBox="${logoMarkViewBox}" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" ${extraAttrs} aria-hidden="true">${logoMarkPaths}</svg>`;
}
