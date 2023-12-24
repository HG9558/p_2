<template>
  <div class="turnover-container">
    <p class="empty"></p>
    <el-dialog :title="title" v-model="dialogConfig" width="500px" @close="onClose" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto"
        :close-on-click-modal="false">
        <el-form-item :label="t('routes.site_page.set_name')" prop="name">
          <el-input v-model="formData.name" :placeholder="t('routes.site_page.pz_name_tips')" clearable :disabled="isDisabled"
            :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item :label="t('global.bio_bs')" prop="flow_multiple">
          <el-input-number v-model="formData.flow_multiple" :placeholder="t('routes.tips.enter_number')" :min="0"
            controls-position="right" :style="{ width: '100%' }"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="submitmBtn">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="name" :label="t('routes.site_page.set_name')" sortable align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="flow_multiple" :label="t('global.bio_bs')"  align="center">
      </el-table-column>
      <el-table-column prop="ty" :label="t('global.type')" align="center">
      </el-table-column>
      <el-table-column prop="" :label="t('global.operating')" align="center" min-width="140">
        <template #default="scope">
          <el-button type="text" @click="editTurnover(scope.row)">{{ t('global.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryForm.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryForm.page_size" @current-change="getList" @size-change="getList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'Turnover',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const tableData = ref<any>([]);
    const formData = ref<any>({});
    const TurnoverRef = ref<any>(null);
    const numBer = ref<number>();
    const elForm = ref<typeof ElForm | null>(null);
    const queryForm = ref({
      page_size:10,
      page:1,
    })
    const total = ref();
    const dialog = reactive({
      dialogConfig: false,
      title: '',
      isDisabled: true,
      useTurnoverNum: '13',
      TurnoverTitle: ''
    });
    getList();
    // 获取turnover列表
    function getList() {
      APIs.vipconfig.turnoverList(queryForm.value).then(res => {
        if (res.status) {
          tableData.value = [];
          if (res.data.d) {
            tableData.value = _.sortBy(res.data.d, ['id', 'asc']);
            queryForm.value.page===1 && (total.value = res.data.t);
          }
        }
      });
    }
    const editTurnover = (row: any) => {
      dialog.title = t('global.edit');
      dialog.isDisabled = true;
      formData.value = Object.assign({}, row);
      dialog.dialogConfig = true;
    };
    // 编辑Turnover
    function submitmBtn() {
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            const LastForm = {
              ...formData.value,
            }
              APIs.vipconfig.turnoverUpdate(LastForm).then(res => {
                if (res.status) {
                  getList();
                  ElMessage.success({
                    message: t('global.editsuc'),
                    type: 'success'
                  });
                  dialog.dialogConfig = false;
                }
              });
          } else {
            return false;
          }
        });
      }
    }
    const cancel = () => {
      if (elForm.value) {
        elForm.value.clearValidate();
      }
      dialog.dialogConfig = false;
    };
    const onClose = () => {
      formData.value = {};

      if (elForm.value) {
        elForm.value.clearValidate();
      }
    };
    const rules = reactive([]);
    return {
      tableData,
      submitmBtn,
      formData,
      queryForm,
      total,
      ...toRefs(dialog),
      onClose,
      TurnoverRef,
      editTurnover,
      rules,
      elForm,
      cancel,
      getList,
      t,
      numBer
    };
  }
});
</script>
<style lang="scss" scope>
.turnover-container {
  padding: 1px 20px;
  padding-bottom: 50px;
  background: white;

  .empty {
    height: 20px;
  }

  a {
    text-decoration: none;
  }
}
</style>
