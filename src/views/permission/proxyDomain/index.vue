<template>
  <div class="app-container">
    <el-form label-width="auto" :model="queryParams" ref="elForms" size="small" :inline="true">
      <el-form-item :label="t('routes.domain.domain_url')">
        <el-input v-model="queryParams.domain_url" :placeholder="t('routes.domain.w_domain_url')"
          maxlength="24"></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.domain.uid')">
        <el-input v-model="queryParams.uid" :placeholder="t('routes.domain.w_uid')" maxlength="24"></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.domain.created_name')">
        <el-input v-model="queryParams.created_name" :placeholder="t('routes.domain.w_created_name')"
          maxlength="24"></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.domain.updated_name')">
        <el-input v-model="queryParams.updated_name" :placeholder="t('routes.domain.w_updated_name')"
          maxlength="24"></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.domain.state')">
        <el-select v-model="queryParams.state">
          <el-option v-for="(selectItem, selectIndex) in stateType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>

      </el-form-item>
      <el-form-item :label="t('routes.domain.ty')">
        <el-select v-model="queryParams.ty">
          <el-option v-for="(selectItem, selectIndex) in tyType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="getTenantAgencyList">{{ t('global.search') }}</el-button>
        <el-button icon="el-icon-refresh" @click="reset">{{ t('global.reset') }}</el-button>
        <el-button icon="el-icon-plus" type="success" @click="setDialogData(1)">{{ t('global.increment') }}</el-button>
        <el-button icon="el-icon-upload" type="primary" @click="dialogUpload = true">{{ t('routes.domain.import') }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data" style="width: 100%">
      <!-- <el-table-column fixed prop="sort" :label="t('global.sortabled')" width="150" /> -->
      <el-table-column prop="domain_url" :label="t('routes.domain.ex_domain_url')" width="200" />
      <el-table-column prop="uid" :label="t('routes.domain.uid')" width="160" />
      <el-table-column prop="ty" :label="t('routes.domain.ty')" width="80">
        <template #default="{ row }">
          <el-tag class="ml-2" v-if="row.ty === 1">H5</el-tag>
          <el-tag class="ml-2" v-else-if="row.ty === 2" type="success">PC</el-tag>
          <el-tag class="ml-2" v-else-if="row.ty === 3" type="warning">App</el-tag>
          <el-tag class="ml-2" v-else type="danger">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" :label="t('routes.domain.state')" width="100">
        <template #default="{ row }">
          <el-tag class="ml-2" v-if="row.state === 1" type="success">{{ t('routes.domain.enable') }}</el-tag>
          <el-tag class="ml-2" v-else type="danger">{{ t('routes.domain.notEnable') }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="t('routes.domain.remark')" width="250">
        <template #default="{ row }">
          {{ row.remark || '-' }}
        </template>
      </el-table-column>
      <el-table-column :label="t('routes.domain.created_name')" width="120">
        <template #default="{ row }">
          {{ row.created_name || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="created_time" :label="t('routes.domain.created_time')" width="180">
        <template #default="{ row }">
          <div>{{ $filters.format(row.created_at, false) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_name" :label="t('routes.domain.updated_name')" width="120">
        <template #default="{ row }">
          {{ row.updated_name || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_time" :label="t('routes.domain.updated_time')" width="180">
        <template #default="{ row }">
          <div>{{ $filters.format(row.updated_at, false) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="t('global.operating')">
        <template #default="{ row }">
          <el-button link type="primary" icon="el-icon-edit" size="small" @click="editDomain(row)">{{ t('global.edit')
          }}</el-button>
          <el-button link type="danger" icon="el-icon-delete" size="small" @click="deleteDomain(row.id)">{{
            t('global.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getTenantAgencyList"
      @size-change="getTenantAgencyList" />
  </div>
  <el-dialog :title="dialogtype === 1 ? t('routes.domain.created') : t('global.edit')" v-model="dialogState" width="500px"
    append-to-body @close="cancel">
    <el-form ref="dialogFormEl" :rules="rules" :model="domainParms" label-width="auto">
      <el-form-item :label="t('routes.domain.domain_url')" prop="domain_url" class="mt10">
        <el-input v-model="domainParms.domain_url" type :placeholder="t('routes.domain.w_domain_url')" />
      </el-form-item>
      <el-form-item :label="t('routes.domain.uid')" prop="uid" class="mt10">
        <el-select v-model="domainParms.uid" filterable @change="selectChange">
          <el-option v-for="(selectItem, selectIndex) in proxyInfoList" :key="selectIndex" :label="selectItem.username"
            :value="selectItem.uid"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('global.sortabled')" prop="seq" class="mt10">
        <el-input-number v-model="domainParms.seq" type="number" :placeholder="t('routes.domain.w_uid')" />
      </el-form-item>
      <el-form-item :label="t('routes.domain.ty')" prop="ty" class="mt10">
        <el-select v-model="domainParms.ty">
          <el-option v-for="(selectItem, selectIndex) in addtyType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('routes.domain.state')" prop="state">
        <el-select v-model="domainParms.state">
          <el-option v-for="(selectItem, selectIndex) in addstateType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('routes.domain.remark')">
        <el-input v-model="domainParms.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">{{ t('global.submit') }}</el-button>
      <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="dialogUpload" width="500px" class="hidden-b" append-to-body :show-close="false">
    <template #title="{ close, titleId, titleClass }">
      <div class="d-header flex">
        <h4 :id="titleId" :class="titleClass">{{ t("global.import_more") }}</h4>
        <el-button type="primary" @click="downloadTemplate">{{ t('routes.tips.download_template') }}</el-button>
      </div>
    </template>
    <div class="d-body">
      <div class="item">
        <el-button type="primary" @click="openUpload">{{ t('routes.tips.upload_file') }}</el-button>
      </div>
      <div class="item tips flex">
       <!-- style="color: #d8b785;width:44px;" -->
       <div class="text-40">
         <el-icon style="color: #d8b785;" class="el-icon-warning"></el-icon>
       </div>
        <div>
          <div>{{ t("routes.domain.tips1",{count:filecount}) }}</div>
          <div>{{ t("routes.domain.tips2") }}</div>
        </div>
      </div>
    </div>
    <div class="d-footer flex">
      <el-button @click="dialogUpload = false">{{ t('global.cancel') }}</el-button>
      <el-button type="primary" :disabled="filecount < 1" @click="UploadServer">{{ t('routes.domain.upload') }}</el-button>
    </div>
    <input class="hidden" accept=".xlsx" type="file" ref="ufile" @change="importDomain">
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { tenantAgencyList, agencyInsert, agencyUpdate, agencyDelete, agencyImport } from '@/http/modules/permission';
import { getMemberList } from '@/http/modules/viplist'
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElForm } from 'element-plus'
const { t } = useI18n({ useScope: 'global' });
interface domainItemType {
  domain_url: string;
  uid: string | undefined;
  username?: string;
  state: number;
  ty: number | undefined;
  seq: number | undefined;
  created_at?: number;
  created_name?: string;
  updated_name?: string;
  remark: string;
}
interface proxyInfo {
  uid: string,
  username: string
}
const tytypes = [
  {
    label: t('global.checkall'),
    value: 0,
  },
  {
    label: "H5",
    value: 1,
  },
  {
    label: "PC",
    value: 2,
  },
  {
    label: "App",
    value: 3,
  },
]
const statetypes = [
  {
    label: t('global.checkall'),
    value: 0,
  },
  {
    label: t('routes.domain.enable'),
    value: 1,
  },
  {
    label: t('routes.domain.notEnable'),
    value: 2,
  },
]
const stateType = ref([...statetypes])
const tyType = ref([...tytypes])
const addtyType = ref([...tytypes.filter(item => item.value !== 0)])
const addstateType = ref([...statetypes.filter(item => item.value !== 0)])
const queryData = {
  domain_url: "",
  uid: null,
  username: "",
  state: 0,
  ty: 0,
  created_name: "",
  updated_name: "",
  page: 1,
  page_size: 10,
}
const domainItem = {
  domain_url: "",
  uid: undefined,
  username: "",
  state: 1,
  ty: undefined,
  seq: undefined,
  created_at: 0,
  created_name: "",
  updated_name: "",
  remark: ""
}

const queryParams = ref({ ...queryData })
const data = ref([])
const total = ref(0)
const getTenantAgencyList = async () => {
  let res = await tenantAgencyList(queryParams.value)
  data.value = res.data?.d
  total.value = res.data?.t
  console.log(total.value);
}

const reset = () => {
  queryParams.value = { ...queryData }
}
//上传文件
const dialogUpload = ref(false)
const ufile = ref<HTMLInputElement>()
const filecount = ref(0)
const downloadTemplate = () => {
  let a = document.createElement("a")
  a.href = 'https://brazil-banner-test.s3.ap-east-1.amazonaws.com/template/domain-template.xlsx'
  a.click()
  a.remove()
}
const openUpload = () => {
  if (ufile.value) {
    ufile.value.click()
  }
}
const importDomain =  (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    filecount.value = files.length
  }
}
const UploadServer = async ()=>{
  if (ufile.value) {
    const file = ufile.value.files![0]
    filecount.value = ufile.value.files!.length || 0
    let data = new FormData();
    data.append("file", file)
    let res = await agencyImport(data)
    if (res.status) {
      ElMessage.success({
        message: t('global.upload_s'),
        type: 'success'
      });
      cancel()
      getTenantAgencyList()
    }
  }
  dialogUpload.value = false
} 
//删除域名
const deleteDomain = (id: string) => {
  ElMessageBox.confirm(t('global.deletemsg'), t('global.warning'), {
    confirmButtonText: t('global.sure'),
    cancelButtonText: t('global.cancel'),
    type: 'warning'
  }).then(async () => {
    let res = await agencyDelete({ id })
    if (res.status) {
      ElMessage.success({
        message: t('global.deletesuc'),
        type: 'success'
      });
      cancel()
      getTenantAgencyList()
    }
  }).catch(() => { });
}

// 添加 | 编辑
const domainParms = ref<domainItemType>({ ...domainItem })
const dialogtype = ref<1 | 2>(1)
const dialogState = ref(false)
const dialogFormEl = ref<typeof ElForm>()
const proxyInfoList = ref<proxyInfo[]>()
const rules = ref<typeof ElForm['rules']>({
  domain_url: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  uid: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  state: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  ty: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  seq: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
})

const setDialogData = async (type: 1 | 2) => {
  await MemberList()
  dialogtype.value = type
  dialogState.value = true
}
const cancel = () => {
  dialogState.value = false
  domainParms.value = { ...domainItem }
}
const editDomain = (row: domainItemType) => {
  domainParms.value = { ...row }
  setDialogData(2)
}


const MemberList = async () => {
  let res = await getMemberList({ tester: "3", page: 1, page_size: 2999 })
  console.log(res);
  if (res.status) {
    let arr = res.data.d
    let result: proxyInfo[] = []
    if (arr instanceof Array) {
      arr.map(item => {
        result.push({ uid: item.uid, username: item.username })
      })
    }
    proxyInfoList.value = result
  }
}
const selectChange = (uid: string) => {
  domainParms.value.username = proxyInfoList.value?.find(info => info.uid == uid)?.username
}

const submit = async () => {
  if (!domainParms.value.domain_url ||
    !domainParms.value.state ||
    !domainParms.value.ty ||
    !domainParms.value.uid ||
    !domainParms.value.seq
  ) {
    return ElMessage.error({
      message: t(`routes.operation_manage_page.please_data`),
      type: "error"
    });
  }
  let res
  let message = ''
  if (dialogtype.value === 1) {
    res = await agencyInsert(domainParms.value)
    message = t('global.savesuc')
  } else {
    res = await agencyUpdate(domainParms.value)
    message = t('global.editsuc')
  }
  if (res.status) {
    ElMessage.success({
      message,
      type: 'success'
    });
    cancel()
    getTenantAgencyList()
  }
}
onMounted(() => {
  getTenantAgencyList()
})
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
.d-header {
  justify-content: space-between;
  align-items: center;
}
.d-body{
  height: 100px;
  padding-left: 16px;
  padding-right: 16px;
}

.d-footer{
  justify-content: flex-end;
}
.text-40{
  font-size: 26px;
  padding:0 12px;
}
.tips{
  padding: 8px 0;
}
</style>
