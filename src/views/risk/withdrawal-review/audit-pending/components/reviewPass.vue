<template>
  <div>
    <div class="betting-cont">
      <el-dialog :title="t('global.review_pass')" v-model="dialogComputed" width="800px" @close="onClose"
        :close-on-click-modal="false">
        <p class="red-title">{{ t('routes.risk.review_msg') }}</p>
        <el-row class="rowOne">
          <el-col :span="4">
            <div class="grid-content bg-purple gray">{{ t('global.username') }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light white">{{ reviewData.username }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light gray">{{ t('global.vip_level') }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light white">{{ toVipText(reviewData.level) }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple-light gray">{{ t('routes.finance_manage_page.wid_amount') }}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light white red">{{ appendBRL(toFixedPro(reviewData.amount)) }}</div>
          </el-col>
        </el-row>
        <el-row class="rowTwo">
          <el-col :span="4">
            <div class="grid-content bg-purple white bank">{{ t('routes.risk.tk_message') }}</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple-light whites">
              <p>{{ t('routes.finance_manage_page.pix_account') }}：{{ reviewData.pix_account }}</p>
              <div>
                pixID：{{ reviewData.pix_id }}
              </div>
              <div>
                {{ t('routes.finance_manage_page.bank_person_name') }}：{{ reviewData.real_name }}
              </div>
              <div>
                {{ t('global.account_type') }}：{{ getFlagType(reviewData.flag) }}
              </div>
              <!-- <p>{{ t('routes.finance_manage_page.bank_addr') }}：{{ reviewData.member_bank_address }}</p> -->
            </div>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12" class="pdt-20">
            <el-form :model="form" ref="eleForm" label-width="auto">
              <el-form-item
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
                <el-input v-model="form.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row> -->
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { toFixedN } from '@/utils/int';
import { format } from '@/filter/format';
import { modigyUsernameList } from '../option';
import { useVipLevel} from '@/utils/getJson';
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
    const reviewGetList = inject<any>('reviewGetList');
    const { toVipText } = useVipLevel();
    const reviewData = ref<any>({});
    const form = ref<any>({});
    const eleForm = ref();
    const showForm = (data: any) => {
      console.log(data);
      reviewData.value = data;
    };
    // 提交方法
    const submitmBtn = () => {
      ElMessageBox.confirm(t('routes.risk.pass_reply'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.risks
          .withdrawReviewpass({
            id: reviewData.value.id
          })
          .then(res => {
            if (res.status) {
              reviewGetList();
              ElMessage.success({
                message: t('routes.tips.pass_already'),
                type: 'success'
              });
              dialogComputed.value = false;
            }
          });
        // APIs.withdrawal
        //   .withdrawRisk({
        //     id: reviewData.value.id,
        //     remark: reviewData.value.id + '通过审核',
        //     state: '373'
        //   })
        //   .then(res => {
        //     if (res.status) {
        //       reviewGetList();
        //       ElMessage.success({
        //         message: '审核成功',
        //         type: 'success'
        //       });
        //       dialogComputed.value = false;
        //     }
        //   });
      });
      // if (eleForm.value) {
      //   eleForm.value.validate((valid: any) => {
      //     if (!valid) return;
      //     // TODO 提交表单

      //   });
      // }
    };
    const onClose = () => {
      console.log('guanbi');
    };
    const getFlagType = (type:'1'|'2'|'3')=>{
        return type==='1'?'cpf':type==='2'?'phone':type==='3'?'email':''
    }
    watch(
      () => form.value.code,
      n => {
        if (n) {
          form.value.code = String(n).replace(/[^\d]/g, '');
        }
      }
    );

    const bankcardFun = item => {
      if (Number.isFinite(+item)) {
        return 'bankcard' + item;
      }
      return 'bankcard' + item.bid;
    };

    return {
      onClose,
      submitmBtn,
      format,
      bankcardFun,
      dialogComputed,
      modigyUsernameList,
      reviewData,
      toFixedN,
      toVipText,
      t,
      showForm,
      dynamicMsg,
      eleForm,
      dynamic,
      getFlagType,
      form
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

  .red-title {
    line-height: 1;
    margin-top: -10px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #F56C6C;
    font-weight: bold;
  }

  .gray {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-right: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    background: #f5f7fa;
  }

  .white {
    height: 60px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rowOne {
    border: 1px solid #ebeef5;
  }

  .rowTwo {
    border: 1px solid #ebeef5;
    border-top: none;
  }

  .whites {
    padding: 10px;
    height: 120px;

    >p {
      line-height: 24px;
    }
  }

  .bank {
    line-height: 120px;
    height: 120px;
    border-right: 1px solid #ebeef5;
  }

  .red {
    color: #F56C6C;
  }
}</style>
