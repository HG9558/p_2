<template>
  <el-button type="primary" v-if="showAddBtn" @click="editVersion" style="margin-left: 20px">{{
    t('global.increment')
  }}</el-button>
  <div class="container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="platform" :label="t('routes.site_page.set_name')" align="center"
        width="100"></el-table-column>
      <el-table-column prop="version" :label="t('routes.site_page.app_version')"
        align="center"></el-table-column>
      <el-table-column prop="content" :label="t('routes.site_page.version_description')" align="center"
        min-width="180"></el-table-column>
      <el-table-column prop="url" :label="t('routes.site_page.download_url')" align="center"
        min-width="200"></el-table-column>

      <el-table-column prop="updated_at" :label="t('global.operating_time')" align="center" width="150">
        <template #default="scope">
          {{ $filters.format(scope.row.updated_at, false) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_name" :label="t('global.operating_people')" align="center"></el-table-column>
      <el-table-column prop="address" :label="t('global.operating')" align="center">
        <template #default="scope">
          <span class="blue-btn" @click="editVersion(scope.row)">{{ t('global.edit') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="t('routes.site_page.version_update')" v-model="dialogReviewShow" width="600px"
      @close="onClose" :close-on-click-modal="false">
      <el-form ref="elForms" :rules="rules" :model="formData" size="medium" label-width="auto">
        <el-form-item :label="t('routes.site_page.update_device')" prop="platform">
          <el-select v-model="formData.platform" :placeholder="t('routes.site_page.please_device')"
            :style="{ width: '100%' }" :disabled="tableData.length != 0">
            <el-option v-for="(item, index) in appUpdate" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.app_version')" prop="version">
          <el-input v-model.trim="formData.version" clearable
            :placeholder="t('routes.site_page.version_tips')"> </el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.download_url')" prop="url">
          <el-input v-model.trim="formData.url" clearable :placeholder="t('routes.site_page.download_addr')">
          </el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.up_contents')" prop="content">
          <el-input v-model="formData.content" clearable :placeholder="t('routes.site_page.up_content')"
            type="textarea" maxlength="500" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialogs">
          <span class="dialog-footer">
            <el-button @click="dialogReviewShow = false">{{ t('global.cancel') }}</el-button>
            <el-button type="primary" @click="submitmBtn">{{ t('global.sure') }}</el-button>
          </span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { APIs } from '@/http';
import { rules } from '../rules';
import { appUpdate, isForce } from '@/utils/selectOptions';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElForm } from 'element-plus';

export default defineComponent({
  name: 'Ios',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    // const activeName = ref('first');
    const tableData = ref([]);
    const showAddBtn = ref<boolean>(false);
    const dialogReviewShow = ref<boolean>(false);
    const formData = ref<any>({
      is_force: 1,
    });
    const elForms = ref<typeof ElForm | null>(null);
    // function handleClick(tab: any) {
    //   console.log(tab.props);
    // }
    const editVersion = (row: any) => {
      if (row) {
        formData.value = Object.assign({}, row);
        formData.value.is_force = 1;
      }
      dialogReviewShow.value = true;
    };
    getList();
    function getList() {
      APIs.app.appList().then(res => {
        tableData.value = [];
        if (res.status) {
          if (res.data) {
            tableData.value = res.data.filter((it: any) => {
              return it.platform == 'ios';
            });
          }
          if (!res.data.length) showAddBtn.value = true;
        }
      });
    }
    // 新增更新版本
    const submitmBtn = () => {
      if (elForms.value) {
        elForms.value.validate((valid: boolean) => {
          if (valid) {
            APIs.app.appUpdate(Object.assign({}, formData.value)).then(res => {
              if (res.status) {
                getList();
                ElMessage.success({
                  message: t('global.set_suc'),
                  type: 'success'
                });
                dialogReviewShow.value = false;
              }
            });
          } else {
            return false;
          }
        });
      }
    };
    const onClose = () => {
      if (elForms.value) {
        elForms.value.clearValidate();
      }
      dialogReviewShow.value = false;
    };
    return {
      // activeName,
      // handleClick,
      tableData,
      showAddBtn,
      editVersion,
      getList,
      appUpdate,
      formData,
      elForms,
      submitmBtn,
      isForce,
      dialogReviewShow,
      onClose,
      t,
      rules
    };
  }
});
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;

  .empty {
    height: 20px;
  }

  .dialogs {
    margin-top: -20px;
  }

  .blue-btn {
    cursor: pointer;
    color: #409eff;
  }
}
</style>
