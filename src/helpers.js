/**
 * @file Pure helper functions used by the skill-tree portfolio page.
 * @author Bradley Curtis
 */

/**
 * Turns a string into a stable pseudo-random number between 0 and 1
 * (FNV-1a hash). The same input always gives the same output, so the
 * skill-tree layout looks hand-grown but never changes between loads.
 *
 * @param {string} s - The text to hash (e.g. a node id plus a suffix).
 * @returns {number} A number in the range 0 to 1.
 * @example
 * hash('about-a'); // always returns the same value
 */
function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}
/**
 * Splits text into lines no longer than `max` characters, breaking
 * only at spaces. A single word longer than `max` stays on its own line.
 *
 * @param {string} text - The label to wrap.
 * @param {number} max - Maximum characters per line.
 * @returns {string[]} The wrapped lines.
 * @example
 * wrapLabel('Game Design Basics', 10); // ['Game', 'Design', 'Basics']
 */

function wrapLabel(text, max) {
  const lines = [];
  let cur = '';
  text.split(' ').forEach(w => {
    if (cur && (cur + ' ' + w).length > max) { lines.push(cur); cur = w; }
    else cur = cur ? cur + ' ' + w : w;
  });
  if (cur) lines.push(cur);
  return lines;
}
/**
 * Builds an SVG path string for a curved branch from a parent node
 * to a child node, using a cubic Bézier curve.
 *
 * @param {{x: number, y: number}} P - Parent node position.
 * @param {{x: number, y: number}} C - Child node position.
 * @param {boolean} parentIsRoot - True if the parent is the root node,
 *   which changes the direction the curve leaves the parent.
 * @returns {string} The value for an SVG `d` attribute.
 */

function branchPath(P, C, parentIsRoot) {
  const unit = (x, y) => { const m = Math.hypot(x, y) || 1; return [x / m, y / m]; };
  const dist = Math.hypot(C.x - P.x, C.y - P.y);
  const dC = unit(C.x, C.y);
  const dP = parentIsRoot ? unit(C.x - P.x, C.y - P.y) : unit(P.x, P.y);
  const k = dist * 0.42;
  return `M${P.x} ${P.y} C${P.x + dP[0] * k} ${P.y + dP[1] * k}, ${C.x - dC[0] * k} ${C.y - dC[1] * k}, ${C.x} ${C.y}`;
}
