<template>
  <div>
    <el-dialog :title="title + ' ' + t('routes.tips.system_notice')" width="710px" v-model="dialogComputed" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto">
        <el-form-item :label="t('routes.tips.title')" prop="title">
          <el-input v-model="formData.title" :placeholder="t('routes.tips.carouse_title_tips')" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.tips.content')" prop="content">
          <el-input
            v-model="formData.content"
            type="textarea"
            :placeholder="t('routes.operation_manage_page.limit_')"
            :autosize="{ minRows: 4, maxRows: 4 }"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="是否跳转" prop="redirect">
          <el-radio-group v-model="formData.redirect" size="medium">
            <el-radio v-for="(item, index) in systemeOptions" :key="index" :label="item.value" >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formData.redirect == 1" :label="t('routes.tips.href_link')" prop="redirect_url">
          <el-input v-model.trim="formData.redirect_url" :placeholder="t('routes.tips.enter_href')" clearable></el-input>
        </el-form-item> -->
        <el-form-item :label="t('routes.finance_manage_page.is_start')" prop="state">
          <el-radio-group v-model="formData.state" size="medium">
            <el-radio v-for="(item, index) in systemeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="handelConfirm">{{ t('global.sure') }}</el-button>
        </span>
        <div class="empty"></div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance, provide, watch, inject } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
import formSerch from '@/components/serch-form/index.vue';
import {
  contentBTemp,
  stationjOptions,
  stationiOptions,
  stationeOptions,
  stationaOptions,
  systemkOptions,
  systemeOptions,
  stationdOptions
} from '@/utils/selectOptions';
import { useConfigRules } from './rules';
import AllChecked from '@/components/all-checked/index.vue';
import { APIs } from '@/http';
import { empty } from '@/components/serch-form/empty';
import { removeObjArray } from '@/utils';
import { parseUrl } from 'xe-utils';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'AddSystemNotes',
  components: {
    formSerch,
    AllChecked
  },
  props: {
    modelValue: Boolean,
    datas: Object,
    title: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const { t } = useI18n({ useScope: 'global' });
    const app = getCurrentInstance();
    const dialogComputed = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    });
    const datasComputed: any = computed({
      get: () => props.datas,
      set: val => {
        datasComputed.value = val;
        console.log(datasComputed.value);
      }
    });

    const templateDel = ref<any>([]);
    const elForm = ref<typeof ElForm | null>(null);
    const tableData = ref([]);
    const formData = ref<any>({});
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }
    const { rules } = useConfigRules(formData);
    let isEdit: any = ref<any>(false);
    const showForm = (data: any = {}) => {
      formData.value = data;
      // formData.value.redirect = data.redirect;
      if (data?.id) {
        isEdit.value = true;
      } else {
        isEdit.value = false;
      }
      resetFields();
    };
    const cancel = () => {
      if (elForm.value) {
        elForm.value.clearValidate();
      }
      dialogComputed.value = false;
    };
    const onSubmit = (data: any) => {
      // listQuery.value = data;
      // getList();
    };
    const SystemNodeGetList = inject<any>('SystemNodeGetList');
    const handelConfirm = () => {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            const obj = {
              id: formData.value.id||'',
              title: formData.value.title,
              content: formData.value.content,
              // redirect: formData.value.redirect,
              // redirect_url: formData.value.redirect_url,
              state:formData.value.state,
              created_at:0,
              created_uid:'',
              created_name:''
            };
            ElMessageBox.confirm(t('routes.tips.submit_tips'), t('global.warning'), {
              confirmButtonText: t('global.sure'),
              cancelButtonText: t('global.cancel'),
              type: 'warning'
            }).then(() => {
              if (isEdit.value) {
                APIs.content.postupdate(obj).then(res => {
                  if (res.status) {
                    ElMessage.success(t('global.editsuc'));
                    SystemNodeGetList();
                    context.emit('checkList');
                    cancel();
                  }
                });
              } else {
                APIs.content.postinsert(obj).then(res => {
                  if (res.status) {
                    ElMessage.success(t('global.add_suc'));
                    SystemNodeGetList();
                    context.emit('checkList');
                    cancel();
                  }
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    };
    const addSure = () => {
      dialogComputed.value = false;
    };
    const selectStation = () => {
      console.log(app?.parent);
      alert('选择模板');
    };

    // 改变表单数据
    function changeSystemNat(key: string, val: any) {
      formData.value[key] = val;
    }
    provide('changeSystemNat', changeSystemNat);
    function disabledDate(current: any) {
      // return current.getTime() < Date.now();
      if (!formData.value.show_start_time) {
        return false;
      }
      return current.getTime() < (formData.value.show_start_time && formData.value.show_start_time.getTime());
    }

    function disabledDate2(current: any) {
      // return current.getTime() < Date.now();
      if (!formData.value.show_end_time) {
        return false;
      }
      return current.getTime() > (formData.value.show_end_time && formData.value.show_end_time.getTime());
    }
    return {
      selectStation,
      formData,
      cancel,
      handelConfirm,
      dialogComputed,
      elForm,
      tableData,
      rules,
      contentBTemp,
      onSubmit,
      addSure,
      t,
      stationjOptions: stationjOptions.slice(1, 3),
      stationiOptions,
      stationeOptions,
      stationaOptions,
      stationdOptions,
      systemeOptions,
      systemkOptions,
      showForm,
      changeSystemNat,
      templateDel,
      disabledDate,
      disabledDate2,
      isEdit
    };
  }
});
</script>
<style lang="scss" scoped>
.empty {
  height: 30px;
}
.elimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.empty10 {
  height: 10px;
}
</style>
