<template>
  <div class="dialogcontent">
    <el-dialog :title="dialogContent.title" v-model="dialogFormVisible" :width="350" :close-on-click-modal="false">
      <div class="active-cont">
        <p class="titleT pad" v-show="dialogContent.content">{{ dialogContent.content }}</p>
        <el-form ref="elForm" @submit.native.prevent :model="form" class="demo-form-inline" label-width="auto">
          <el-form-item :label="t('routes.finance_manage_page.dynamic_code')" prop="code" :rules="[
              {
                required: true,
                message: t('routes.finance_manage_page.dynamic_code_tip'),
                trigger: 'blur'
              },
              {
                pattern: dynamic,
                message: dynamicMsg
              }
            ]">
            <el-input v-model.trim="form.code" @keyup.enter="submitmBtn" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{t('global.cancel')}}</el-button>
          <slot name="vit"></slot>

        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { ElForm } from 'element-plus';
import { dynamic, dynamicMsg } from '@/utils/expressions';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'DynamicVerificationCode',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const elForm = ref<typeof ElForm | null>(null);
    const dialogFormVisible = ref<boolean>(false);
    const form = ref<any>({});
    // 传入验证组件的参数验证
    interface DynArgType {
      title?: string;
      content?: string;
      hanlder?: any;
      codeName?: string;
    }
    const isItverified = ref<boolean>(false);
    // 打开验证组件
    const dialogContent = reactive<DynArgType>({
      title: t('routes.finance_manage_page.dynamic_code')
    });
    const showForm = (bool: boolean, dialog: DynArgType = {}) => {
      form.value.code = '111111';
      Object.assign(dialogContent, dialog);
      dialogFormVisible.value = bool;
    };

    // 提交方法
    const submitmBtn = (states: string) => {
      return new Promise(resolve => {
        if (elForm.value) {
          elForm.value.validate((valid: boolean) => {
            if (valid) {
              resolve(form.value.code);
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      });
    };

    function cancel() {
      dialogFormVisible.value = false;
      form.value.code = '';
      (elForm.value as typeof ElForm).resetFields();
    }

    watch(
      () => form.value.code,
      n => {
        if (n) {
          form.value.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    return {
      dialogFormVisible,
      form,
      showForm,
      submitmBtn,
      elForm,
      dialogContent,
      cancel,
      t,
      dynamic,
      dynamicMsg
    };
  }
});
</script>
<style lang="scss" scoped>
.titleT {
  margin-bottom: 12px;
  color: #ff4d4f;
  font-weight: bold;
}
.pad {
  padding-left: 15px;
}
.dialogcontent ::v-deep(.el-dialog__body) {
  padding: 20px 20px 0;
}
</style>
