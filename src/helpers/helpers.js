import prettyMilliseconds from 'pretty-ms';
import { defineAsyncComponent } from 'vue';

import AsyncError from '@/components/AsyncError.vue';
import AsyncLoading from '@/components/AsyncLoading.vue';

/**
 * Asynchronously loads components, for better code spliting.
 *
 * @param  {Promise} loader  () => import('@/path/file.vue')
 * @return {object}          A Vue component
 */
export const asyncify = function (loader) {
  return defineAsyncComponent({
    // Async component to load
    loader,
    // Component to show while loading async component
    loadingComponent: AsyncLoading,
    // Delay before showing loadingComponent
    delay: 200,
    // Component to show if async component times out
    errorComponent: AsyncError,
    // Time to wait before showing error component
    timeout: 45 * 1000
  });
};

/**
 * Formats the time for display.
 *
 * @param  {number} duration  Time in ms
 * @return {string}           Formatted time
 */
export const formatMs = function (duration) {
  const options = {
    keepDecimalsOnWholeSeconds: true,
    secondsDecimalDigits: 3
  };
  const time = prettyMilliseconds(duration, options);
  return time;
};

export const extractError = function (error) {
  if (typeof(error) === 'string') {
    return error;
  }
  if (error.toString) {
    return error.toString();
  }
  if (error?.message) {
    return String(error.mesage);
  }
  return String(error);
};

/**
 * GZips a given stream and returns the length of characters.
 *
 * @param  {string} input  Any string to GZip
 * @return {number}        The length of the GZipped output as a string
 */
export const getGzippedSize = async function (input) {
  /**
   * Combine multiple Uint8Arrays into one.
   *
   * @param  {ReadonlyArray<Uint8Array>} uint8arrays  Arrays to concat
   * @return {Promise<Uint8Array>}
   */
  const concatUint8Arrays = async function (uint8arrays) {
    const blob = new Blob(uint8arrays);
    const buffer = await blob.arrayBuffer();
    return new Uint8Array(buffer);
  };

  /**
   * Convert a string to its UTF-8 bytes and compress it.
   *
   * @param  {string}              str  String to compress
   * @return {Promise<Uint8Array>}
   */
  const compress = async function (str) {
    const stream = new Blob([str]).stream();
    const compressedStream = stream
      .pipeThrough(new CompressionStream('gzip'));
    const chunks = [];
    for await (const chunk of compressedStream) {
      chunks.push(chunk);
    }
    return await concatUint8Arrays(chunks);
  };

  const zipped = await compress(input);
  const string = new TextDecoder().decode(zipped);
  return string.length;
};
