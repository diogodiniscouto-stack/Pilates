import { glyph } from "./glyphs.mjs";

/**
 * Renders a placeholder "photography" block: tonal gradient + abstract
 * line-art glyph + caption naming what real photography should go there.
 *
 * @param {object} opts
 * @param {string} opts.tone - ivory | sand | charcoal | ink | gold-wash
 * @param {string} opts.ratio - square | portrait | wide | ultra | tall | fill
 * @param {string} opts.glyphName - key from glyphs.mjs
 * @param {string} [opts.caption] - shown as a small pill label
 * @param {string} [opts.extraClass]
 * @param {boolean} [opts.noCaption]
 */
export function art({ tone = "ivory", ratio = "wide", glyphName = "interiorA", caption = "", extraClass = "", noCaption = false }) {
  const captionMarkup = caption && !noCaption ? `<span class="art-placeholder__caption">${caption}</span>` : "";
  return `<div class="art-placeholder art-placeholder--${tone} art-placeholder--${ratio} ${extraClass}">
    <span class="art-placeholder__glyph">${glyph(glyphName)}</span>
    ${captionMarkup}
  </div>`;
}
