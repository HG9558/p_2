<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="flex justify-between">
          <el-form inline>
            <el-form-item it label="渠道id">
              <el-input type="number" placeholder="请输入渠道id" v-model="queryParams.cid"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini"
                @click="querypPayeeList">{{ t('global.search') }}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="dialogVisible = true">创建订单</el-button>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="dialogPs = true">设置密码</el-button>
          </div>
        </div>
      </div>
    </template>
    <div class="contaner">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" align="center" label="订单号" width="120" />
        <el-table-column prop="oid" align="center" label="三方订单号" width="160" />
        <el-table-column prop="uid" align="center" label="用户ID" />
        <el-table-column prop="username" align="center" label="用户名" />
        <el-table-column prop="cid" align="center" label="渠道ID" />
        <el-table-column prop="cname" align="center" label="渠道名称" />
        <el-table-column prop="fid" align="center" label="通道ID" />
        <el-table-column prop="fname" align="center" label="通道名称" />
        <el-table-column prop="amount" align="center" label="打款金额" />
        <el-table-column prop="state" align="center" label="订单状态" width="120">
          <template #default="{ row }">
            <el-tag class="ml-2" :type="row.state == 374 ? 'success' : 'danger'">{{ 
            row.state === 374 ?  t(`global.T0025_LIST[${row.state}]`) :t(`global.T0025_LIST[375]`) 
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pix_account" align="center" label="PIX账号" />
        <el-table-column prop="pix_id" align="center" label="PIXID" />
        <el-table-column prop="real_name" align="center" label="姓名" />
        <el-table-column prop="craeted_at" align="center" :label="t('global.creat_time')">
          <template #default="{ row }">
            {{ $filters.format(row.created_at, false) }}
          </template>
        </el-table-column>
        <el-table-column prop="flag" align="center" label="账户类型">
          <template #default="{ row }">
            {{ findType(row.flag) }}
          </template>
        </el-table-column>
        <el-table-column prop="level" align="center" label="会员等级" width="70" />
        <el-table-column prop="blogger" align="center" label="转账" width="80">
          <template #default="{ row }">
            <el-tag class="ml-2" v-if="row.blogger == 1">非博主转账</el-tag>
            <el-tag class="ml-2" v-else-if="row.blogger == 2" type="success">博主转账</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :total="total" v-model:current-page="queryParams.page" hide-on-single-page
        v-model:page-size="queryParams.page_size" @current-change="querypPayeeList" @size-change="querypPayeeList" />
    </div>
    <el-dialog v-model="dialogVisible" title="创建打款订单" width="500px">
      <el-form size="medium" ref="payform" :model="formData" :rules="rules" label-width="auto" @submit.native.prevent>
        <el-form-item label="代理用户ID" prop="uid">
          <el-input style="width: 320px;" v-model="formData.uid" type="number"
            :placeholder="t('routes.activity.userId_placeholder')"></el-input>
        </el-form-item>
        <el-form-item label="打款金额" prop="amount">
          <el-input style="width: 320px;" v-model="formData.amount" type="number"
            :placeholder="t('routes.site_page.pz_name_tips')"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input style="width: 320px;" v-model="formData.realName" type="text" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="CPF" prop="pixId">
          <el-input style="width: 320px;" v-model="formData.pixId" placeholder="输入CPF"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="flag">
          <el-select v-model="formData.flag">
            <el-option v-for="cItem in types" :key="cItem.value" :label="cItem.key" :value="cItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户" prop="pixAccount">
          <el-input style="width: 320px;" v-model="formData.pixAccount" placeholder="输入账户"></el-input>
        </el-form-item>
        <el-form-item label="打款备注" prop="remark">
          <el-input style="width: 320px;" v-model="formData.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="出款密码" prop="password">
          <el-input v-model="formData.password" placeholder="输入出款密码" style="width: 320px;" type="password" show-password clearable> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">{{ t('global.submit') }}</el-button>
        <el-button @click="init()">{{ t('global.cancel') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="dialogPs" title="设置密码" width="500px">
      <el-form size="medium" ref="passwordRef" :model="setData" :rules="rules1" label-width="auto" @submit.native.prevent>
        <el-form-item label="出款密码" prop="password">
          <el-input v-model="setData.password" style="width: 320px;" type="password" show-password clearable> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">{{ t('global.submit') }}</el-button>
        <el-button @click="dialogPs = false">{{ t('global.cancel') }}</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { withdrawPayee, queryWithdrawPayeeList, setWithdrawPayeePassword } from '@/http/modules/fin'
import { useWithdrawalStatus, } from '@/utils/getJson';
const { t } = useI18n({ useScope: 'global' });
const initData = {
  uid: "",
  amount: "",
  realName: "",
  pixAccount: "",
  pixId: "",
  flag: '1',
  remark: "",
  password:""
}
const { WithdrawalToText } = useWithdrawalStatus();
const queryParams = ref({
  page: 1,
  page_size: 10,
  cid: ""
})
const tableData = ref([])
const total = ref(0)
const querypPayeeList = async () => {
  let res = await queryWithdrawPayeeList({ ...queryParams.value })
  if (res.status) {
    tableData.value = res.data.d || []
    if(queryParams.value.page === 1 ){
      total.value = res.data.t
    }
  }
}
const formData = ref({ ...initData })
const payform = ref<typeof ElForm>()
const types = ref([
  { key: "CPF", value: "1" },
  { key: "phone", value: "2" },
  { key: "email", value: "3" }
])
const dialogVisible = ref(false)
const rules = {
  uid: [
    {
      required: true,
      message: "请输入用户ID",
      trigger: 'blur'
    },
  ],
  amount: [
    {
      required: true,
      message: "请输入金额",
      trigger: 'blur'
    },
  ],
  realName: [
    {
      required: true,
      message: "请输入姓名",
      trigger: 'blur'
    },
  ],
  pixAccount: [
    {
      required: true,
      message: "请输入账户",
      trigger: 'blur'
    },
  ],
  pixId: [
    {
      required: true,
      message: "请输入CPF",
      trigger: 'blur'
    },
  ],
  remark: [
    {
      required: true,
      message: "请输入打款备注",
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: "请输入用户密码",
      trigger: 'blur'
    },
  ],
}


const findType = (flag: string) => {
  return types.value.find(item => item.value == flag)?.key
}
const init = () => {
  formData.value = { ...initData }
  dialogVisible.value = false
}
const confirm = () => {
  if (payform.value) {
      payform.value.validate((valid: boolean) => {
        if (valid) {
          ElMessageBox.confirm("请确认提现账户正确？否则会损失金额。", t('global.warning'), {
            confirmButtonText: t('global.sure'),
            cancelButtonText: t('global.cancel'),
            type: 'warning'
          })
            .then(async () => {
              let res = await withdrawPayee(formData.value)
              if (res.status) {
                ElMessage.success("出款成功");
                init()
                querypPayeeList()
              }

            })
            .catch(() => { });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  }
}



const dialogPs = ref(false)
const setData= ref({password:""})
const passwordRef = ref<typeof ElForm>()
const rules1 = {
  password: rules.password
}
const submit =  ()=> {
  if(passwordRef.value){
    passwordRef.value.validate((valid: boolean) => {
        if (valid) {
          ElMessageBox.confirm("一经设置不可修改，请牢记！！！", t('global.warning'), {
            confirmButtonText: t('global.sure'),
            cancelButtonText: t('global.cancel'),
            type: 'warning'
          })
            .then(async () => {
              let res = await setWithdrawPayeePassword(setData.value)
              if(res.status){
                ElMessage.success(t("global.set_suc"))
              } 
              dialogPs.value = false  
            })
            .catch(() => { });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  }
}
onMounted(() => {
  querypPayeeList()
})
</script>
<style scoped lang="scss">
.justify-between{
  justify-content: space-between;
}
</style>