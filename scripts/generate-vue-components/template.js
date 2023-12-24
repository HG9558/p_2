/**
 * Generate Vue component template
 */
function generateTemplate(isOperate, isDelete, isExport, isEdit, isAdd) {
  // console.log('isOperate', isOperate);

  const deleteDom = `
        <el-button type="danger" size="mini" @click="deletaFun(row)">删除</el-button>
  `;
  // const exportDom = `
  //     <template #export>
  //       <el-button type="primary" size="mini" @click="deletaFun(row)">导出</el-button>
  //     </template>
  // `;
  const editDom = `
        <el-button type="primary" @click="editFun(row)">编辑</el-button>
  `;

  const addDom = `
        <template #add>
          <el-button type="primary" @click="addFun">新增</el-button>
        </template>
  `;

  const addImport = `
import Add from './Add.vue';
  `
  const editImport = `
import Edit from './Edit.vue';
  `

  const dialogImport = `
import { useDialog } from '@/hooks/useDialog';
${isEdit ? editImport : ''}
${isAdd ? addImport : ''}
const { openDialog } = useDialog();
  `;

  const operateDomTemplate = `
      <template #operate="{ row }">
        ${isEdit ? editDom : ''}
        ${isDelete ? deleteDom : ''}
      </template>
  `;

  const operateDom = `
  {
    field: 'operate',
    title: '操作',
    minWidth: 180,
    slots: {
      default: 'operate'
    },
  }
  `

  return `
<template>
  <div>
    <table-pro ref="tableProRef" :list-api="APIs.site.getMerchantList" :delete-api="APIs.site.getMerchantList" :isExport=${isExport}
      :columns="columns" :subtotal-footer-array="['seq']" :total-footer-array="['seq']">
      <template #name="{ row }">
        <div style="color: #67C23A">{{ row.name }}</div>
      </template>
      <template #state="{ row }">
        <div :style="{ color: row.origin_state === 1 ? '#F56C6C' : '#409EFF' }">{{ row.state }}</div>
      </template>
      ${(isOperate) ? operateDomTemplate : ''}
      ${isAdd ? addDom : ''}
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
${(isEdit || isAdd) ? dialogImport : ''}

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
  ${isOperate ? operateDom : ''}
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
`;
}

function generateTab(tabNameList) {
  const importDom = tabNameList.map(item => {
    return `import ${item} from './${item}/index.vue';\n`
  }).join('')

  const nameList = tabNameList.map(item => {
    return `{name: '${item}',text: '${item}',components: ${item}},\n`
  }).join('')

  return `
<template>
  <div class="">
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts" setup>
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
${importDom}

const { t } = useI18n({ useScope: 'global' });
const nameList = [
  ${nameList}
];
</script>
<style lang="scss" scoped></style>
  `
}

function genEdit() {
  return `
<template>
  <div class="add-bg">编辑 {{ props.row }}
    <el-form :model="formData" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="medium">
      <el-form-item label="State" prop="state">
        <el-input v-model="formData.state"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElSelect } from 'element-plus'
import { ref } from 'vue';
import { useDialog } from '@/hooks/useDialog'
const props = defineProps<{
  row: any,
  getList: any
}>();
const { closeDialog } = useDialog();

const formRef = ref<typeof ElForm | null>(null)
const formData = ref({
  ...props.row
})
const rules = ref({
  state: [
    { required: true, message: '请输入State', trigger: 'blur' }
  ]
})

const onSubmit = () => {
  formRef.value?.validate((valid: any) => {
    if (valid) {
      console.log(formData.value)
      // props.getList()
      // closeDialog()
    }
  })
}
</script>

<style lang="scss" scoped>
.add-bg {
  background-color: white;
  padding: 20px;
  width: 500px;
}
</style>
  `
}

function genAdd() {
  return `
<template>
  <div class="add-bg">新增
    <el-form :model="formData" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="medium">
      <el-form-item label="Ab" prop="ab">
        <el-input v-model="formData.ab"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElSelect } from 'element-plus'
import { ref } from 'vue';
import { useDialog } from '@/hooks/useDialog'
const props = defineProps<{
  getList: any
}>();
const { closeDialog } = useDialog();

const formRef = ref<typeof ElForm | null>(null)
const formData = ref({
  ab: ''
})
const rules = ref({
  ab: [
    { required: true, message: '请输入Ab', trigger: 'blur' }
  ]
})

const onSubmit = () => {
  formRef.value?.validate((valid: any) => {
    if (valid) {
      console.log(formData.value)
      // props.getList()
      // closeDialog()
    }
  })
}
</script>

<style lang="scss" scoped>
.add-bg {
  background-color: white;
  padding: 20px;
  width: 500px;
}
</style>
  
  `
}

module.exports = {
  generateTemplate,
  generateTab,
  genEdit,
  genAdd
};
