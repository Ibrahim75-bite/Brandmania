const fs = require('fs');

const content = fs.readFileSync('scratch_stream1.txt', 'utf8');

// Tokenize by whitespace
const tokens = content.trim().split(/\s+/);

let currentMatrix = [1, 0, 0, 1, 0, 0];
const matrixStack = [];
const paths = [];

function applyMatrix(m, x, y) {
  return [
    m[0] * x + m[2] * y + m[4],
    m[1] * x + m[3] * y + m[5]
  ];
}

function multMatrix(m1, m2) {
  return [
    m1[0] * m2[0] + m1[2] * m2[1],
    m1[1] * m2[0] + m1[3] * m2[1],
    m1[0] * m2[2] + m1[2] * m2[3],
    m1[1] * m2[2] + m1[3] * m2[3],
    m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
    m1[1] * m2[4] + m1[3] * m2[5] + m1[5],
  ];
}

let currentColor = '#8e00ea';
let currentStrokeColor = '#ffffff';
let currentStrokeWidth = 75;
let currentPathD = '';
const stack = [];

for (let i = 0; i < tokens.length; i++) {
  const tok = tokens[i];

  if (tok === 'q') {
    matrixStack.push([...currentMatrix]);
  } else if (tok === 'Q') {
    if (matrixStack.length) currentMatrix = matrixStack.pop();
  } else if (tok === 'cm') {
    const f = Number(stack.pop());
    const e = Number(stack.pop());
    const d = Number(stack.pop());
    const c = Number(stack.pop());
    const b = Number(stack.pop());
    const a = Number(stack.pop());
    currentMatrix = multMatrix(currentMatrix, [a, b, c, d, e, f]);
  } else if (tok === 'scn') {
    const b = Number(stack.pop());
    const g = Number(stack.pop());
    const r = Number(stack.pop());
    currentColor = `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
  } else if (tok === 'SCN') {
    const b = Number(stack.pop());
    const g = Number(stack.pop());
    const r = Number(stack.pop());
    currentStrokeColor = `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
  } else if (tok === 'w') {
    currentStrokeWidth = Number(stack.pop());
  } else if (tok === 'm') {
    const y = Number(stack.pop());
    const x = Number(stack.pop());
    const [sx, sy] = applyMatrix(currentMatrix, x, y);
    currentPathD += `M ${sx.toFixed(2)} ${(2000 - sy).toFixed(2)} `;
  } else if (tok === 'l') {
    const y = Number(stack.pop());
    const x = Number(stack.pop());
    const [sx, sy] = applyMatrix(currentMatrix, x, y);
    currentPathD += `L ${sx.toFixed(2)} ${(2000 - sy).toFixed(2)} `;
  } else if (tok === 'c') {
    const y3 = Number(stack.pop());
    const x3 = Number(stack.pop());
    const y2 = Number(stack.pop());
    const x2 = Number(stack.pop());
    const y1 = Number(stack.pop());
    const x1 = Number(stack.pop());
    const [sx1, sy1] = applyMatrix(currentMatrix, x1, y1);
    const [sx2, sy2] = applyMatrix(currentMatrix, x2, y2);
    const [sx3, sy3] = applyMatrix(currentMatrix, x3, y3);
    currentPathD += `C ${sx1.toFixed(2)} ${(2000 - sy1).toFixed(2)}, ${sx2.toFixed(2)} ${(2000 - sy2).toFixed(2)}, ${sx3.toFixed(2)} ${(2000 - sy3).toFixed(2)} `;
  } else if (tok === 'h') {
    currentPathD += 'Z ';
  } else if (tok === 'f') {
    if (currentPathD.trim()) {
      paths.push({ type: 'fill', d: currentPathD.trim(), color: currentColor });
      currentPathD = '';
    }
  } else if (tok === 'S') {
    if (currentPathD.trim()) {
      paths.push({ type: 'stroke', d: currentPathD.trim(), color: currentStrokeColor, width: currentStrokeWidth });
      currentPathD = '';
    }
  } else if (!isNaN(Number(tok))) {
    stack.push(tok);
  }
}

// Build SVG
let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" width="2000" height="2000">\n`;
svg += `  <rect width="2000" height="2000" fill="#0A090D" />\n`;
svg += `  <g id="brand-eye-emblem">\n`;
paths.forEach(p => {
  if (p.type === 'fill') {
    svg += `    <path d="${p.d}" fill="${p.color}" />\n`;
  } else if (p.type === 'stroke') {
    svg += `    <path d="${p.d}" fill="none" stroke="${p.color}" stroke-width="${p.width}" stroke-miterlimit="10" />\n`;
  }
});
svg += `  </g>\n`;
svg += `</svg>\n`;

fs.writeFileSync('test_emblem.svg', svg);
console.log('Saved test_emblem.svg with', paths.length, 'paths');
