<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.risk.review_refuse')" v-model="dialogComputed" width="500px" @close="onClose" :close-on-click-modal="false">
        <el-form :model="formData" :rules="rules" ref="elForm" label-width="auto" class="demo-ruleForm">
          <el-form-item :label="t('routes.risk.refuses')" prop="remark_select" class="bonus-type">
            <el-select v-model="formData.remark_select" :placeholder="t('routes.risk.refuses_tips')" clearable :style="{ width: '100%' }" @change="selectOne">
              <el-option v-for="(item, index) in reviewFalseType" :key="index" :label="item.label" :value="item.label" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('routes.risk.reason_content')" prop="review_remark" class="bonus-type">
            <el-input
              v-model="formData.review_remark"
              type="textarea"
              :placeholder="t('routes.risk.reason_tips')"
              :autosize="{ minRows: 4, maxRows: 4 }"
              maxlength="100"
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item :label="t('routes.risk.qtbz')" prop="withdraw_remark" class="bonus-type">
            <el-input
              v-model="formData.withdraw_remark"
              type="textarea"
              :placeholder="t('routes.risk.pls_qtbz')"
              :autosize="{ minRows: 4, maxRows: 4 }"
              maxlength="100"
              show-word-limit
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item :label="t('routes.risk.msg_tz')" prop="notice">
            <el-radio-group v-model="formData.notice" size="medium">
              <el-radio v-for="(item, index) in isForce" :key="index" :label="item.value" :disabled="item.disabled">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item :label="t('routes.risk.risk_remark')" prop="risk_remark" class="bonus-type">
            <el-input
              v-model="formData.risk_remark"
              type="textarea"
              maxlength="100"
              show-word-limit
              :placeholder="t('routes.risk.risk_remark_tips')"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item> -->
          <!-- <el-form-item
            :label="t('routes.finance_manage_page.dynamic_code')"
            prop="code"
            :rules="[
              {
                required: true,
                message: t('routes.finance_manage_page.dynamic_code_tip'),
                trigger: 'blur'
              },
              {
                pattern: dynamic,
                message: dynamicMsg
              }
            ]"
          >
            <el-input v-model="formData.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6" />
          </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogComputed = false">{{ t('global.cancel') }}</el-button>
            <el-button type="primary" @click="submitmBtn">{{ t('global.sure') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed, watch } from 'vue';
import { APIs } from '@/http';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import { useConfigRules } from '../reviewFalse';
import { format } from '@/filter/format';
import { modigyUsernameList } from '../option';
import { reviewFalseType, isForce } from '@/utils/selectOptions';
import { useI18n } from 'vue-i18n';
import { dynamicMsg, dynamic } from '@/utils/expressions';

export default defineComponent({
  name: 'dispatchRule',
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
    const { rules } = useConfigRules();
    const formData = ref<any>({});
    const reviewId = ref();
    const reviewGetList = inject<any>('reviewGetList');
    const elForm = ref<typeof ElForm | null>(null);
    const showForm = (data: any) => {
      reviewId.value = data.id;
      resetFields();
    };
    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            ElMessageBox.confirm(t('routes.risk.refuse_reply'), t('global.warning'), {
              confirmButtonText: t('global.sure'),
              cancelButtonText: t('global.cancel'),
              type: 'warning'
            }).then(() => {
              const obj = { ...formData.value };
              delete obj.remark_select;
              APIs.risks
                .withdrawReviewreject({
                  id: reviewId.value,
                  ...obj
                })
                .then(res => {
                  if (res.status) {
                    reviewGetList();
                    ElMessage.success({
                      message: t('routes.tips.refuse_already'),
                      type: 'success'
                    });
                    dialogComputed.value = false;
                  }
                });
              // APIs.withdrawal
              //   .withdrawRisk({
              //     id: reviewId.value,
              //     remark: formData.value.remark,
              //     state: '372'
              //   })
              //   .then(res => {
              //     if (res.status) {
              //       reviewGetList();
              //       ElMessage.success({
              //         message: '已拒绝',
              //         type: 'success'
              //       });
              //       dialogComputed.value = false;
              //     }
              //   });
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
      resetFields();
    };
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }
    const selectOne = (item: any) => {
      formData.value.review_remark = item;
    };

    watch(
      () => formData.value.code,
      n => {
        if (n) {
          formData.value.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    return {
      onClose,
      formData,
      selectOne,
      submitmBtn,
      reviewId,
      rules,
      dynamicMsg,
      dynamic,
      elForm,
      resetFields,
      format,
      dialogComputed,
      reviewFalseType,
      isForce,
      modigyUsernameList,
      showForm,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.betting-cont {
  background: white;
  .betting-table {
    padding: 20px;
    background: white;
  }
}
</style>
