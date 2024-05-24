import { mount } from '@vue/test-utils';
import tipButton from '../index.vue';

describe('tipButton', () => {
  test('render <tipButton> content correctly', () => {
    const wrapper = mount(tipButton, {
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
