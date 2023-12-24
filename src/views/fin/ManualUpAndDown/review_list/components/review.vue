<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.finance_manage_page.review_order')" v-model="dialogComputed" :width="450" @close="onClose" :close-on-click-modal="false">
        <div class="active-cont">
          <p class="titleT">{{t('routes.finance_manage_page.review_title')}}</p>
          <el-form ref="elForm" :model="formInline" :rules="rules" class="demo-form-inline" label-width="auto">
            <el-form-item :label="t('routes.finance_manage_page.review_remark')" prop="review_remark">
              <el-input v-model.trim="formInline.review_remark" :placeholder="t('routes.finance_manage_page.remark_tip')" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.finance_manage_page.dynamic_code')" prop="code">
              <el-input v-model.trim="formInline.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submitmBtn('362')">{{t('global.pass')}}</el-button>
            <el-button type="primary" @click="submitmBtn('363')">{{t('global.no_pass')}}</el-button>
            <el-button @click="dialogComputed = false">{{t('global.cancel')}}</el-button>
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
import { useConfigRules } from './rules';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'priorityDispatchRule',
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
    const formInline = ref<any>({});
    const reviewGetList = inject<any>('reviewGetList');
    const { rules } = useConfigRules();
    const title = ref();
    const elForm = ref<typeof ElForm | null>(null);
    const showForm = (data: any) => {
      console.log(data);
      data.review_remark = '';
      formInline.value = Object.assign({}, data, {code: '111111'});
      resetFields();
    };
    // 提交方法
    const submitmBtn = (states: string) => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            // 362为审核通过
            if (states === '362') {
              reviewOrderSubmit('362');
            } else {
              // 363为审核拒绝
              reviewOrderSubmit('363');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    };
    function reviewOrderSubmit(states: string) {
      APIs.fin
        .vipRreviewOrder({
          id: formInline.value.id,
          state: states,
          review_remark: (formInline.value.review_remark),
          code: formInline.value.code
        })
        .then(res => {
          if (res.status) {
            reviewGetList();
            ElMessage.success({
              message: t('routes.tips.modify_suc'),
              type: 'success'
            });
            formInline.value = {};
            resetFields();
            dialogComputed.value = false;
          }
        });
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

    watch(
      () => formInline.value.code,
      n => {
        if (n) {
          formInline.value.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    return {
      onClose,
      formInline,
      submitmBtn,
      rules,
      showForm,
      title,
      elForm,
      t,
      dialogComputed
    };
  }
});
</script>
<style lang="scss" scoped>
.titleT {
  margin-top: -15px;
  margin-bottom: 20px;
  color: #F56C6C;
  font-weight: bold;
}
</style>
