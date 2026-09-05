import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
const widths = [1440, 768, 390];
const summary = {};
for (const w of widths) {
  const files = fs.readdirSync('../qa/orig').filter(f => f.startsWith(`slice-${w}-`)).sort();
  const rows = [];
  for (const f of files) {
    const op = `../qa/orig/${f}`, cp = `../qa/clone/${f}`;
    if (!fs.existsSync(cp)) { rows.push([f, 'MISSING']); continue; }
    const a = PNG.sync.read(fs.readFileSync(op));
    const b = PNG.sync.read(fs.readFileSync(cp));
    if (a.width !== b.width || a.height !== b.height) { rows.push([f, `DIM ${a.width}x${a.height} vs ${b.width}x${b.height}`]); continue; }
    const d = new PNG({ width: a.width, height: a.height });
    const n = pixelmatch(a.data, b.data, d.data, a.width, a.height, { threshold: 0.2 });
    const ratio = n / (a.width * a.height);
    fs.writeFileSync(`../qa/diff/${f}`, PNG.sync.write(d));
    rows.push([f, (ratio * 100).toFixed(2) + '%']);
  }
  summary[w] = rows;
  console.log(`=== ${w} ===`);
  rows.forEach(r => console.log(' ', r[0], r[1]));
  const nums = rows.map(r => parseFloat(r[1])).filter(x => !isNaN(x));
  console.log('  mean', (nums.reduce((s, x) => s + x, 0) / nums.length).toFixed(2) + '%', ' worst', Math.max(...nums).toFixed(2) + '%');
}
fs.writeFileSync('../qa/diff-summary.json', JSON.stringify(summary, null, 2));
