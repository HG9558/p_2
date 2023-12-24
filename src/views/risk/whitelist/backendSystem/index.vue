<template>
  <div class="container">
    <el-dialog
      title="添加IP白名单"
      v-model="dialog.addClientDailog"
      width="500px"
      @close="onClose"
      :close-on-click-modal="false"
    >
      <el-form ref="elForms" :model="formData" label-width="auto" :rules="rules">
        <el-form-item :label="t('routes.system.IP_addr')" prop="ip">
          <el-input v-model="formData.ip" type="text" placeholder="请输入IP白名单地址" :disabled="dialog.isDisabled"></el-input>
        </el-form-item>
        <el-form-item :label="t('global.remark_txt') + ':'" prop="remark">
          <el-input
            type="textarea"
            v-model="formData.remark"
            maxlength="100"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :placeholder="t('global.remark')"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.addClientDailog = false">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="addIpAdress">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>

    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit" v-model="modelObjectv" ref="formSerchRef">
      <template #add>
        <el-button type="primary" @click="addIp" class="el-icon-plus btn">{{ t('global.increment') }}</el-button>
      </template>
    </formSerch>
    <vxe-grid v-bind="gridOptions" v-on="gridEvents" :max-height="globalTableHeight">
      <template #created_at="{ row }">{{ $filters.format(row.created_at, false) }}</template>
      <template #dropdowns="{ row }">
        <el-button type="danger" @click="deleteIpAddress(row)">{{ t('global.delete') }}</el-button>
      </template>
    </vxe-grid>
    <pagination-page v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, reactive } from 'vue';
import useSearchPlaceholder from './search';
import PageTable from '@/components/page-table/index.vue';
import { ElForm, ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { backCard, backCardTips } from '@/utils/expressions';
import { useI18n } from 'vue-i18n';
import { useConfigRules } from './rules';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import formSerch from '@/components/serch-form/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import { VxeGridListeners, VxeGridProps } from 'vxe-table';
import { tenantWhitelistDelete, tenantWhitelistInsert, tenantWhitelistList } from '@/http/modules/app';
import { store } from '@/store';

export default defineComponent({
  name: 'bankcards',
  components: { PageTable, formSerch },
  setup() {
    const { FormDataList } = useSearchPlaceholder();
    const listQuery = ref<RefObjectKeyRulesType>({});
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const elForms = ref<typeof ElForm | null>(null);
    const pageTable = ref<typeof ElTable | null>(null);
    const modelObjectv = ref<any>({});
    const formSerchRef = ref<any>();
    const { rules } = useConfigRules();
    const { t } = useI18n({ useScope: 'global' });
    const formData = ref<any>({});
    store.state.app.tableHeight = 1000;
    const dialog = ref({
      addClientDailog: false,
      title: '',
      isDisabled: false
    });

    // 搜索
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      getList();
    };

    // 查询列表
    function getList() {
      const params: any = {
        ty: 1,
        ...unref(listQuery.value),
        ...unref(pageQuery.value),
      };
      tenantWhitelistList(params).then(res => {
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

    // 新增
    const addIp = () => {
      dialog.value.title = t('routes.operation_manage_page.add');
      dialog.value.isDisabled = false;
      dialog.value.addClientDailog = true;
    };
    const addIpAdress = () => {
      if (elForms.value) {
        elForms.value.validate(async (valid: boolean) => {
          if (valid) {
            const result = await tenantWhitelistInsert({
              ty: 1,
              ip: formData.value.ip,
              remark: formData.value.remark
            });
            if (result.status) {
              ElMessage.success(t('global.add_suc'));
              onClose();
              getList();
            }
          }
        });
      }
    };

    // 重置
    function resetFields() {
      if (elForms.value) {
        (elForms.value as typeof ElForm).resetFields();
      }
    }
    // 关闭
    const onClose = () => {
      dialog.value.addClientDailog = false;
      formData.value = {};
      resetFields();
    };

    // 删除
    const deleteIpAddress = (row: any) => {
      console.log(row.id);
      ElMessageBox.confirm(t('是否删除这条 IP?'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        tenantWhitelistDelete({
          id: row.id
        })
          .then(res => {
            if (res.status) {
              if (pageTable.value) {
                pageTable.value.getList();
              }
              ElMessage.success({
                message: t('global.delete_suc'),
                type: 'success'
              });
              dialog.value.addClientDailog = false;
              getList();
            }
          });
      });
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
        { field: 'ip', title: t('routes.system.IP_addr'), minWidth: 180 },
        { field: 'remark', title: t('routes.agent.remark'), minWidth: 180 },
        { field: 'created_at', title: t('global.operating_time'), minWidth: 180, slots: { default: 'created_at' } },
        { field: 'created_name', title: t('routes.vip_list_page.oper_add_user'), minWidth: 180 },
        { field: 'area', title: t('routes.system.area'), minWidth: 180 },
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
      deleteIpAddress,
      onSubmit,
      addIpAdress,
      addIp,
      pagination,
      onClose,
      backCard,
      backCardTips,
      rules,
      FormDataList,
      pageTable,
      dialog,
      listQuery,
      pageQuery,
      modelObjectv,
      formSerchRef,
      formData,
      total,
      elForms,
      gridOptions,
      gridEvents,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  .red {
    color: #F56C6C;
  }
}
</style>
