<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="dialog.title" v-model="dialog.dialogVisable" :width="500" @close="onClose" :close-on-click-modal="false">
        <el-form ref="elForm" :model="formInline" label-width="auto">
          <el-form-item :label="t('global.order_number')">
            <el-input disabled v-model="formInline.id"> </el-input>
          </el-form-item>
          <el-form-item :label="t('global.username')">
            <el-input disabled v-model="formInline.username"> </el-input>
          </el-form-item>
          <el-form-item :label="t('routes.finance_manage_page.embodied_amount')">
            <el-input disabled v-model="formInline.amount">
              <template #append>{{ t('global.units2') }}</template>
            </el-input>
          </el-form-item>
          <div>
            <el-form-item :label="t('routes.finance_manage_page.card_name')">
              <el-input v-model="formInline.member_bank_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formInline.member_bank_real_name" disabled> </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formInline.member_bank_no" disabled> </el-input>
            </el-form-item>
          </div>
          <el-form-item :label="t('routes.finance_manage_page.out_amount')">
            <el-input disabled v-model="formInline.amount">
              <template #append>{{ t('global.units2') }}</template>
            </el-input>
          </el-form-item>
          <div>
            <el-form-item :label="t('routes.finance_manage_page.out_bankname')" prop="bank_name">
              <el-input v-model="formInline.bank_name" :placeholder="t('routes.finance_manage_page.bank_name')" disabled></el-input>
            </el-form-item>
            <el-form-item label="" prop="real_name">
              <el-input v-model="formInline.real_name" :placeholder="t('routes.finance_manage_page.bank_person_name')" disabled> </el-input>
            </el-form-item>
            <el-form-item label="" prop="card_no">
              <el-input v-model="formInline.card_no" :placeholder="t('routes.finance_manage_page.bank_num')" disabled> </el-input>
            </el-form-item>
          </div>
          <el-form-item :label="t('routes.tips.remark')">
            <el-input
              v-model="formInline.withdraw_remark"
              type="textarea"
              :placeholder="t('routes.tips.remark')"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
              maxlength="50"
              show-word-limit
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item :label="t('routes.finance_manage_page.opration_count')">
            <el-input disabled v-model="formInline.confirm_name"> </el-input>
          </el-form-item>
          <el-form-item :label="t('routes.finance_manage_page.order_status')">
            <el-input disabled :model-value="WithdrawalToText(formInline.state)"> </el-input>
          </el-form-item>
          <el-form-item :label="t('routes.finance_manage_page.operation_time')">
            <el-input disabled v-model="formInline.confirm_at"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cancal">{{ t('routes.finance_manage_page.close') }}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElForm } from 'element-plus';
import _ from 'lodash';
import { useVipLevel, useWithdrawalStatus } from '@/utils/getJson';
import { format } from '@/filter/format';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'priorityDispatchRule',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const dialog = reactive({
      dialogVisable: false, // 控制dialog显示隐藏
      title: ''
    });
    const formInline = ref<any>({});
    const elForm = ref<typeof ElForm | null>(null);
    const { toVipText } = useVipLevel();
    const { WithdrawalToText } = useWithdrawalStatus();
    const showForm = (data: any) => {
      dialog.dialogVisable = true;
      if (Number(data.automatic) === 0) {
        dialog.title = t('routes.finance_manage_page.payer_one_tips');
      }
      if (Number(data.automatic) === 1) {
        dialog.title = t('routes.finance_manage_page.payer_two_tips');
      }
      formInline.value = data;
      formInline.value.confirm_at = format(formInline.value.confirm_at, false);
      console.log(formInline.value, 'formInline.value');
    };
    // 关闭弹框
    function cancal() {
      dialog.dialogVisable = false;
    }
    const onClose = () => {
      if (elForm.value) {
        elForm.value.clearValidate();
      }
    };
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }
    return {
      onClose,
      formInline,
      showForm,
      elForm,
      WithdrawalToText,
      dialog,
      toVipText,
      t,
      cancal
    };
  }
});
</script>
<style lang="scss" scoped>
.titleT {
  margin-bottom: 20px;
  color: #F56C6C;
  font-weight: bold;
}
.pad {
  padding-left: 15px;
}
</style>
