<template>
  <div></div>
</template>
<script>
import { before, after } from './decorator';
export default {
  methods: {
    @before()
    @after()
    errorHandle () {
      // 一些共用的异常处理方案
    }
  },
};
</script>