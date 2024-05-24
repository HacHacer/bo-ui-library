<template>
  <Space>
    <a-button :type="'primary'" @click="setVisible(true)">begin</a-button>
    <a-button class="step1" :type="'primary'">Step1</a-button>
    <a-button class="step2" :type="'primary'">Step2</a-button>
    <a-button
      class="step3"
      :type="'primary'"
      style="position: absolute; bottom: 0"
      >Step3</a-button
    >
  </Space>
  <GuideTip
    :visible="visible"
    :on-end="() => setVisible(false)"
    :steps="steps"
  />
</template>

<script lang="ts">
import { Space, Button } from '@arco-design/web-vue';
import { GuideTip } from 'bo-ui-library';
import { ref } from 'vue';

// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: 'BasicDemo',
  components: {
    GuideTip,
    aButton: Button,
    Space,
  },
  setup() {
    const visible = ref(true);
    const setVisible = (value: boolean) => {
      visible.value = value;
    };
    const steps = ref([
      {
        title: 'Step 1',
        content: '这里是描述文字这里是描述文字',
        target: () => document.querySelector('.step1'),
      },
      {
        title: 'Step 2',
        content: '这里是描述文字这里是描述文字',
        target: () => document.querySelector('.step2'),
      },
      {
        title: 'Step 3',
        content: '这里是描述文字这里是描述文字',
        target: () => document.querySelector('.step3'),
      },
    ]);
    return {
      visible,
      setVisible,
      steps,
    };
  },
};
</script>
