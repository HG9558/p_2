
<template>
  <div>
    <table-pro ref="tableProRef" :list-api="APIs.site.getMerchantList" :delete-api="APIs.site.getMerchantList" :isExport=false
      :columns="columns" :subtotal-footer-array="['seq']" :total-footer-array="['seq']">
      <template #name="{ row }">
        <div style="color: #67C23A">{{ row.name }}</div>
      </template>
      <template #state="{ row }">
        <div :style="{ color: row.origin_state === 1 ? '#F56C6C' : '#409EFF' }">{{ row.state }}</div>
      </template>
      
      <template #operate="{ row }">
        
        <el-button type="primary" @click="editFun(row)">编辑</el-button>
  
        
        <el-button type="danger" size="mini" @click="deletaFun(row)">删除</el-button>
  
      </template>
  
      
        <template #add>
          <el-button type="primary" @click="addFun">新增</el-button>
        </template>
  
    </table-pro>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TablePro, { type ColumnsProp } from '@/components/table-pro/index';
import { APIs } from '@/http';
import {
  stateList,
  transformState,
  transformAll
} from '@/components/table-pro/tableDataTransfrom'

import { useDialog } from '@/hooks/useDialog';

import Edit from './Edit.vue';
  

import Add from './Add.vue';
  
const { openDialog } = useDialog();
  

const tableProRef = ref<InstanceType<typeof TablePro>>();
const columns = ref<ColumnsProp[]>([
  {
    field: 'name',
    title: '姓名',
    minWidth: 180,
    slots: { default: 'name' },
    otherConfig: {
      isSearch: true,
      searchType: 'input'
    }
  },
  {
    field: 'state',
    title: '状态',
    minWidth: 180,
    slots: {
      default: 'state'
    },
    handle: transformState,
    otherConfig: {
      isSearch: true,
      searchType: 'select',
      options: stateList
    }
  },
  {
    field: 'seq',
    title: '排序',
    minWidth: 180,
    otherConfig: {
      isSearch: true,
      otherSearch: {
        label: '排序时间',
        type: 'datetimerange',
        modelNameArray: ['start_time', 'end_time'],
        default: null
      },
    }
  },
  {
    field: 'updated_at',
    title: '更新时间',
    minWidth: 180,
    handle: transformAll,
  },
  
  {
    field: 'operate',
    title: '操作',
    minWidth: 180,
    slots: {
      default: 'operate'
    },
  }
  
])
const addFun = () => {
  openDialog(Add, {
    getList: tableProRef.value?.getListData
  })
}

const editFun = (row) => {
  openDialog(Edit, {
    row,
    getList: tableProRef.value?.getListData
  })
}

const deletaFun = (row) => {
  tableProRef.value?.delete(row, ['id', 'state']);
}
</script>

<style lang="scss" scoped>

</style>
