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
    timeout: 8000
  });
};
