import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'assets', 'Evolutra_logo_in_gradient_colors-removebg-preview.png');
const destDir = join(root, 'public');
const dest = join(destDir, 'favicon.png');

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
