<template>
  <div class="turnover-container">
    <p class="empty"></p>
    <el-dialog :title="title" v-model="dialogConfig" width="500px" @close="onClose" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto"
        :close-on-click-modal="false">
        <el-form-item :label="t('routes.site_page.set_name')" prop="name">
          <el-input v-model="formData.name" :placeholder="t('routes.site_page.pz_name_tips')" clearable :disabled="isDisabled"
            :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.agent.scfx')+'(R$)'" prop="rate_amount" v-show="formData.code==='invite'">
          <el-input-number v-model="formData.rate_amount" :placeholder="t('routes.tips.enter_number')" :min="0"  :precision="2"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.agent.lvl_one_rebate')+'(1‱)'" prop="lvl_one_rebate">
          <el-input-number v-model="formData.lvl_one_rebate" :placeholder="t('routes.tips.enter_number')" :min="0" :max="100" :precision="2"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.agent.lvl_two_rebate')+'(1‱)'" prop="lvl_two_rebate">
          <el-input-number v-model="formData.lvl_two_rebate" :placeholder="t('routes.tips.enter_number')" :min="0" :max="100" :precision="2"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item :label="t('routes.agent.lvl_three_rebate')+'(1‱)'" prop="lvl_three_rebate">
          <el-input-number v-model="formData.lvl_three_rebate" :placeholder="t('routes.tips.enter_number')" :min="0" :max="100" :precision="2"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item v-if="channelType" :label="t('routes.agent.startWithdraw')" prop="recharge_num_withdraw">
          <el-input-number v-model="formData.recharge_num_withdraw" :placeholder="t('routes.tips.enter_number')" :min="0"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item v-if="channelType" :label="t('routes.agent.withdrawCount')" prop="day_withdraw_num">
          <el-input-number v-model="formData.day_withdraw_num" :placeholder="t('routes.tips.enter_number')" :min="0" 
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
        <el-form-item v-if="channelType" :label="t('routes.agent.singleAmount')" prop="single_limit">
          <el-input-number v-model="formData.single_limit" :placeholder="t('routes.tips.enter_number')" :min="0"  :precision="2"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
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
      <el-table-column prop="name" :label="t('routes.site_page.set_name')" sortable align="center" min-width="140">
      </el-table-column>
      <!-- <el-table-column prop="code" :label="t('global.bio_bs')"  align="center" /> -->
      <el-table-column prop="rate_amount" :label="t('routes.agent.scfx')+'(R$)'"  align="center" />
      <el-table-column prop="lvl_one_rebate" :label="t('routes.agent.lvl_one_rebate')+'(1‱)'" align="center" />
      <el-table-column prop="lvl_two_rebate" :label="t('routes.agent.lvl_two_rebate')+'(1‱)'" align="center" />
      <el-table-column prop="lvl_three_rebate" :label="t('routes.agent.lvl_three_rebate')+'(1‱)'" align="center" />
      <el-table-column v-if="channelType" prop="recharge_num_withdraw" :label="t('routes.agent.startWithdraw')" align="center" />
      <el-table-column v-if="channelType" prop="day_withdraw_num" :label="t('routes.agent.withdrawCount')" align="center" />
      <el-table-column v-if="channelType" prop="single_limit" :label="t('routes.agent.singleAmount')" align="center" />
      <el-table-column prop="" :label="t('global.operating')" align="center" min-width="140">
        <template #default="scope">
          <el-button type="text" icon="el-icon-edit" @click="editTurnover(scope.row)">{{ t('global.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryForm.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryForm.page_size" @current-change="getList" @size-change="getList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs,computed,inject } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'invitations',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const activeName = inject<{value:string}>('activeName')
    const tableData = ref<any>([]);
    const formData = ref<any>({});
    const TurnoverRef = ref<any>(null);
    const numBer = ref<number>();
    const elForm = ref<typeof ElForm | null>(null);
    const queryForm = ref({
      page_size:10,
      page:1,
    })
    const total = ref();
    const dialog = reactive({
      dialogConfig: false,
      title: '',
      isDisabled: true,
      useTurnoverNum: '13',
      TurnoverTitle: ''
    });
    const channelType = computed(()=>activeName?.value ==='channelagent')
  
    // 获取turnover列表
    function getList() {
      let api = channelType.value ? APIs.agent.bonusList : APIs.agent.getAgentInvitations  
      api(queryForm.value).then(res => {
        if (res.status) {
          tableData.value = [];
          if (res.data.d) {
            tableData.value = _.sortBy(res.data.d, ['id', 'asc']);
            queryForm.value.page===1 && (total.value = res.data.t);
          }
        }
      });
    }
    const editTurnover = (row: any) => {
      dialog.title = t('global.edit');
      dialog.isDisabled = true;
      console.log(row);
      formData.value = Object.assign({}, {
        ...row,
        rate_amount:+row.rate_amount,
        lvl_one_rebate:+row.lvl_one_rebate,
        lvl_two_rebate:+row.lvl_two_rebate,
        lvl_three_rebate:+row.lvl_three_rebate,
        recharge_num_withdraw:+row.recharge_num_withdraw,
        day_withdraw_num:+row.day_withdraw_num,
        single_limit:+row.single_limit,
      });
      dialog.dialogConfig = true;
    };
    // 编辑Turnover
    function submitmBtn() {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            let LastForm = {
              ...formData.value,
              rate_amount:formData.value.rate_amount+"",
              lvl_one_rebate:formData.value.lvl_one_rebate+"",
              lvl_two_rebate:formData.value.lvl_two_rebate+"",
              lvl_three_rebate:formData.value.lvl_three_rebate+"",
            }
            if(channelType.value){
              LastForm = {
                ...LastForm,
                recharge_num_withdraw:String(LastForm.recharge_num_withdraw), 
                day_withdraw_num:String(LastForm.day_withdraw_num), 
                single_limit:String(LastForm.single_limit), 
              }
            }
            const api = channelType.value ?  APIs.agent.bonusUpdate : APIs.agent.updateAgentInvitations
            api(LastForm).then(res => {
                if (res.status) {
                  getList();
                  ElMessage.success({
                    message: t('global.editsuc'),
                    type: 'success'
                  });
                  dialog.dialogConfig = false;
                }
              });
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
    getList();
    const rules = reactive({
      rate_amount: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      lvl_one_rebate: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      lvl_two_rebate: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      lvl_three_rebate: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      recharge_num_withdraw: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      day_withdraw_num: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
      single_limit: [
        { required: true, message: t('global.enter_item'), trigger: "blur" },
      ],
  });
    return {
      tableData,
      submitmBtn,
      formData,
      queryForm,
      total,
      ...toRefs(dialog),
      onClose,
      TurnoverRef,
      editTurnover,
      rules,
      elForm,
      cancel,
      getList,
      t,
      numBer,
      channelType
    };
  }
});
</script>
<style lang="scss" scope>
.turnover-container {
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
</style>
