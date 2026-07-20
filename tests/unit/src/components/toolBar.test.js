import ToolBar from '@/components/ToolBar.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('ToolBar', () => {
  const setupWrapper = async () => {
    const options = {};
    const wrapper = await testHelpers.mount(ToolBar, options);
    return wrapper;
  };

  describe('Template', () => {
    test('Renders correctly', async () => {
      const wrapper = await setupWrapper();

      global.vueSnapshots.stubs = {
        '.toolbar-logo': { removeAttributes: ['src'] }
      };

      expect(wrapper)
        .toMatchSnapshot();
    });
  });
});
