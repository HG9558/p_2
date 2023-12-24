<template>
  <div class="p-title-v">
    <span>{{ props.msg }}</span>
  </div>
</template>

<script lang="ts" setup>
// props 接收 msg
const props = defineProps<{ msg: string }>()

</script>

<style lang="scss" scoped>
.p-title-v {
  color: #0960bd;
  font-weight: bold;
  border-left: 4px solid #0960bd;
  line-height: 1;
  padding-left: 5px;
  margin-bottom: 5px;
}
</style>