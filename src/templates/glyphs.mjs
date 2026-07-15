// Abstract architectural line-art used inside placeholder imagery.
// Evocative, not literal — geometric compositions standing in for studio
// photography until real photography is supplied.

const g = (inner, viewBox = "0 0 200 200") =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" aria-hidden="true">${inner}</svg>`;

export const glyphs = {
  reformer: g(
    `<rect x="18" y="118" width="164" height="14" rx="3"/>
     <line x1="30" y1="132" x2="24" y2="150"/><line x1="170" y1="132" x2="176" y2="150"/>
     <rect x="82" y="94" width="58" height="20" rx="3"/>
     <line x1="18" y1="118" x2="34" y2="104"/><line x1="34" y1="104" x2="46" y2="118"/>
     <line x1="46" y1="118" x2="58" y2="104"/><line x1="58" y1="104" x2="70" y2="118"/>
     <line x1="24" y1="94" x2="24" y2="70"/><line x1="176" y1="94" x2="176" y2="70"/>
     <line x1="14" y1="70" x2="34" y2="70"/><line x1="166" y1="70" x2="186" y2="70"/>`
  ),
  cadillac: g(
    `<rect x="40" y="30" width="10" height="140" rx="2"/><rect x="150" y="30" width="10" height="140" rx="2"/>
     <line x1="50" y1="40" x2="150" y2="40"/>
     <line x1="50" y1="78" x2="150" y2="78"/>
     <line x1="70" y1="78" x2="70" y2="120"/><line x1="130" y1="78" x2="130" y2="120"/>
     <rect x="20" y="160" width="160" height="12" rx="2"/>`
  ),
  chair: g(
    `<rect x="60" y="130" width="80" height="16" rx="3"/>
     <line x1="70" y1="146" x2="70" y2="168"/><line x1="130" y1="146" x2="130" y2="168"/>
     <rect x="86" y="70" width="28" height="14" rx="2"/>
     <line x1="90" y1="84" x2="84" y2="130"/><line x1="110" y1="84" x2="116" y2="130"/>
     <line x1="84" y1="118" x2="116" y2="118"/>`
  ),
  barrel: g(
    `<path d="M40 150 C40 90 160 90 160 150"/>
     <path d="M40 150 C40 100 160 100 160 150"/>
     <rect x="30" y="150" width="140" height="16" rx="3"/>`
  ),
  spineCorrector: g(
    `<path d="M40 140 C40 90 90 80 90 140"/>
     <path d="M110 140 C110 80 160 90 160 140"/>
     <rect x="30" y="140" width="140" height="14" rx="3"/>`
  ),
  accessories: g(
    `<circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="40"/>
     <line x1="100" y1="48" x2="100" y2="60"/>`
  ),
  interiorA: g(
    `<rect x="16" y="16" width="168" height="168" rx="2"/>
     <line x1="16" y1="140" x2="184" y2="140"/>
     <line x1="70" y1="16" x2="70" y2="140"/>
     <line x1="130" y1="16" x2="130" y2="140"/>
     <circle cx="150" cy="45" r="8"/>
     <line x1="150" y1="53" x2="150" y2="16"/>`,
    "0 0 200 200"
  ),
  interiorB: g(
    `<line x1="10" y1="150" x2="190" y2="150"/>
     <line x1="40" y1="150" x2="40" y2="20"/>
     <line x1="160" y1="150" x2="160" y2="20"/>
     <line x1="10" y1="20" x2="190" y2="20"/>
     <rect x="70" y="90" width="60" height="60"/>
     <circle cx="100" cy="120" r="14"/>`
  ),
  interiorC: g(
    `<line x1="20" y1="30" x2="20" y2="170"/>
     <line x1="60" y1="30" x2="60" y2="170"/>
     <line x1="100" y1="30" x2="100" y2="170"/>
     <line x1="140" y1="30" x2="140" y2="170"/>
     <line x1="180" y1="30" x2="180" y2="170"/>
     <line x1="10" y1="170" x2="190" y2="170"/>`
  ),
  woodGrain: g(
    `<path d="M10 40 Q60 30 110 40 T190 40"/>
     <path d="M10 75 Q60 65 110 75 T190 75"/>
     <path d="M10 110 Q60 100 110 110 T190 110"/>
     <path d="M10 145 Q60 135 110 145 T190 145"/>
     <path d="M10 175 Q60 168 110 175 T190 175"/>`
  ),
  upholstery: g(
    `<line x1="0" y1="20" x2="200" y2="20"/><line x1="0" y1="60" x2="200" y2="60"/>
     <line x1="0" y1="100" x2="200" y2="100"/><line x1="0" y1="140" x2="200" y2="140"/>
     <line x1="0" y1="180" x2="200" y2="180"/>
     <line x1="20" y1="0" x2="20" y2="200"/><line x1="60" y1="0" x2="60" y2="200"/>
     <line x1="100" y1="0" x2="100" y2="200"/><line x1="140" y1="0" x2="140" y2="200"/>
     <line x1="180" y1="0" x2="180" y2="200"/>`
  ),
  metal: g(
    `<line x1="0" y1="30" x2="200" y2="30" stroke-width="0.6"/>
     <line x1="0" y1="55" x2="200" y2="55" stroke-width="0.6"/>
     <line x1="0" y1="90" x2="200" y2="90" stroke-width="1.4"/>
     <line x1="0" y1="115" x2="200" y2="115" stroke-width="0.6"/>
     <line x1="0" y1="150" x2="200" y2="150" stroke-width="0.6"/>
     <line x1="0" y1="175" x2="200" y2="175" stroke-width="0.6"/>`
  ),
  monogram: g(`<circle cx="100" cy="100" r="70"/><line x1="76" y1="100" x2="124" y2="100"/><line x1="100" y1="76" x2="100" y2="124"/>`),
};

export function glyph(name) {
  return glyphs[name] || glyphs.interiorA;
}
