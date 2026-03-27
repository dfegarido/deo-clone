import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** PNGs used by components/Work.tsx — output same basename with .webp */
const FILES = [
  'Hims&Hers 1.png',
  'Hims&Hers 2.png',
  'LendingTree 1.png',
  'LendingTree 2.png',
  "Sam's Club 1.png",
  "Sam's Club 2.png",
  'TruGreen 1.png',
  'TruGreen 1 (2).png',
  'Vivint 1.png',
  'Vivint 2.png',
  'Hims&Hers.png',
  'Lending Tree.png',
  "Sam's Club.png",
  'Trugreen.png',
  'Vivint.png',
];

for (const name of FILES) {
  const input = join(root, 'assets', name);
  const outName = name.replace(/\.png$/i, '.webp');
  const output = join(root, 'assets', outName);
  await sharp(input).webp({ quality: 82, effort: 6 }).toFile(output);
  console.log('wrote', outName);
}
