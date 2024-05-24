<template>
  <tipButton :tip="'hello world'" attr="123" @click="handleClick"
    >Demo Basic</tipButton
  >
</template>

<script lang="ts">
import { tipButton } from 'bo-ui-library';

// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: 'BasicDemo',
  components: {
    tipButton,
  },
  setup() {
    const handleClick = () => {
      alert('click');
    };
    return {
      handleClick,
    };
  },
};
</script>
