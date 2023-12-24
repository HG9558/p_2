<template>
  <div class="container">
    <p class="empty"></p>
    <h3>{{ t('routes.site_page.kf.setting') }}</h3>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto" :close-on-click-modal="false">
      <el-form-item label="FaceBook" prop="facebook">
        <el-input v-model="formData.facebook" :placeholder="t('global.enter')" clearable style="width:300px"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="submitmBtn('facebook')">{{ t('global.update')
        }}</el-button>
      </el-form-item>
      <el-form-item label="telegram" prop="telegram">
        <el-input v-model="formData.telegram" :placeholder="t('global.enter')" controls-position="right"
          style="width:300px"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="submitmBtn('telegram')">{{ t('global.update')
        }}</el-button>
      </el-form-item>
      <el-form-item label="online" prop="telegram">
        <el-input v-model="formData.onlinecs" :placeholder="t('global.enter')" controls-position="right"
          style="width:300px"></el-input>
        <el-button type="primary" style="margin-left: 10px;" @click="submitmBtn('onlinecs')">{{ t('global.update')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
import { APIs } from '@/http';
import { https } from "@/utils/expressions"
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'kfLink',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const formData = ref({
      telegram: '',
      facebook: '',
      onlinecs: ''
    });
    const elForm = ref<typeof ElForm | null>(null);
    getList();
    // 获取turnover列表
    function getList() {
      APIs.site.getKfUrlList().then(res => {
        if (res.status) {
          if (res.data) {
            formData.value = res.data;
          }
        }
      });
    }
    const editForm = () => {
      formData.value = Object.assign({});
    };
    // 编辑
    function submitmBtn(key: keyof typeof formData.value) {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            const LastForm = { field: key, value: formData.value[key] }
            APIs.site.updateKfUrl(LastForm).then(res => {
              if (res.status) {
                getList();
                ElMessage.success({
                  message: t('global.savesuc'),
                  type: 'success'
                });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
    const rules = reactive({
      telegram: [{
        required:false,
        trigger:'blur',
        message:t('routes.tips.enter_url'),
        pattern: https
      }],
      facebook: [{
        required:false,
        trigger:'blur',
        message:t('routes.tips.enter_url'),
        pattern: https
      }],
      onlinecs: [{
        required:false,
        trigger:'blur',
        message:t('routes.tips.enter_url'),
        pattern: https
      }],
    }
    );
    return {
      submitmBtn,
      formData,
      editForm,
      rules,
      elForm,
      getList,
      t,
    };
  }
});
</script>
<style lang="scss" scope>
.container {
  padding: 1px 20px;
  padding-bottom: 50px;
  background: white;

  .empty {
    height: 20px;
  }

  a {
    text-decoration: none;
  }

  h3 {
    padding-bottom: 20px;
  }
}</style>
