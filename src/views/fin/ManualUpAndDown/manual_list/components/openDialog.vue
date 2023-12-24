<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('global.vip') + title" v-model="dialogComputed" :width="450" @close="onClose" :close-on-click-modal="false">
        <div class="active-cont">
          <el-form ref="elForm" :model="formInline" :rules="rules" class="demo-form-inline" label-width="auto">
            <el-form-item :label="t('global.username')" prop="a">
              <el-input v-model="formInline.a" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.finance_manage_page.user_subdivided')" prop="b">
              <el-input v-model.trim="formInline.b" :disabled="true">
                <template #append>{{ t('global.units2') }}</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="title + t('routes.finance_manage_page.amount')" prop="c">
              <el-input v-model.trim="formInline.c" :placeholder="t('routes.finance_manage_page.enter_upper_amount')"></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.finance_manage_page.turnover_multiple')" prop="d" v-if="title == t('routes.finance_manage_page.upper_points')">
              <el-input v-model.trim="formInline.d" :placeholder="t('routes.finance_manage_page.enter_turnover_multiple')">
                <template #append>{{ t('routes.finance_manage_page.bei') }}</template>
              </el-input>
            </el-form-item>
            <el-form-item :label="title + t('routes.finance_manage_page.reason')" prop="e">
              <el-input
                v-model.trim="formInline.e"
                :placeholder="t('routes.finance_manage_page.enter_upper_reason')"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item :label="t('routes.finance_manage_page.dynamic_code')" prop="code">
              <el-input v-model.trim="formInline.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogComputed = false">{{ t('global.cancel') }}</el-button>
            <el-button type="primary" @click="submitmBtn">{{ t('global.submit') }}</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { ElForm } from 'element-plus';
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
    const formInline = ref<any>({
      code: '111111'
    });
    const { rules } = useConfigRules();
    const title = ref();
    const elForm = ref<typeof ElForm | null>(null);
    const showForm = (data: any) => {
      title.value = data.title;
      formInline.value = data;
    };
    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
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
    };

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
      t,
      elForm,
      dialogComputed
    };
  }
});
</script>
<style lang="scss" scoped></style>
