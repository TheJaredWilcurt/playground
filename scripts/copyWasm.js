import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const __dirname = import.meta.dirname;

const root = join(__dirname, '..');
const file = join(root, 'node_modules', 'esbuild-wasm', 'esbuild.wasm');
const output = join(root, 'public', 'esbuild.wasm');

copyFileSync(file, output);
