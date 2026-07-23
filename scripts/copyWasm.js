import {
  copyFileSync,
  readdirSync,
  unlinkSync
} from 'node:fs';
import {
  dirname,
  join
} from 'node:path';

import { version } from 'esbuild-wasm';

const __dirname = import.meta.dirname;

const root = join(__dirname, '..');
const Public = join(root, 'public');
const file = join(root, 'node_modules', 'esbuild-wasm', 'esbuild.wasm');
const output = join(Public, 'esbuild-v' + version + '.wasm');

const publicFiles = readdirSync(Public);

for (const publicFile of publicFiles) {
  if (publicFile.endsWith('.wasm')) {
    unlinkSync(join(Public, publicFile));
  }
}

copyFileSync(file, output);
