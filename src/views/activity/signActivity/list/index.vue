<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item :label="t(`routes.activity.vip`)" prop="vip">
        <el-select v-model="queryParams.vip" :placeholder="t('routes.activity.vip_placeholder')" clearable>
          <el-option v-for="item in vipOptions" :key="item.vip" :label="item.name" :value="item.vip" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{t('global.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form>

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
      <el-table-column :label="t(`routes.activity.vip`)" align="center" prop="vip" />
      <el-table-column :label="t(`routes.activity.day${item}`)" align="center" :prop="`sign${item}_amount`"  v-for="item in 7" :key="item"/>
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
      <el-form ref="formEl" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="t('routes.activity.vip')" prop="vip">
          <el-select v-model="form.vip" :placeholder="t('routes.activity.vip_placeholder')" clearable>
            <el-option v-for="item in vipOptions" :key="item.vip" :label="item.name" :value="item.vip" />
          </el-select>
        </el-form-item>
        <el-row direction="vertical" alignment="start" :size="30" class="dayCard">
          <el-col :span="12" :gutter="20" v-for="item in 7" :key="item">
            <el-form-item :label="t(`routes.activity.day${item}`)" :prop="`sign${item}_amount`">
              <el-input v-model="(form[`sign${item}_amount`  as keyof typeof form])" :placeholder="t(`routes.activity.day${item}`) + t(`routes.activity.day_placeholder`)" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="备注" prop="remark" class="mt10">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{t('global.submit')}}</el-button>
        <el-button @click="cancel">{{t('global.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import  { ElForm,ElMessage } from 'element-plus'
import { signInsert, signList, signUpdate } from '@/http/modules/activity'
import { empty } from '@/components/serch-form/empty';
import { APIs } from '@/http';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signActivityList',
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
    const vipOptions = ref();
    // 表单校验
    const rules = reactive<FormInstance['rules']>({
      vip: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign1_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign2_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign3_amount: [
        { required: true,message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign4_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign5_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign6_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
      sign7_amount: [
        { required: true, message: t('global.validationMsg'), trigger: "blur" },
      ],
    })
    const form = ref<Record<string,any>>({
      vip: null,
      sign1_amount: null,
      sign2_amount: null,
      sign3_amount: null,
      sign4_amount: null,
      sign5_amount: null,
      sign6_amount: null,
      sign7_amount: null,
    })
    const total = ref();
    const queryParams = ref({
      page: 1,
      page_size: 10,
      vip: '',
    })
    const listData = ref([]);
    const getList = () => {
      // loading.value = true;
      signList({ ...empty.preProcessData(queryParams.value), ty: '1' }).then((res: any) => {
        if(queryParams.value.page===1){
          total.value = res.data.t;
        }
        listData.value = res.data.d
      }).finally(() => {
        // loading.value = false;
      })
    }
    const reset = () => {
      if (formEl.value) {
        formEl.value.resetFields();
      }
    }
    const successMsg = (state:any,msg:string)=>{
        if (state === true) {
            ElMessage({
              type: 'success',
              message: msg,
            })
          }
    }
    const handleDelete = (row: any) => {
      console.log(row);
    }
    const submitForm = async () => {
      console.log(formEl);
      if (formEl.value) {
        await formEl.value.validate((valid:boolean, fields:any) => {
          if (valid) {
            if(title.value === t('global.increment')){
                signInsert(form.value).then((res)=>{
                open.value = false;
                getList();
                successMsg(res.status,t('global.add_suc'));
              })
            }else{
              signUpdate(form.value).then((res)=>{
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
      form.value = {}
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
    APIs.vipconfig.vipList().then(res => {
      if (res.status) {
        vipOptions.value = [];
        if (res.data.d) {
          vipOptions.value = _.sortBy(res.data.d, ['level', 'asc']);
        }
      }
    });
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
      vipOptions,
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
