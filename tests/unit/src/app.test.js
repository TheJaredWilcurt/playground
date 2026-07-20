import App from '@/App.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('App', () => {
  const setupWrapper = async () => {
    const wrapper = await testHelpers.mount(App);
    return wrapper;
  };

  test('Renders correctly', async () => {
    const wrapper = await setupWrapper();

    global.vueSnapshots.stubs = {
      '.toolbar-logo': { removeAttributes: ['src'] },
      '.min-csslop-logo': { removeAttributes: ['src'] }
    };

    expect(wrapper)
      .toMatchSnapshot();
  });
});
