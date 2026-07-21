import { flushPromises } from '@vue/test-utils';

import App from '@/App.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('App', () => {
  const setupWrapper = async () => {
    const wrapper = await testHelpers.mount(App);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();
    await flushPromises();

    global.vueSnapshots.stubs = {
      '[d]': { removeAttributes: ['d'] },
      '.toolbar-logo': { removeAttributes: ['src'] },
      '.min-csslop-logo': { removeAttributes: ['src'] }
    };

    expect(wrapper)
      .toMatchSnapshot();
  });
});
