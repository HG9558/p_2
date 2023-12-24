<template>
    <div class="app-container">
      <!-- 表单部分 -->
      <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
        <!-- <el-form-item label="vip" prop="vip">
          <el-input v-model="queryParams.vip" placeholder="请输入菜单名称" clearable @keyup.enter.native="handleQuery" />
        </el-form-item> -->
        <el-form-item :label="t('routes.activity.username')" prop="username">
          <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable
            @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input v-model="queryParams.uid" :placeholder="t('routes.activity.userId_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ t('global.search')
          }}</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb10">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">{{ t('global.increment')
          }}</el-button>
        </el-col>
      </el-row>
  
      <el-table :data="listData">
        <el-table-column :label="t('routes.activity.userId')" align="center" prop="uid" />
        <el-table-column :label="t('routes.vip_list_page.bank.username')" align="username" prop="username" />
        <el-table-column :label="t('routes.vip_list_page.bank.pix_id')" align="center" prop="pix_id" />
        <el-table-column :label="t('global.type')" align="center" prop="flag">
          <template #default="{ row }">
            <div>
              {{ flagToText(row.flag) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="银行CPF" align="center" prop="pix_account" />
        <el-table-column :label="t('global.user')" align="center">
          <template #default="{ row }">
            <div>
              {{ row.real_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('global.state')" align="center" prop="state">
          <template #default="{ row }">{{ row.state == 1 ? t('global.enable') : t('global.stop') }}</template>
        </el-table-column>>
        <!-- <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ t('global.edit')
            }}</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
        v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />
  
      <!-- 添加或修改菜单权限对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body @close="cancel">
        <el-form ref="formEl" :model="form" :rules="rules" label-width="auto">
          <el-form-item :label="t('routes.vip_list_page.bank.pix_id')" prop="pix_id" class="mt10">
            <el-input v-model="form.pix_id" :placeholder="t('routes.vip_list_page.bank.pix_id_tips')" class="nbInput" />
          </el-form-item>
          <el-form-item :label="t('routes.vip_list_page.bank.username')" prop="username" class="mt10">
            <el-input v-model="form.username" :placeholder="t('routes.activity.username_placeholder')" class="nbInput" />
          </el-form-item>
          <el-form-item :label="t('routes.vip_list_page.bank.bankname')" prop="bankcode"
            :placeholder="t('global.please_choose')">
            <el-select v-model="form.bankcode">
              <el-option v-for="item in bankTypeOptions" :key="item.bankcode" :label="item.bankname"
                :value="item.bankcode"></el-option>
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
  import type { ElForm } from 'element-plus'
  import dayjs from 'dayjs';
  import { getBankList, insertBank, getBankType } from '@/http/modules/bank'
  type FormInstance = typeof ElForm
  export default defineComponent({
    name: 'bankList',
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
      const bankTypeOptions = ref<any[]>([])
      // 表单校验
      const rules = reactive<FormInstance['rules']>({
        bankcode: [
          { required: true, message: t('global.please_choose'), trigger: "blur" },
        ],
        username: [
          { required: true, message: t('routes.activity.username_placeholder'), trigger: "blur" },
        ],
        pix_id: [
          { required: true, message: t('routes.vip_list_page.bank.pix_id_tips'), trigger: "blur" }
        ],
      })
      const form = ref<Record<string, any>>({
        id: ''
      })
      const total = ref();
      const queryParams = ref({
        page_size: 10,
        page: 1,
        uid:"",
        username:"",
      })
      const listData = ref([]);
      const getList = () => {
        // loading.value = true;
        getBankList(queryParams.value).then((res: any) => {
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
                insertBank(form.value).then((res) => {
                  open.value = false;
                  getList();
                })
              } else {
                insertBank(form.value).then((res) => {
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
      getList()
  
      getBankType({ page: 1, page_size: 1000 }).then((res: any) => {
        bankTypeOptions.value = res?.data?.d
      })
      const getBankTypeForCol = (code: string) => {
        return bankTypeOptions.value.find(a => a.bankcode === code)?.bankname ?? '-'
      }
  
      /**
       * flag转文字
       * @param flag //1 CPF 2 PHONE 3 EMAIL
       */
      const flagToText = (flag: number) => {
        switch (flag) {
          case 1:
            return 'CPF'
          case 2:
            return 'PHONE'
          case 3:
            return 'EMAIL'
          default:
            return '-'
        }
      }
  
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
        flagToText,
        title,
        formEl,
        queryFormEl,
        t, getList,
        handleDelete, submitForm, resetQuery, handleUpdate, handleAdd, handleQuery, bankTypeOptions,
        cancel, dayjs,
        getBankTypeForCol
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
  
  .nbInput {
    width: 230px;
  }
  </style>
  
