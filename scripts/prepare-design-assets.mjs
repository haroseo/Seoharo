// Mechanical image encoding only. UI and source pixels are not redesigned.
import { createRequire } from 'node:module';
import { readdir, stat, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require(process.env.DESIGN_SHARP_MODULE || 'sharp');
const sourceDirectory = resolve('docs/verification/one-to-z-source');
const outputDirectory = resolve('public/assets/one-to-z');
let sourceBytes = 0;
let outputBytes = 0;
for (const name of (await readdir(sourceDirectory)).filter(name => /^one-to-z-[0-9]+-[0-9]+\.png$/.test(name))) {
  const source = resolve(sourceDirectory, name);
  const output = resolve(outputDirectory, name.replace(/\.png$/, '.webp'));
  await sharp(source).webp({ quality: 88, effort: 5 }).toFile(output);
  sourceBytes += (await stat(source)).size;
  outputBytes += (await stat(output)).size;
}
console.log(JSON.stringify({ sourceBytes, outputBytes }));

// Normalize the capture scale and join settled viewport slices. Never fill gaps.
const captures = JSON.parse(await readFile('docs/verification/designgraphy-verified-captures.json', 'utf8'));
for (const capture of captures) {
  const width = Math.round(capture.width);
  const height = Math.round(capture.height);
  const viewportHeight = Math.round(capture.viewHeight);
  const bottomY = Math.round(capture.y);
  if (capture.topY !== 0 || bottomY > viewportHeight || Math.abs(bottomY + viewportHeight - height) > 1) {
    throw new Error(`Uncovered capture area: ${capture.name}`);
  }
  const top = await sharp(`docs/verification/designgraphy-${capture.name}-top.jpg`).resize(width, viewportHeight, { fit: 'fill' }).toBuffer();
  const bottom = await sharp(`docs/verification/designgraphy-${capture.name}-bottom.jpg`).resize(width, viewportHeight, { fit: 'fill' }).toBuffer();
  const layers = bottomY === 0 ? [{ input: top, top: 0, left: 0 }] : [
    { input: await sharp(top).extract({ left: 0, top: 0, width, height: bottomY }).toBuffer(), top: 0, left: 0 },
    { input: bottom, top: bottomY, left: 0 },
  ];
  await sharp({ create: { width, height, channels: 3, background: '#fff' } }).composite(layers).webp({ quality: 88 }).toFile(`public/assets/designgraphy/${capture.name}.webp`);
  console.log(`${capture.name}: ${width}x${height}`);
}
