<template>
  <div>
    <div class="betting-cont">
      <el-dialog title="查看日志" v-model="dialogComputed" :close-on-click-modal="false">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="a" :label="t('global.operating')" align="center"></el-table-column>
          <el-table-column prop="ip" label="时间" align="center">
            <template #default="scope">
              {{ $filters.format(scope.row.updated_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="col3" label="结果" align="center"></el-table-column>
          <el-table-column prop="col4" label="耗时" align="center"></el-table-column>
          <el-table-column prop="col3" label="操作人" align="center"></el-table-column>
          <el-table-column prop="col3" label="备注" align="center"></el-table-column>
        </el-table>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="dialogComputed = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'priorityDispatchRule',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const dialogComputed = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    });
    const tableData = ref<any>();
    const showForm = (data: any) => {
      console.log(data);
    };
    return {
      tableData,
      showForm,
      dialogComputed
    };
  }
});
</script>
<style lang="scss" scoped></style>
