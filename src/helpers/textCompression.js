/**
 * @file Functions related to compressing, encoding, decompressing, and decoding
 *       strings of text for use in the URL bar to store sharable state.
 */

import {
  strFromU8,
  strToU8,
  unzlibSync,
  zlibSync
} from 'fflate';

/**
 * Uses ZLib to losslessly compress a string to a (usually) shorter URL safe
 * string.
 *
 * @param  {string} data  Any input value
 * @return {string}       The base64 endcoded output
 */
export const urlEncode = function (data) {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

/**
 * Decodes a base64 ZLib encoded string back to its original value.
 *
 * @param  {string} base64  A base64 encoded ZLib compressed string
 * @return {string}         The original value, decoded and decompressed
 */
export const urlDecode = function (base64) {
  const binary = atob(base64);
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true);
    const unzipped = unzlibSync(buffer);
    return strFromU8(unzipped);
  }
  return decodeURIComponent(escape(binary));
};
