<template>
  <div>
    <div class="betting-cont">
      <el-form ref="elForm" :rules="rules" :model="formInline" class="demo-form-inline" label-width="auto">
        <div class="btn-absolute">
          <el-form-item :label="t('global.username')" prop="username">
            <el-input v-model="formInline.username" clearable :placeholder="t('routes.finance_manage_page.down_tips')"></el-input>
          </el-form-item>
          <el-button class="btn" type="primary" @click="qeuryMoney">{{ t('global.query') }}</el-button>
        </div>
        <el-form-item :label="t('routes.finance_manage_page.vip_level')">
          <el-input :model-value="toVipText(formInline.level)" :disabled="true"></el-input>
        </el-form-item>
        <div class="btn-absolute">
          <el-form-item :label="t('routes.finance_manage_page.center_wallent')">
            <el-input :model-value="toFixedPro(formInline.amountCenter)" :disabled="true">
              <template #append>{{ t('global.unit') }}</template>
            </el-input>
          </el-form-item>
          <el-button class="btn" type="primary" @click="qeuryAmount">{{ t('routes.finance_manage_page.refresh') }}</el-button>
        </div>
        <el-form-item :label="t('routes.finance_manage_page.tz_money')" prop="real_amount">
          <el-input v-model="formInline.real_amount" clearable :placeholder="t('routes.finance_manage_page.down_money_tips')" maxlength="10">
            <template #append>{{ t('global.units2') }}</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.remark')" prop="remark">
          <el-input
            v-model="formInline.remark"
            :placeholder="t('routes.operation_manage_page.please_enter_remark')"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.finance_manage_page.dynamic_code')" prop="code">
          <el-input v-model="formInline.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitmBtn" :disabled="isSubmit">{{ t('global.submit') }}</el-button>
          <el-button @click="resetForm">{{ t('global.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { APIs } from '@/http';
import { ElForm, ElMessage } from 'element-plus';
import { useConfigRules } from './rules';
import { useVipLevel } from '@/utils/getJson';
import { user_name } from '@/utils/expressions';
import { toFixedN } from '@/utils/int';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'manual_list',
  setup() {
    const formInline = ref<any>({
      code: '111111'
    });
    const { t } = useI18n({ useScope: 'global' });
    const { rules } = useConfigRules();
    const { toVipText } = useVipLevel();
    const title = ref();
    const elForm = ref<typeof ElForm | null>(null);
    const isSubmit = ref<boolean>(true);
    const showForm = (data: any) => {
      title.value = data.title;
      // formInline.value = data;
    };

    // 提交方法
    const submitmBtn = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            if (formInline.value.amountCenter - formInline.value.real_amount < 0) {
              ElMessage.error({
                message: t('routes.finance_manage_page.money_tips'),
                type: 'error'
              });
              return;
            }
            APIs.fin
              .depositReduce({
                username: formInline.value.username,
                remark: formInline.value.remark,
                code: formInline.value.code,
                amount: formInline.value.real_amount
              })
              .then(res => {
                if (res.status) {
                  ElMessage.success({
                    message: t('global.submit_suc'),
                    type: 'success'
                  });
                  formInline.value = {};
                  resetFields();
                  isSubmit.value = true;
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    };
    const resetForm = () => {
      resetFields();
      formInline.value.remark = '';
    };
    const qeuryMoney = () => {
      // if (!formInline.value.username) return;
      formInline.value.remark = '';
      formInline.value.code = '111111';
      formInline.value.real_amount = '';
      if (user_name.test(formInline.value.username)) {
        APIs.viplist
          .getMemberList({
            username: formInline.value.username,
            page: 1,
            page_size: 10
          })
          .then(res => {
            if (res.status) {
              formInline.value.level = res.data?.d[0]?.level;
            }
          });
        qeuryAmount();
      } else {
        ElMessage.error({
          message: t('routes.tips.username_error'),
          type: 'error'
        });
      }
    };
    function qeuryAmount() {
      if (!formInline.value.username) {
        ElMessage.error({
          message: t('routes.tips.please_enter_username'),
          type: 'error'
        });
        return;
      }
      APIs.viplist
        .getMemberBalance({
          username: formInline.value.username
        })
        .then(res => {
          if (!res.status) return;
          formInline.value.amountCenter = res.data ? res.data.balance : '0.0000';
          formInline.value.before_amount = res.data ? res.data.balance : '0.0000';
          isSubmit.value = false;
        });
    }
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }

    watch(
      () => formInline.value.real_amount,
      n => {
        if (n) {
          formInline.value.real_amount = String(n).replace(/[^\d]/g, '');
        }
      }
    );

    watch(
      () => formInline.value.code,
      n => {
        if (n) {
          formInline.value.code = String(n).replace(/[^\d]/g, '');
        }
      }
    );

    return {
      formInline,
      isSubmit,
      submitmBtn,
      qeuryAmount,
      rules,
      showForm,
      title,
      qeuryMoney,
      resetForm,
      toVipText,
      elForm,
      t,
      toFixedN
    };
  }
});
</script>
<style lang="scss" scoped>
.betting-cont {
  width: 600px;
  margin-left: 30px;
  padding-top: 30px;
  padding-bottom: 50px;
  ::v-deep(.el-form-item) {
    margin-bottom: 20px;
  }
  .btn-absolute {
    position: relative;
    .btn {
      position: absolute;
      position: absolute;
      right: -95px;
      top: -1px;
    }
  }
}
</style>
