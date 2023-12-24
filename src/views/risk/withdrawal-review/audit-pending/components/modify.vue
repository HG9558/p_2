<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('routes.risk.recipient_modify')" v-model="dialogComputed" width="400px" @close="onClose" :close-on-click-modal="false">
        <el-form ref="elForm" :model="formInline" :rules="rules" size="medium" label-width="auto">
          <el-form-item :label="t('routes.risk.recipient_no')" prop="old_name">
            <el-input disabled v-model="formInline.old_name"> </el-input>
          </el-form-item>
          <el-form-item :label="t('routes.risk.recipient_new')" prop="confirm_uid">
            <el-select v-model="formInline.confirm_uid" :placeholder="t('global.please_choose')" clearable :style="{ width: '100%' }">
              <!-- <el-option v-for="(item, index) in modigyUsernameList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option> -->
              <el-option v-for="(item, index) in modigyUsernameList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
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
import { defineComponent, ref, computed, inject, watch } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useConfigRules } from '../up';
import { format } from '@/filter/format';
import { APIs } from '@/http';
import { dynamicMsg, dynamic } from '@/utils/expressions';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'dispatchRule',
  props: {
    modelValue: Boolean,
    modifyData: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const { t } = useI18n({ useScope: 'global' });
    const dialogComputed = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    });
    const { rules } = useConfigRules();
    const formInline = ref<any>({});
    // const AppSplashGetList = inject<any>('AppSplashGetList');
    const elForm = ref<typeof ElForm | null>(null);
    const showForm = (data: any) => {
      formInline.value.old_name = data.confirm_name;
      formInline.value.id = data.id;
      resetFields();
    };

    const reviewGetList = inject<any>('reviewGetList');
    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            // dialogComputed.value = false;
            const findObj = modigyUsernameList.value.find((item: any) => item.value == formInline.value.confirm_uid);
            const obj = {
              id: formInline.value.id,
              confirm_uid: findObj.value,
              confirm_name: findObj.label
            };

            APIs.risks.withdReceiveupdate(obj).then(res => {
              if (res.status) {
                ElMessage.success(t('routes.tips.modify_suc'));
                dialogComputed.value = false;
                reviewGetList();
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
      resetFields();
    };
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }
    const modigyUsernameList = ref<any>([]);

    watch(
      () => formInline.value.code,
      n => {
        if (n) {
          formInline.value.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    watch(
      () => [props.num, props.modifyData],
      ([n, m]) => {
        if (n) {
          formInline.value.old_name = m;
        }
      }
    );

    return {
      onClose,
      formInline,
      submitmBtn,
      rules,
      elForm,
      resetFields,
      dynamicMsg,
      dynamic,
      format,
      dialogComputed,
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
