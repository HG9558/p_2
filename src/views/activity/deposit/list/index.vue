<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <!-- <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{t('global.query')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">{{ t('global.increment')
        }}</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table  :data="listData">
      <el-table-column :label="t('global.sortabled')" align="center" prop="sort" />
      <el-table-column :label="t('routes.activity.activity_name')" align="center" prop="name" />
      <el-table-column :label="t('routes.activity.deposit_bonus')" align="center" prop="bonus" />
      <!-- <el-table-column :label="t('global.bio_bs')" align="center" prop="flow" /> -->
      <el-table-column :label="t('routes.activity.max_amount')+'(BRL)'" align="center" prop="max_amount" />
      <el-table-column :label="t('routes.activity.min_amount')+'(BRL)'" align="center" prop="min_amount" />
      <el-table-column :label="t('routes.activity.ty')" align="center" prop="ty">
        <template #default="{ row }">
          {{ row.ty && (row.ty == 1 ? t('routes.tips.sc') : t('routes.tips.cc')) }}
        </template>
      </el-table-column>
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ t('global.edit')
          }}</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-show="total > 0" :total="total" :current-page="queryParams.page" hide-on-single-page  layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 添加或修改菜单权限对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body @close="cancel">
      <el-form ref="formEl" :model="form" :rules="rules" label-width="auto">
        <el-form-item :label="t('routes.activity.activity_name')" prop="name">
          <el-input v-model="form.name"  :placeholder="t('routes.activity.activity_name_placeholder')" style="width: 200px;"/>
        </el-form-item>
        <el-form-item :label="t('routes.activity.deposit_bonus')+'(%)'" prop="bonus" class="mt10">
          <el-input-number v-model="form.bonus" controls-position="right" :min="0" :max="100"  :placeholder="t('routes.activity.deposit_bonus_placeholder')" class="nbInput" />
        </el-form-item>
        <!-- <el-form-item :label="t('global.bio_bs')" prop="flow" class="mt10">
          <el-input-number v-model="form.flow" controls-position="right" :placeholder="t('routes.vip_list_page.adjustment_tips2')"  class="nbInput"/>
        </el-form-item> -->
        <el-form-item :label="t('routes.activity.max_amount')+'(BRL)'" prop="max_amount" class="mt10">
          <el-input-number v-model="form.max_amount" controls-position="right" :placeholder="t('routes.activity.max_amount_placeholder')" class="nbInput" />
        </el-form-item>
        <el-form-item :label="t('routes.activity.min_amount')+'(BRL)'" prop="min_amount" class="mt10">
          <el-input-number v-model="form.min_amount" :precision="2" controls-position="right" :placeholder="t('routes.activity.min_amount_placeholder')" class="nbInput"/>
        </el-form-item>
        <el-form-item :label="t('global.sortabled')" prop="sort" class="mt10">
          <el-input-number v-model="form.sort" :precision="2" controls-position="right" :min="0" :placeholder="t('global.sort_enter')" class="nbInput"/>
        </el-form-item>
        <el-form-item :label="t('routes.activity.ty')" prop="ty" class="mt10">
          <el-select v-model="form.ty" :placeholder="t('global.please_choose')" clearable>
            <el-option :label="t('routes.tips.sc')" :value="1" />
            <el-option :label="t('routes.tips.cc')" :value="2" />
          </el-select>
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
import { ElForm,ElMessage } from 'element-plus'
import { getDepositActivity, insertDeposit, updateDeposit } from '@/http/modules/activity'
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'inviteActivity',
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
    const formEl = ref<FormInstance | null>(null)
    const queryFormEl = ref<FormInstance | null>(null)
    // 表单校验
    const rules = reactive<FormInstance['rules']>({
      name: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      bonus: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      // flow: [
      //   { required: true, message: t('global.enter_item'), trigger: "blur" },
      // ],
      max_amount: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      min_amount: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      sort: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      ty: [
        { required: true, message: t('global.please_choose'), trigger: "blur" },
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
      getDepositActivity(queryParams.value).then((res: any) => {
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
    const successMsg = (state:any,msg:string)=>{
        if (state === true) {
            ElMessage({
              type: 'success',
              message: msg,
            })
          }
    }
    const submitForm = async () => {
      if (formEl.value) {
        await formEl.value.validate((valid, fields) => {
          if (valid) {
            if (title.value === t('global.increment')) {
              insertDeposit({...form.value,id:''}).then((res) => {
                open.value = false;
                getList();
                successMsg(res.status,t('global.add_suc'));
              })
            } else {
              updateDeposit(form.value).then((res) => {
                open.value = false;
                getList();
                successMsg(res.status,t('global.update_suc'))
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
      cancel
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
