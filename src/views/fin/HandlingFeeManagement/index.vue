<template>
  <div class="app-container">
    <div class="h-wrap">
      <el-button icon="el-icon-search" type="primary" @click="getRateList">{{ t('global.search') }}</el-button>
    </div>
    <!-- <el-form label-width="auto" size="small" :inline="true">
      <el-form-item>
     
      </el-form-item>
    </el-form> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="120" />
      <el-table-column prop="rate" :label="t('routes.finance_manage_page.Rate')" width="160">
        <template #default="{ row }">
          {{ row.rate }}%
        </template>
      </el-table-column>
      <el-table-column prop="ty" :label="t('global.type')" width="160">
        <template #default="{ row }">
          <el-tag class="ml-2" v-if="row.ty === 0">{{ t('routes.finance_manage_page.Recharge') }}</el-tag>
          <el-tag class="ml-2" v-else-if="row.ty === 1" type="success">{{ t('routes.finance_manage_page.Issued')
          }}</el-tag>
          <el-tag class="ml-2" v-else type="danger">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="min" :label="t('routes.finance_manage_page.Mincharge')" width="100">
        <template #default="{ row }">
          {{ row.min }}
        </template>
      </el-table-column>
      <el-table-column prop="max" :label="t('routes.finance_manage_page.Maxcharge')" width="100">
        <template #default="{ row }">
          {{ row.max }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" :label="t('routes.finance_manage_page.modify_time')" width="200">
        <template #default="{ row }">
          <div>{{ $filters.format(row.updated_at, false) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_name" :label="t('routes.finance_manage_page.modify_person')" width="160">
        <template #default="{ row }">
          {{ row.updated_name || '-' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="t('global.operating')">
        <template #default="{ row }">
          <el-button link type="primary" icon="el-icon-edit" size="small" @click="edit(row)">{{ t('global.edit')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  <el-pagination :total="total" v-model:current-page="queryParams.page" hide-on-single-page
      v-model:page-size="queryParams.page_size" @current-change="getTenantAgencyList"
      @size-change="getTenantAgencyList" /> -->
  </div>
  <el-dialog :title="t('global.edit')" v-model="dialogState" width="500px" append-to-body @close="cancel">
    <el-form ref="dialogFormEl" :rules="rules" :model="editInfo" size="small" label-width="auto">
      <el-form-item :label="t('routes.finance_manage_page.Rate')" prop="rate" class="mt10">
        <el-input v-model.number="editInfo.rate" class="w-50" type="number" placeholder="Please input">
          <template #append>%</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="t('routes.finance_manage_page.Mincharge')" prop="min" class="mt10">
        <el-input-number v-model="editInfo.min" type="number" />
      </el-form-item>
      <el-form-item :label="t('routes.finance_manage_page.Maxcharge')" prop="max" class="mt10">
        <el-input-number v-model="editInfo.max" type="number" />
      </el-form-item>
      <el-form-item :label="t('global.type')" prop="ty" class="mt10">
        <el-select v-model="editInfo.ty">
          <el-option v-for="(selectItem, selectIndex) in rateTypes" :key="selectIndex" :label="selectItem.key"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">{{ t('global.submit') }}</el-button>
      <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { rateList, rateUpdate } from '@/http/modules/rate';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElForm } from 'element-plus'
const { t } = useI18n({ useScope: 'global' });
interface Rateinfo {
  id: number;
  max: number;
  min: number;
  rate: number;
  ty: number;
  updated_at?: number;
  updated_name?: string;
}
const tableData = ref<Rateinfo[]>([])
const getRateList = async () => {
  let res = await rateList({})
  if (res.status) {
    tableData.value = res.data?.d
  }
}


const rules = ref<typeof ElForm['rules']>({
  max: [
    { required: true, message: t("global.enter"), trigger: 'blur' },
  ],
  min: [
    { required: true, message: t("global.enter"), trigger: 'blur' },
  ],
  rate: [
    { required: true, message: t("global.enter"), trigger: 'blur' },
  ],
  ty: [
    { required: true, message: t("global.enter"), trigger: 'blur' },
  ],
})
const dialogState = ref(false)
const editInfo = ref<Rateinfo>(
  {
    id: 0,
    max: 0,
    min: 0,
    rate: 0,
    ty: 0,
    updated_at: 0,
    updated_name: "",
  }
)
const rateTypes = ref([
  {
    key: t('routes.finance_manage_page.Recharge'),
    value: 0,
  },
  {
    key: t('routes.finance_manage_page.Issued'),
    value: 1,
  },
])
const cancel = () => {
  dialogState.value = false
}
const edit = (info: Rateinfo) => {
  editInfo.value = info
  dialogState.value = true
}
const submit = async () => {
  let params = { ...editInfo.value }
  // if (!params.max ||
  //   !params.min ||
  //   !params.rate 
  // ) {
  //   return ElMessage.error({
  //     message: t(`routes.operation_manage_page.please_data`),
  //     type: "error"
  //   });
  // }
  delete params.updated_at
  delete params.updated_name
  let res = await rateUpdate(params)
  if (res.status) {
    ElMessage.success({
      message: t('global.editsuc'),
      type: 'success'
    });
    cancel()
  }
}

onMounted(() => {
  getRateList()
})

</script>
  
<style lang="scss" scoped>
.h-wrap {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
}
.w-50 {
  width: 130px;
}
</style>
  