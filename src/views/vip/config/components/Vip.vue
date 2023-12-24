<template>
  <div class="vip-container">
    <el-button type="primary" @click="addVIP">{{ t('global.increment') }}</el-button>
    <p class="empty"></p>
    <el-dialog :title="title" v-model="dialogConfig" width="500px" @close="onClose" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto"
        :close-on-click-modal="false">
        <el-form-item :label="t('routes.vip_list_page.config.vip')" prop="vip">
          <el-input-number v-model="formData.vip" :placeholder="t('routes.tips.enter_number')" :min="0"
            controls-position="right" :style="{ width: '100%' }" :disabled="isDisabled"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="t('routes.vip_list_page.config.name_placeholder')" clearable
            :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.deposit_amount')" prop="deposit_amount">
          <el-input-number v-model="formData.deposit_amount"
            :placeholder="t('routes.vip_list_page.config.deposit_amount_placeholder')" controls-position="right" :min="0"
            :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.flow')" prop="flow">
          <el-input-number v-model="formData.flow" :placeholder="t('routes.vip_list_page.config.flow_placeholder')"
            controls-position="right" :min="0" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.keep_flow')" prop="keep_flow">
          <el-input-number v-model="formData.keep_flow" :placeholder="t('routes.vip_list_page.config.keep_flow_placeholder')"
            controls-position="right" :min="0" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.amount')" prop="amount">
          <el-input-number v-model="formData.amount" :placeholder="t('routes.vip_list_page.config.amount_placeholder')"
            controls-position="right" :min="0" :precision="2" :style="{ width: '100%' }"></el-input-number>
            <!-- <template #append>{{ t('routes.vip_list_page.config.score') }}</template> -->
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.free_withdraw_num')" prop="free_withdraw_num">
          <el-input-number v-model="formData.free_withdraw_num" :placeholder="t('routes.vip_list_page.config.free_withdraw_num_placeholder')"
            controls-position="right" :min="0" :precision="0" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.config.withdraw_limit')" prop="withdraw_limit">
          <el-input-number v-model="formData.withdraw_limit" :placeholder="t('routes.vip_list_page.config.withdraw_limit_placeholder')"
            controls-position="right" :min="0" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <!-- <el-form-item :label="t('routes.vip_list_page.config.rebate_rate')" prop="rebate_rate">
          <el-input-number v-model="formData.rebate_rate" :placeholder="t('routes.vip_list_page.config.rebate_rate_placeholder')"
            controls-position="right" :min="0" :max="100" :precision="2" :style="{ width: '100%' }"></el-input-number>
        </el-form-item> -->
        <el-form-item :label="t('routes.vip_list_page.config.props')" prop="props">
          <el-input-number v-model="formData.props" :placeholder="t('routes.vip_list_page.config.props_placeholder')"
            controls-position="right" :min="0" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="submitmBtn">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="vip" :label="t('routes.tips.level_membership')" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" :label="t('routes.agent.level_name')" sortable align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="flow" :label="t('routes.vip_list_page.config.flow')" align="center"
        min-width="140"> </el-table-column>
        <el-table-column prop="keep_flow" :label="t('routes.vip_list_page.config.keep_flow')" align="center"
        min-width="140"> </el-table-column>
        <el-table-column prop="deposit_amount" :label="t('routes.vip_list_page.config.deposit_amount')" align="center"
        min-width="140"> </el-table-column>
      <el-table-column prop="amount" :label="t('routes.vip_list_page.config.amount')" align="center">
      </el-table-column>
      <el-table-column prop="free_withdraw_num" :label="t('routes.vip_list_page.config.free_withdraw_num')"
        align="center">
      </el-table-column>
      <el-table-column prop="withdraw_limit" :label="t('routes.vip_list_page.config.withdraw_limit')" align="center">
      </el-table-column>
      <!-- <el-table-column prop="rebate_rate" :label="t('routes.vip_list_page.config.rebate_rate')" align="center">
      </el-table-column> -->
      <el-table-column prop="props" :label="t('routes.vip_list_page.config.props')" align="center">
      </el-table-column>
      <el-table-column prop="" :label="t('global.operating')" align="center" min-width="140">
        <template #default="scope">
          <el-button type="text" @click="editVIP(scope.row)">{{ t('global.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryForm.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryForm.page_size" @current-change="getList" @size-change="getList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'VipLevel',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const tableData = ref<any>([]);
    const formData = ref<any>({});
    const betData = ref();
    const VIPRef = ref<any>(null);
    const numBer = ref<number>();
    const elForm = ref<typeof ElForm | null>(null);
    const total = ref();
    const queryForm = ref({
      page_size:10,
      page:1,
    })
    const dialog = reactive({
      dialogConfig: false,
      title: '',
      isDisabled: true,
      useVipNum: '13',
      vipTitle: ''
    });
    getList();
    // 获取vip列表
    function getList() {
      APIs.vipconfig.vipList().then(res => {
        if (res.status) {
          tableData.value = [];
          if (res.data.d) {
            tableData.value = _.sortBy(res.data.d, ['level', 'asc']);
          }
        }
      });
    }
    const editVIP = (row: any) => {
      dialog.title = t('global.edit');
      dialog.isDisabled = true;
      formData.value ={...row,amount:+row.amount}
      dialog.dialogConfig = true;
    };
    const addVIP = () => {
      dialog.title = t('global.increment');
      dialog.isDisabled = false;
      dialog.dialogConfig = true;
    };
    const deleteVIP = (ids: string) => {
      ElMessageBox.confirm(t('global.deletemsg'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.vipconfig
          .vipDelete({
            id: ids
          })
          .then(res => {
            if (res.status) {
              getList();
              ElMessage.success({
                message: t('global.delete_suc'),
                type: 'success'
              });
              dialog.dialogConfig = false;
            }
          });
      });
    };
    // 新增 编辑vip
    function submitmBtn() {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            const LastForm = {
              ...formData.value,
              amount:String(formData.value.amount),
            }
            if (dialog.title === t('global.increment')) {
              APIs.vipconfig.vipInsert(LastForm).then(res => {
                if (res.status) {
                  getList();
                  ElMessage.success({
                    message: t('global.addsuc'),
                    type: 'success'
                  });
                  dialog.dialogConfig = false;
                }
              });
              return;
            }
            if (dialog.title === t('global.edit')) {
              APIs.vipconfig.vipUpdate(LastForm).then(res => {
                if (res.status) {
                  getList();
                  ElMessage.success({
                    message: t('global.editsuc'),
                    type: 'success'
                  });
                  dialog.dialogConfig = false;
                }
              });
              return;
            }
          } else {
            return false;
          }
        });
      }
    }
    const cancel = () => {
      if (elForm.value) {
        elForm.value.clearValidate();
      }
      dialog.dialogConfig = false;
    };
    const onClose = () => {
      formData.value = {};

      if (elForm.value) {
        elForm.value.clearValidate();
      }
    };
    const rules = reactive([]);
    return {
      tableData,
      submitmBtn,
      formData,
      deleteVIP,
      ...toRefs(dialog),
      betData,
      onClose,
      VIPRef,
      editVIP,
      addVIP,
      rules,
      elForm,
      cancel,
      queryForm,
      total,
      getList,
      t,
      numBer
    };
  }
});
</script>
<style lang="scss" scope>
.vip-container {
  padding: 1px 20px;
  padding-bottom: 50px;
  background: white;

  .empty {
    height: 20px;
  }

  a {
    text-decoration: none;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
