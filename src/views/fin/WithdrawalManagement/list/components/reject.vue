<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.finance_manage_page.resolve_wid')" v-model="dialogComputed" :width="550"
        @close="onClose" :close-on-click-modal="false">
        <div class="active-cont">
          <el-row class="pad ptips">
            <el-col :span="12">
              <div class="grid-content bg-purple">{{ t('global.order_number') }}：{{ datas.id }}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">{{ t('global.username') }}：{{ datas.username }}</div>
            </el-col>
          </el-row>
          <el-row class="pad ptips">
            <el-col :span="24">
              <div class="grid-content bg-purple">{{ t('routes.finance_manage_page.wid_amount') }}：{{
                toFixedPro(datas.amount) }} {{ t('global.unit') }}</div>
            </el-col>
          </el-row>
          <p class="titleT pad">{{ t('routes.finance_manage_page.resolve_amount') }}</p>
          <el-form ref="elForm" :model="formInline" :rules="rules" class="demo-form-inline" label-width="auto">
            <el-form-item :label="t('routes.finance_manage_page.remark')" prop="remark">
              <el-input v-model="formInline.remark" :placeholder="t('global.remark')" type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.risk.qtbz')" prop="withdraw_remark" class="bonus-type">
              <el-input v-model="formInline.withdraw_remark" type="textarea" :placeholder="t('routes.risk.pls_qtbz')"
                :autosize="{ minRows: 4, maxRows: 4 }" maxlength="100" show-word-limit
                :style="{ width: '100%' }"></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.finance_manage_page.dynamic_code')" prop="code">
              <el-input v-model.trim="formInline.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')"
                maxlength="6"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogComputed = false">{{ t('global.cancel') }}</el-button>
            <el-button type="primary" @click="submitmBtn()">{{ t('global.sure') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed, watch } from 'vue';
import { APIs } from '@/http';
import { ElForm, ElMessage } from 'element-plus';
import { useConfigRules } from './rule-review';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'withdrawalReview',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const { t } = useI18n({ useScope: 'global' });
    const dialogComputed = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    });
    const reviewGetList = inject<any>('reviewGetList');
    const formInline = ref<any>({
      code: '111111'
    });
    const isPass = ref<boolean>();
    const { rules } = useConfigRules();
    const elForm = ref<typeof ElForm | null>(null);
    const datas = ref();
    const showForm = (data: any) => {
      datas.value = data;
      formInline.value.id = data.id;
      resetFields();
    };
    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            APIs.withdrawal.withdrawReject(formInline.value).then(res => {
              if (res.status) {
                reviewGetList();
                ElMessage.success({
                  message: t('global.submit_suc'),
                  type: 'success'
                });
                dialogComputed.value = false;
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    };
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

    watch(
      () => formInline.value.code,
      n => {
        if (n) {
          formInline.value.code = String(n).replace(/[^\d]/g, '')
        }
      }
    );

    return {
      onClose,
      formInline,
      submitmBtn,
      rules,
      showForm,
      isPass,
      elForm,
      datas,
      t,
      dialogComputed
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

.ptips {
  line-height: 1;
  margin-bottom: 15px;
}
</style>
