<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.risk.review_up')" v-model="dialogComputed" width="400px" @close="onClose" :close-on-click-modal="false">
        <el-form ref="elForm" :model="formInline"  size="medium" label-width="auto">
          <el-form-item :label="t('routes.risk.up_id')" prop="hang_up_remark">
                  <el-input
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    v-model="formInline.hang_up_remark"
                    :placeholder="t('routes.risk.enter_other')"
                  ></el-input>

              <!-- <br />
              <el-radio class="lineheight" :label="2">套利会员</el-radio>
              <br />
              <el-radio class="lineheight" :label="3">多账号</el-radio>
              <br />
              <el-radio class="lineheight" :label="4">银行卡异常</el-radio><br />
              <br /> -->
          </el-form-item>
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
            <el-input v-model="formInline.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6" />
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
import { defineComponent, ref, inject, watch } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { format } from '@/filter/format';
import { modigyUsernameList } from '../option';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
import { dynamicMsg, dynamic } from '@/utils/expressions';

export default defineComponent({
  name: 'HangUp',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const dialogComputed = ref<any>(false);
    const formInline = ref<any>({});
    // const AppSplashGetList = inject<any>('AppSplashGetList');
    const elForm = ref<typeof ElForm | null>(null);
    const showForm = (data: any) => {
      formInline.value.id = data.id;
      dialogComputed.value = true;
      resetFields();
    };

    const reviewGetList = inject<any>('reviewGetList');
    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            const obj: any = {
              id: formInline.value.id,
              hang_up_remark:formInline.value.hang_up_remark
            };
              if (!obj.hang_up_remark) {
                ElMessage.error(t('routes.risk.reason_content_tips'));
                return;
              }
            APIs.risks.withdrawhandup(obj).then(res => {
              if (res.status) {
                ElMessage.success(t('routes.risk.audit_suc'));
                dialogComputed.value = false;
                reviewGetList();
              }
            });
            // dialogComputed.value = false;
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
      elForm,
      resetFields,
      format,
      dialogComputed,
      modigyUsernameList,
      showForm,
      t,
      dynamicMsg,
      dynamic
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
.lineheight {
  line-height: 35px;
}
</style>
