<template>
  <popover
    :popup-visible="visible"
    position="bottom"
    class="guide-tip"
    :popup-container="'.guide-wrapper'"
  >
    <div class="guide-tip-target" :style="targetStyle"></div>
    <template #title>
      <template v-if="isRenderFunction(current?.title)">
        <!-- 调用函数并渲染返回的 VNode -->
        <component :is="current?.title()"></component>
      </template>
      <!-- 否则，假定 title 为字符串 -->
      <template v-else>
        {{ current?.title }}
      </template>
    </template>
    <template #content>
      <template v-if="isRenderFunction(current?.content)">
        <!-- 调用函数并渲染返回的 VNode -->
        <component :is="current?.content()"></component>
      </template>
      <!-- 否则，假定 title 为字符串 -->
      <template v-else>
        {{ current?.content }}
      </template>
      <div class="guide-tip-footer">
        <space>
          <a-button
            v-if="currentIndex > 0"
            @click="setCurrentIndex(Math.max(0, currentIndex - 1))"
            >上一步</a-button
          >
          <a-button
            v-if="currentIndex < steps.length - 1"
            @click="
              setCurrentIndex(Math.min(currentIndex + 1, steps.length - 1))
            "
            >下一步</a-button
          >
          <a-button v-if="currentIndex === steps.length - 1" @click="onEnd"
            >完成</a-button
          >
        </space>
      </div>
    </template>
  </popover>
  <div v-show="visible" class="guide-wrapper"> </div>
</template>

<script lang="ts">
import {
  PropType,
  RenderFunction,
  computed,
  defineComponent,
  ref,
  watchEffect,
} from 'vue';
import { Popover, Space, Button } from '@arco-design/web-vue';
import { isRenderFunction } from '../utils';

interface current {
  title?: RenderFunction | string;
  content?: RenderFunction | string;
  target: () => HTMLElement;
}
export default defineComponent({
  name: 'GuideTip',
  components: {
    Popover,
    Space,
    aButton: Button,
  },
  props: {
    /**
     * @zh 引导步骤
     * @en Guide steps
     */
    steps: {
      type: Array as PropType<current[]>,
      default: () => [],
    },
    /**
     * @zh 是否显示引导气泡
     * @en Whether to show
     */
    visible: Boolean,
    /**
     * @zh 引导结束回调
     * @en Callback when the guide ends
     */
    onEnd: {
      type: Function as PropType<() => void>,
    },
  },
  setup(props) {
    const currentIndex = ref(-1);

    const current = computed(() => props.steps[currentIndex.value]);
    const setCurrentIndex = (index: number) => {
      currentIndex.value = index;
    };
    watchEffect(() => {
      if (props.visible) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    });
    const targetStyle = computed(() => {
      if (!props.visible) return null;
      const target = props.steps[currentIndex.value]?.target?.();
      props.steps.forEach((item) => {
        item.target().style.zIndex = '';
      });
      if (target) {
        target.style.zIndex = '10000';
        const { width, height, left, top } = target.getBoundingClientRect();
        return {
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`,
        };
      }
      return null;
    });
    return {
      currentIndex,
      current,
      isRenderFunction,
      setCurrentIndex,
      targetStyle,
    };
  },
});
</script>
