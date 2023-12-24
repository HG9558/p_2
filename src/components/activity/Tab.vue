<template>
  <div class="tab-title">
    <span>{{ props.msg }}</span>
  </div>
</template>

<script lang="ts" setup>
// props 接收 msg
const props = defineProps<{ msg: string }>()

</script>

<style lang="scss" scoped>
.tab-title {

  &>span {
    display: inline-block;
    font-size: 14px;
    color: #409eff;
    line-height: 38px;
    border-bottom: 2px solid #409eff;
  }
}
</style>