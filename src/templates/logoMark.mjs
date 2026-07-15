// "BASE" logotype, vector-retraced from the supplied brand image (thin
// geometric line wordmark): stemless B built from three horizontal bars
// joined by two right-side curves, sharp-apex A without crossbar,
// geometric S, and an E with a rounded left spine open to the right.
// Rendered in currentColor so it inherits the neutral palette (ink/ivory)
// per brand direction. Swap for the original vector file if one is added
// to the repo.
export const logoMarkViewBox = "0 0 420 120";

export const logoMarkPaths = `
  <path d="M8,10 H62 C86,10 95,21 95,34 C95,47 86,60 62,60 H8" />
  <path d="M62,60 C87,60 99,72 99,85 C99,98 87,110 62,110 H8" />
  <path d="M124,110 L172,10 L220,110" />
  <path d="M318,24 C312,13 297,8 283,10 C262,13 250,24 252,38 C254,52 268,58 285,62 C305,67 317,74 317,88 C317,102 301,111 283,110 C267,109 253,103 247,93" />
  <path d="M415,10 H377 C353,10 342,28 342,60 C342,92 353,110 377,110 H415" />
  <path d="M346,60 H397" />
`;

export function logoMark(extraAttrs = "") {
  return `<svg class="brand-logo__mark-svg" viewBox="${logoMarkViewBox}" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" ${extraAttrs} aria-hidden="true">${logoMarkPaths}</svg>`;
}
