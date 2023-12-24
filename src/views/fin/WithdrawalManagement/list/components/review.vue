<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.finance_manage_page.review')" v-model="dialogComputed" :width="550" @close="onClose"
        :close-on-click-modal="false">
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
          <p class="titleT pad">{{ t('routes.finance_manage_page.review_title') }}</p>
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
      APIs.withdrawal.withdrawReview(formInline.value).then(res => {
        if (res.status) {
          reviewGetList();
          ElMessage.success({
            message: t('global.submit_suc'),
            type: 'success'
          });
          dialogComputed.value = false;
        }
      });
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
