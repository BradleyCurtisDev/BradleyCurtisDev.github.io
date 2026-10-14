function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) / 4294967295;
}


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


function branchPath(P, C, parentIsRoot) {
  const unit = (x, y) => { const m = Math.hypot(x, y) || 1; return [x / m, y / m]; };
  const dist = Math.hypot(C.x - P.x, C.y - P.y);
  const dC = unit(C.x, C.y);
  const dP = parentIsRoot ? unit(C.x - P.x, C.y - P.y) : unit(P.x, P.y);
  const k = dist * 0.42;
  return `M${P.x} ${P.y} C${P.x + dP[0] * k} ${P.y + dP[1] * k}, ${C.x - dC[0] * k} ${C.y - dC[1] * k}, ${C.x} ${C.y}`;
}
