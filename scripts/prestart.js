/**
 * @file Automatically ran when just before when `npm start` is ran.
 */

import { copySortOrder } from './copySortOrder.js';
import { copyWasm } from './copyWasm.js';

copySortOrder();
copyWasm();
