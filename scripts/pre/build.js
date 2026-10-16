/**
 * @file Automatically ran when just before when `npm run build` is ran.
 */

import { copyWasm } from '../copyWasm.js';

copyWasm();
