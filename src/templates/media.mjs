import manifest from "../data/images.json" with { type: "json" };

/**
 * Product photography <img> helper. Sources live in src/assets/img/products
 * (copied to /assets/img/products at build time). Width/height come from
 * the build-time manifest so the browser can reserve space (CLS ~ 0).
 *
 * @param {string} name - manifest key / filename without extension
 * @param {string} alt - localized alt text
 * @param {object} [opts]
 * @param {boolean} [opts.eager] - skip lazy-loading (above-the-fold images)
 * @param {string} [opts.extraClass]
 */
export function photo(name, alt, { eager = false, extraClass = "" } = {}) {
  const dims = manifest[name];
  if (!dims) throw new Error(`Unknown image "${name}" — not in images.json manifest`);
  return `<img src="/assets/img/products/${name}.jpg" alt="${alt}" width="${dims.w}" height="${dims.h}"${eager ? "" : ' loading="lazy"'} decoding="async" class="photo ${extraClass}">`;
}

export function photoDims(name) {
  return manifest[name];
}
