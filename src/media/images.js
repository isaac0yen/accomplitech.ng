/**
 * Resolves the WebP files in this folder into `src` / `srcSet` pairs.
 *
 * Filenames follow `<name>-<width>.webp`, which is what ./scripts/optimize-media.sh
 * emits. Widths are read off the filenames rather than hard-coded here, so
 * adding or dropping a size in that script needs no change in the components.
 */

const context = require.context('./', false, /\.webp$/);

/** name -> url, for files with no width suffix (logos, single-size art). */
const flat = {};
/** name -> { width: url }, for responsive sets. */
const sets = {};

context.keys().forEach((key) => {
  const file = key.replace(/^\.\//, '').replace(/\.webp$/, '');
  const url = context(key);
  const match = file.match(/^(.*)-(\d+)$/);

  flat[file] = url;
  if (match) {
    const [, name, width] = match;
    sets[name] = sets[name] || {};
    sets[name][Number(width)] = url;
  }
});

/** URL of a single image, e.g. image('client-uba') or image('logo-96'). */
export function image(name) {
  const url = flat[name];
  if (!url) throw new Error(`No image "${name}.webp" in src/media`);
  return url;
}

/**
 * Props for a responsive <img>.
 *
 * @param name  base filename, e.g. 'cohort-group'
 * @param sizes a CSS `sizes` value describing the slot the image renders into
 * @returns {{src: string, srcSet: string, sizes: string}}
 */
export function responsive(name, sizes) {
  const set = sets[name];
  if (!set) throw new Error(`No responsive set "${name}-<width>.webp" in src/media`);

  const widths = Object.keys(set)
    .map(Number)
    .sort((a, b) => a - b);

  return {
    // Smallest as the fallback: browsers that ignore srcSet are the ones least
    // likely to want the 1800px file.
    src: set[widths[0]],
    srcSet: widths.map((w) => `${set[w]} ${w}w`).join(', '),
    sizes,
  };
}
