<template>
  <div class="venues-list">
    <formSearch :FormDataList="FormDataList" @onSubmit="onSubmit"></formSearch>
    <vxe-grid v-bind="gridOptions" v-on="gridEvents" :max-height="globalTableHeight">
      <template #game_type="{ row }">{{ GameTypeListToText(row.game_type) }}</template>
      <template #maintained="{ row }">
        <vxe-switch :model-value="row.maintained" @click="selectMainChangeRow({ ...row })" :open-label="t('routes.site_page.normal')" :open-value="1"
                    :close-label="t('routes.site_page.w_h_z')"
                    :close-value="2"></vxe-switch>
      </template>
      <template #state="{ row }">
        <vxe-switch :model-value="row.state" @click="selectChangeRow({ ...row })" :open-label="t('routes.site_page.online')" :open-value="1" :close-label="t('routes.site_page.offline')" :close-value="2"></vxe-switch>
      </template>
      <template #updated_at="{ row }">{{ $filters.format(row.updated_at, false) }}</template>
      <template #dropdowns="{ row }">
        <el-button @click="selectEditRow({ ...row })">{{ t('global.edit') }}</el-button>
      </template>
    </vxe-grid>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />

    <el-dialog
      title="编辑场馆"
      v-model="dialogTableVisible"
      width="500px"
      @close="onClose"
      :close-on-click-modal="false"
    >
      <el-form ref="elForms" :model="formData" size="medium" label-width="auto">
        <el-form-item :label="t('routes.site_page.plat_name')">
          <el-input v-model="formData.name" disabled></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.plat_type')">
          <el-input v-model="formData.game_type" disabled></el-input>
        </el-form-item>
        <el-form-item :label="t('global.sortabled')" prop="seq" :rules="[
            {
            required: true,
            message: nine_tips,
            trigger: 'blur'
            },
            {
              pattern: one_nine,
              message: nine_tips
            }
          ]">
          <el-input v-model="formData.seq" :placeholder="nine_tips" @change="(value:string)=>{formData.seq=+value}"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
            <div class="btn">
              <el-button @click="onClose">{{ t('global.cancel') }}</el-button>
              <el-button type="primary" @click="handleUpdateMerchant(formData, 0)" :disabled="isLoad">{{ t('global.sure') }}</el-button>
            </div>
          </span>
      </template>
    </el-dialog>

    <!--场馆维护状态-->
    <el-dialog v-model="maintainedForm.dialogMaintainedVisible" width="600px" :close-on-click-modal="false">
      <template #title>
        <div class="flex ai-c jc-s">
          <span class="fs20">{{ t('routes.site_page.qh_wh_zt') }}</span>
        </div>
      </template>
      <el-form label-position="right" label-width="auto" :model="maintainedForm">
        <el-form-item :label="t('routes.site_page.plat_name') + ':'">
          <span>{{ maintainedForm.name }}</span>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.set_state')">
          <el-radio-group v-model="maintainedForm.maintained">
            <el-radio :label="1">{{ t('routes.site_page.normal') }}</el-radio>
            <el-radio :label="2">{{ t('routes.site_page.w_h_z') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('routes.agent.whsj')" v-if="maintainedForm.maintained == 3" prop="maintainedTime"
          :rules="[
            {
              required: true,
              message: t('routes.agent.ds_whsj'),
              trigger: 'change'
            }
          ]">
          <el-date-picker v-model="maintainedForm.maintainedTime" type="datetimerange"
            :range-separator="t('global.zhi')" :start-placeholder="t('global.start_date')"
            :end-placeholder="t('global.end_date')"></el-date-picker>
        </el-form-item>
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
          <el-input v-model="maintainedForm.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')"
            maxlength="6" />
        </el-form-item>
      </el-form>
      <div class="viplist_tip" style="padding-left: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0">
        <p>{{ t('global.warning') }}:</p>
        <p>{{ t('routes.site_page.start_tips') }}</p>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="maintainedForm.dialogMaintainedVisible = false">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="handleUpdateMerchant(maintainedForm,1 )">{{
            t('global.submit')
          }}</el-button>
        </div>
      </template>
    </el-dialog>

    <!--场馆状态-->
    <el-dialog v-model="stateForm.dialogStateVisible" width="600px" :close-on-click-modal="false">
      <template #title>
        <div class="flex ai-c jc-s">
          <span class="fs20">{{ t('routes.site_page.change_state') }}</span>
        </div>
      </template>
      <el-form label-position="right" label-width="auto" :model="stateForm">
        <el-form-item :label="t('routes.site_page.plat_name') + ':'">
          <span>{{ stateForm.name }}</span>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.set_state')">
          <el-radio-group v-model="stateForm.state">
            <el-radio :label="1">{{ t('routes.site_page.online') }}</el-radio>
            <el-radio :label="2">{{ t('routes.site_page.offline') }}</el-radio>
          </el-radio-group>
        </el-form-item>
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
          <el-input v-model="stateForm.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')"
            maxlength="6" />
        </el-form-item>
      </el-form>
      <div class="viplist_tip" style="padding-left: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0">
        <p>{{ t('global.warning') }}:</p>
        <p>{{ t('routes.site_page.start_tips') }}</p>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="stateForm.dialogStateVisible = false">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="handleUpdateMerchant(stateForm, 1)">{{ t('global.submit') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { getMerchantList, updateMerchant } from '@/http/modules/site';
import { ElForm, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { dynamic, dynamicMsg, nine_tips, one_nine } from '@/utils/expressions';
import { store } from '@/store';
import dayjs from 'dayjs';
import { format } from '@/filter/format';
import PageTable from '@/components/page-table/index.vue';
import formSearch from '@/components/serch-form/index.vue';
import { VxeGridListeners, VxeGridProps } from 'vxe-table';
import useSearchPlaceholder from './VenuseListSearch';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import { useConfigRules } from '@/views/risk/whitelist/backendSystem/rules';
import Pagination from '@/components/pagination/index.vue';

export default defineComponent({
  name: 'VenuesList',
  components: { PageTable, formSearch, Pagination },

  setup() {
    const { FormDataList, GameTypeListToText, toPlatformText } = useSearchPlaceholder();
    const listQuery = ref<RefObjectKeyRulesType>({});
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const elForms = ref<typeof ElForm | null>(null);
    const { rules } = useConfigRules();
    const { t } = useI18n({ useScope: 'global' });
    const formData = ref<any>({
      dialogFormVisible: false,
      seq: 0,
    });
    const currentData = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const maintainedForm = reactive({
      dialogMaintainedVisible: false,
      name: '',
      id: '',
      seq: '',
      code: '',
      maintained: 1,
    })
    const stateForm = reactive({
      dialogStateVisible: false,
      name: '',
      state: 1,
      id: '',
      seq: '',
      code: ''
    });
    const dialogTableVisible = ref<boolean>(false);
    store.state.app.tableHeight = 1000;

    // 搜索
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      getList();
    };

    // 查询列表
    function getList() {
      const params: any = {
        ...listQuery.value,
        ...pageQuery.value,
      };
      getMerchantList(params).then(res => {
        if (res.status) {
          gridOptions.data = res.data?.d || [];
          if (pageQuery.value.page == 1) {
            total.value = res?.data?.t||0;
          }
        }
      })
    }

    // 分页
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });

    // 更新场馆状态
    const handleUpdateMerchant = (item: any, flag: number) => {
      if (!dynamic.test(item.code) && flag == 1) {
        ElMessage.error(dynamicMsg);
        return;
      }
      if (!one_nine.test(item.seq) && flag == 0) {
        ElMessage.error(nine_tips);
        return;
      }
      // 如果是开启状态 弹框
      let params: any = {
        id: item.id,
        seq: item.seq,
      };

      if (flag === 1) {
        params.state = item.state;
        params.maintained = item.maintained
      }

      if (item.seq) {
        params.seq = item.seq;
      }
      updateMerchant(params)
        .then(res => {
          if (res.status) {
            stateForm.code = '';
            stateForm.dialogStateVisible = false;
            maintainedForm.dialogMaintainedVisible = false;
            onClose();
            ElMessage.success(t('global.update_suc'));
            getList();
          }
        })
        .catch(err => console.log(err));
    }
    const selectMainChangeRow = (item: any) => {
      maintainedForm.id = item.id;
      maintainedForm.name = item.name;
      maintainedForm.maintained = item.maintained;
      maintainedForm.seq = item.seq;
      maintainedForm.dialogMaintainedVisible = true;
      maintainedForm.code = '111111';
    }
    const selectChangeRow = (item: any) => {
      stateForm.id = item.id;
      stateForm.name = item.name;
      stateForm.state = item.state;
      stateForm.seq = item.seq;
      stateForm.dialogStateVisible = true;
      stateForm.code = '111111';
    }
    const selectEditRow = (item: any) => {
      console.log(item,'>>row');
      dialogTableVisible.value = true;
      formData.value.name = item.name;
      formData.value.game_type = GameTypeListToText(item.game_type);
      formData.value.seq = item.seq;
      formData.value.id = item.id;
    }

    // 重置
    function resetFields() {
      if (elForms.value) {
        (elForms.value as typeof ElForm).resetFields();
      }
    }
    // 关闭
    const onClose = () => {
      dialogTableVisible.value = false;
      formData.value = {};
      resetFields();
    };

    // 配置表格
    const gridOptions = reactive<VxeGridProps>({
      border: true,
      showOverflow: true,
      align: 'center',
      exportConfig: {},
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        keyField: 'id',
        isHover: true
      },
      columns: [
        { type: 'seq', title: t('routes.finance_manage_page.sort_num'), width: 60 },
        { field: 'id', title: t('routes.tips.cg_id'), minWidth: 180 },
        { field: 'name', title: t('routes.site_page.plat_name'), minWidth: 180 },
        { field: 'game_type', title: t('routes.site_page.plat_type'), minWidth: 180, slots: { default: 'game_type' } },
        { field: 'updated_at', title: t('routes.site_page.last_update_time'), minWidth: 180, slots: { default: 'updated_at' } },
        { field: 'seq', title: t('global.sortabled'), sortable: true, width: 80 },
        { field: 'maintained', title: t('routes.site_page.maintain_state'), minWidth: 180, slots: { default: 'maintained' } },
        { field: 'state', title: t('global.select_tip'), minWidth: 180, slots: { default: 'state' } },
        { field: 'title', title: t('global.operating'), width: 180, slots: { default: 'dropdowns' } },
      ],
      data: []
    });
    const gridEvents: VxeGridListeners = {
      formSubmit () {
        getList()
      }
    }

    return {
      onSubmit,
      pagination,
      onClose,
      selectEditRow,
      selectChangeRow,
      selectMainChangeRow,
      handleUpdateMerchant,
      nine_tips,
      one_nine,
      GameTypeListToText,
      toPlatformText,
      maintainedForm,
      stateForm,
      rules,
      FormDataList,
      listQuery,
      pageQuery,
      formData,
      total,
      elForms,
      gridOptions,
      gridEvents,
      dialogTableVisible,
      t
    };
  }
})
</script>

<style scoped lang="scss">
.venues-list {
  padding: 20px;
}
</style>
