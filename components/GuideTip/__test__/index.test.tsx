import { mount } from '@vue/test-utils';
import GuideTip from '../index.vue';

describe('GuideTip', () => {
  test('render <GuideTip> content correctly', () => {
    const wrapper = mount(GuideTip, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
      slots: {
        default: 'test button',
      },
    });

    expect(wrapper.text()).toContain('test button');
  });
});
