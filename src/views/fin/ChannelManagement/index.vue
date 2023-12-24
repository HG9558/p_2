<script lang='ts'>
import { APIs } from '@/http';
import { ref, reactive, defineComponent, unref } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElMessage,ElForm, ElMessageBox, } from 'element-plus';
import { type Form} from 'element-plus'
import Pagination from '@/components/pagination/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';

export default defineComponent({
  name: 'ChannelManagement',
  components: {
    Pagination,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<any>({});

    const tableData = ref([])
    const getTableData = () => {
      APIs.fin.getTenantFactoryList({ ...unref(pageQuery.value) }).then((res) => {
        console.log('getTenantFactoryList', res);
        if (res.status) {
          if (pageQuery.value.page.toString() === '1') {
            total.value = res.data.t;
          }

          tableData.value = res.data.d
        }
      })
    }
    getTableData()

    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getTableData
    });

    const elForm = ref();
    const rules = {
      fmax: [{
        required: true,
        message: ''
      }],
      fmin: [{ required: true }],
      show_name: [{ required: true }],
      // amount_list: [{ required: true }],
      state: [{ required: true }],
      pay_rate: [{ required: true }],
      automatic:[{require:true},{ pattern:/^[0-9]*$|^0$/,message:t('routes.vip_list_page.config.vip_placeholder') }]
    }
    const formData = reactive<any>({
      id: '',
      name: '',
      fmax: '',
      fmin: '',
      amount_list: '',
      show_name: '',
      pay_rate:'',
      state: '',
      key:'',
      app_key:'',
    })
    const dialogVisable = ref(false)
    const openEditDialog = (item: any) => {
      console.log("🔰🔰🔰 ~ file: index.vue:19 ~ openEditDialog ~ item:", item)
      formData.id = item.fid
      formData.name = item.name
      formData.fmax = item.fmax
      formData.fmin = item.fmin
      formData.amount_list = item.amount_list
      formData.show_name = item.show_name
      formData.state = item.state
      formData.key = item.key||'',
      formData.pay_rate = item.pay_rate+''||'',
      formData.app_key = item.app_key||''
      formData.automatic = item.automatic+''||'0',
      dialogVisable.value = true
    }
    const submit = () => {
      elForm.value.validate((valid: boolean) => {
        if (valid) {
          APIs.fin.editTenantFactoryList({
            ...formData
          }).then((res) => {
            if (res.status) {
              ElMessage.success({
                message: t('global.editsuc'),
                type: 'success'
              });
              getTableData()
              dialogVisable.value = false
            }
          }).catch((err) => { console.error(err); })
        }
      })
    }
    
    const editPayType =  (fid:string)=>{
      ElMessageBox.confirm("确认修改吗？", t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      })
        .then(async () => {
         let res = await APIs.fin.updateDesignPay({fid})
         if (res.status) {
              ElMessage.success(t('global.update_suc'));
              getTableData()
            }
         
        })
        .catch(() => { });
    }

    return {
      t,
      tableData,
      elForm,
      rules,
      formData,
      dialogVisable,
      openEditDialog,
      submit,
      total,
      pageQuery,
      pagination,
      editPayType
    }
  }
})
</script>
<template>
  <div class='ChannelManagement'>
    <vxe-table border resizable highlight-hover-row :sort-config="{ trigger: 'cell' }" :data="tableData"
      :scroll-y="{ enabled: false }" highlight-current-row>
      <vxe-table-column align="center" :title="t('global.sort')" type="seq" width="70" />
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.tname')" field="name" />
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.limit')">
        <template #default="{ row }">
          {{ t('routes.finance_manage_page.max') }}: {{ row.fmax }}<br />
          {{ t('routes.finance_manage_page.min') }}: {{ row.fmin }}
        </template>
      </vxe-table-column>
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.amountList')" field="amount_list" />
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.showName')" field="show_name" />
      <vxe-table-column align="center" :title="t('global.type')" field="flags" >
        <template #default="{ row }">
          {{ row.flags == 1 ? t('routes.finance_manage_page.Recharge') : t('global.TOO2_lIST.156') }}
        </template>
      </vxe-table-column>
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.automatic')" field="automatic" />
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.designPay')" field="design_pay" >
        <template #default="{ row }">
          {{ row.design_pay == 0 ? t('global.no') : t('global.yes') }}
        </template>
      </vxe-table-column>
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.status')" field="state">
        <template #default="{ row }">
          {{ row.state === '1' ? t('routes.finance_manage_page.open') : t('routes.finance_manage_page.close') }}
        </template>
      </vxe-table-column>
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.rate')" field="pay_rate" />
      <vxe-table-column align="center" :title="t('routes.finance_manage_page.operating')">
        <template #default="{ row }">
          <el-button type="primary" @click="openEditDialog(row)">{{ t('routes.finance_manage_page.edit')
          }}</el-button>
          <div class="mt-8" v-if="row.flags == 2">
            <el-button type="warning" @click="editPayType(row.fid)">{{ t('routes.finance_manage_page.designPay')
          }}</el-button>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
      v-model:limit="pageQuery.page_size" />

    <el-dialog :title="t('routes.finance_manage_page.edit')" v-model="dialogVisable" :width="550"
      :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" label-width="auto">
        <el-form-item :label="t('routes.finance_manage_page.tname')">
          <el-input disabled v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.max')" prop="fmax">
          <el-input v-model="formData.fmax"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.min')" prop="fmin">
          <el-input v-model="formData.fmin"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.amountList')" prop="amount_list">
          <el-input v-model="formData.amount_list"
            :placeholder="t('routes.finance_manage_page.fixedamount.tip1')"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.showName')" prop="show_name">
          <el-input v-model="formData.show_name"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.rate')" prop="pay_rate">
          <el-input v-model="formData.pay_rate"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.automatic')" prop="automatic">
          <el-input v-model="formData.automatic"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.status')" prop="state">
          <el-switch v-model="formData.state" active-value="1" inactive-value="2" />
        </el-form-item>
        <el-form-item label="key" prop="key">
          <el-input v-model="formData.key" type="password"></el-input>
        </el-form-item>
        <el-form-item label="app_key" prop="app_key">
          <el-input v-model="formData.app_key" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button type="primary" @click="submit">{{ t('global.submit')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped>
.mt-8{
  margin-top: 8px;
}
</style>
