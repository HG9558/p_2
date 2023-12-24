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
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">{{ t('global.increment') }}</el-button>
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
      <el-table-column :label="t('routes.activity.activity_id')" align="center" prop="id" />
      <el-table-column :label="t('routes.activity.treasure_invite_num')" align="center" prop="invite_num" />
      <el-table-column :label="t('routes.activity.treasure_amount')" align="center" prop="amount" />
      <el-table-column :label="t('routes.activity.total_amount')" align="center" prop="total_amount" />
      <!-- <el-table-column label="邀请人数" align="center" prop="vip" />
      <el-table-column label="宝箱金额" align="center" prop="vip" /> -->
      
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{t('global.edit') }}</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 添加或修改菜单权限对话框 -->
    <el-dialog :title="title" v-model="open" width="650px" append-to-body @close="cancel">
      <el-form ref="formEl" :model="form" :rules="rules" label-width="auto">
            <el-form-item :label="t('routes.activity.treasure_invite_num')" prop="invite_num">
              <el-input v-model="form.invite_num" :placeholder="t('routes.activity.treasure_invite_num_placeholder')" />
            </el-form-item>
        <el-form-item :label="t('routes.activity.treasure_amount')" prop="amount" class="mt10">
          <el-input v-model="form.amount" :placeholder="t('routes.activity.treasure_amount_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('routes.activity.total_amount')" prop="total_amount" class="mt10">
          <el-input v-model="form.total_amount" :placeholder="t('routes.activity.total_amount_placeholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{t('global.submit')}}</el-button>
        <el-button @click="cancel">{{t('global.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElForm,ElMessage } from 'element-plus'
import { treasureInsert, treasureList, treasureUpdate } from '@/http/modules/activity'
import { empty } from '@/components/serch-form/empty';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'treasureList',
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
      invite_num: [
        { required: true, message: t('routes.activity.treasure_invite_num_tip'), trigger: "blur" },
      ],
      amount: [
        { required: true, message: t('routes.activity.treasure_amount_tip'), trigger: "blur" },
      ],
      total_amount: [
        { required: true, message: t('routes.activity.total_amount_placeholder'), trigger: "blur" },
      ],
    })
    const form = ref<Record<string,any>>({
      invite_num: null,
      amount: null,
      total_amount:null,
    })
    const total = ref();
    const queryParams = ref({
      page_size: 10,
      page: 1,
    })
    const listData = ref([]);
    const getList = () => {
      // loading.value = true;
      treasureList(queryParams.value).then((res: any) => {
        queryParams.value.page===1 && (total.value = res.data.t);
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
      console.log(formEl);
      if (formEl.value) {
        await formEl.value.validate((valid:boolean, fields:any) => {
          if (valid) {
            form.value.invite_num = +form.value.invite_num;
            if(title.value === t('global.increment')){
                treasureInsert(form.value).then((res)=>{
                open.value = false;
                getList();
                successMsg(res.status,t('global.add_suc'));
              })
            }else{
              treasureUpdate(form.value).then((res)=>{
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
    onMounted(()=>{
      getList();
    })
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
</style>
