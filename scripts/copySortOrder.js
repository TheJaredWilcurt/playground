/**
 * @file Copies a required file to the public folder so CSSNano 9 can work.
 */

import {
  copyFileSync,
  mkdirSync
} from 'node:fs';
import {
  dirname,
  join
} from 'node:path';

const __dirname = import.meta.dirname;

export const copySortOrder = function () {
  const root = join(__dirname, '..');
  const Public = join(root, 'public');
  const source = join(
    root,
    'node_modules',
    'css-declaration-sorter',
    'src',
    'orders',
    'alphabetical.mjs'
  );
  const destination = join(Public, 'orders', 'alphabetical.mjs');

  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(source, destination);
};
