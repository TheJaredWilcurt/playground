import PlayGround from '@/views/PlayGround.vue';

import testHelpers from '@@/unit/testHelpers.js';

describe('PlayGround', () => {
  const setupWrapper = async () => {
    const options = {};
    const wrapper = await testHelpers.mount(PlayGround, options);
    return wrapper;
  };

  test('Mounts and renders', async () => {
    const wrapper = await setupWrapper();

    global.vueSnapshots.stubs = {
      svg: { removeAttributes: true, removeInnerHtml: true },
      '.min-csslop-logo': { removeAttributes: ['src'] }
    };

    expect(wrapper)
      .toMatchSnapshot();
  });
});
