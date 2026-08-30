/**
 * @file Automatically ran when just before when `npm run build` is ran.
 */

import { copySortOrder } from './copySortOrder.js';
import { copyWasm } from './copyWasm.js';

copySortOrder();
copyWasm();
