<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">{{ t('global.increment')
        }}</el-button>
      </el-col>
    </el-row>

    <el-table  :data="listData">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column :label="t('routes.vip_list_page.bank.bankcode')" align="center" prop="bankcode" />
      <el-table-column :label="t('routes.vip_list_page.bank.bankname')" align="center" prop="bankname" />
      <!-- <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ t('global.edit')
          }}</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <el-pagination v-show="total > 0" :total="total" :current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 添加或修改菜单权限对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body @close="cancel">
      <el-form ref="formEl" :model="form" :rules="rules" label-width="auto" >
        <el-form-item :label="t('routes.vip_list_page.bank.bankcode')" prop="bankcode" class="mt10">
          <el-input v-model="form.bankcode" :placeholder="t('routes.tips.bank_code')"  class="nbInput"/>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.bank.bankname')" prop="bankname" class="mt10">
          <el-input v-model="form.bankname"   :placeholder="t('routes.tips.bank_enter')" class="nbInput" />
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ t('global.submit') }}</el-button>
        <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import type { ElForm } from 'element-plus'
import dayjs from 'dayjs';
import {  getBankType,insertBankType} from '@/http/modules/bank'
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'bankType',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const route = useRoute();
    const loading = ref(false);
    const ids = ref([]);
    const single = ref(true);
    const multiple = ref(false)
    const open = ref(false)
    const title = ref('');
    const formEl = ref<FormInstance | null>(null);
    const queryFormEl = ref<FormInstance | null>(null)
    // 表单校验
    const rules = reactive<FormInstance['rules']>({
      bankcode: [
        { required: true, message: t('routes.tips.bank_code'), trigger: "blur" },
      ],
      bankname: [
        { required: true, message: t('routes.tips.bank_enter'), trigger: "blur" },
      ],
    })
    const form = ref<Record<string, any>>({
      id:''
    })
    const total = ref();
    const queryParams = ref({
      page_size: 10,
      page: 1,
    })
    const listData = ref([]);
    const getList = () => {
      // loading.value = true;
      getBankType(queryParams.value).then((res: any) => {
        queryParams.value.page === 1 && (total.value = res.data.t);
        listData.value = res.data.d
      })
    }
    const reset = () => {
      if (formEl.value) {
        formEl.value.resetFields();
      }
    }
    const handleDelete = (row: any) => {
      console.log(row);
    }
    const submitForm = async () => {
      if (formEl.value) {
        await formEl.value.validate((valid, fields) => {
          if (valid) {
            if (title.value === t('global.increment')) {
              insertBankType(form.value).then((res) => {
                open.value = false;
                getList();
              })
            } else {
              insertBankType(form.value).then((res) => {
                open.value = false;
                getList();
              })
            }

          } else {
            console.log('error submit!', fields)
            return false;
          }
        }
        )
      }
    }
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        queryParams.value.page = 1;
        getList();
      }
    }
    const handleUpdate = (row: any) => {
      title.value = t('global.edit');
      form.value = _.cloneDeep(row);
      open.value = true;
      //设置表单
      // getList();
    }
    const handleAdd = () => {
      form.value = {};
      open.value = true;
      title.value = t('global.increment');
      //新增完更新列表
      //  getList();
    }
    const handleQuery = () => {
      queryParams.value.page = 1;
      getList();
    }
    const cancel = () => {
      open.value = false;
      reset();
    }
    getList();
    return {
      route,
      loading,
      ids,
      single,
      form,
      multiple,
      open,
      rules,
      queryParams,
      total,
      listData,
      title,
      formEl,
      queryFormEl,
      t, getList,
      handleDelete, submitForm, resetQuery, handleUpdate, handleAdd, handleQuery,
      cancel,dayjs
    };
  }
});
</script>

<style lang="scss" scoped>
.dayCard {
  border: 1px solid #CDD0D6;
  margin-bottom: 20px;
  padding: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.nbInput{
  width: 230px;
}
</style>
