<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form
      :model="queryParams"
      ref="queryFormEl"
      size="small"
      :inline="true"
      label-width="auto"
    >
      <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input
          v-model="queryParams.uid"
          :placeholder="t('routes.risk.userid_tips')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="day">
        <el-button
          class="ml10"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >{{ t("global.search") }}</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{
          t("global.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="listData">
      <el-table-column
        :label="t('routes.tips.zd_id')"
        align="center"
        prop="bill_no"
      />
      <el-table-column
        :label="t('routes.activity.userId')"
        align="center"
        prop="uid"
      />
      <el-table-column
        :label="t('routes.activity.username')"
        align="center"
        prop="username"
      />
      <el-table-column
        :label="t('global.principal') + '(R$)'"
        align="center"
        prop="capital_amount"
      />
      <el-table-column
        :label="t('global.bio_bs')"
        align="center"
        prop="flow_multiple"
      />
      <el-table-column
        :label="t('global.need_flow')"
        align="center"
        prop="flow_amount"
      />
      <el-table-column
        :label="t('routes.vip_list_page.flow_over')"
        align="center"
        prop="finished_amount"
      />
      <el-table-column
        :label="t('routes.vip_list_page.flow_no')"
        align="center"
        prop="unfinished_amount"
      />
      <el-table-column
        :label="t('global.type')"
        align="center"
        prop="ty"
        :formatter="(row: any) => formatterFn(row.ty, flowType)"
      />
      <el-table-column
        prop="created_at"
        :label="t('routes.finance_manage_page.startT')"
        align="center"
        width="150"
      >
        <template #default="{ row }">{{
          $filters.format(row.start_at, true)
        }}</template>
      </el-table-column>
      <el-table-column
        :label="t('global.state')"
        align="center"
        prop="flag"
        :formatter="(row: any) => formatterFn(row.state, typeOptions)"
      />
      <el-table-column
        prop="created_at"
        :label="t('routes.finance_manage_page.entT')"
        align="center"
        width="150"
      >
        <template #default="{ row }">{{
          $filters.format(row.finish_at, true)
        }}</template>
      </el-table-column>
      <el-table-column
        :label="t('routes.vip_list_page.superior_agency')"
        align="left"
        prop="parent_name"
      />
      <el-table-column
        prop="created_at"
        :label="t('global.creat_time')"
        align="center"
        width="150"
      >
        <template #default="{ row }">{{
          $filters.format(row.created_at, true)
        }}</template>
      </el-table-column>
      <el-table-column
        :label="t('global.remark_txt')"
        align="left"
        prop="remark"
        width="150"
      >
        <template #default="{ row }">
          <el-popover
            placement="top-start"
            trigger="hover"
            :content="row.remark"
          >
            <template #reference>
              <span class="remark">{{ row.remark }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      v-show="total > 0"
      :total="total"
      v-model:current-page="queryParams.page"
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size"
      @current-change="getList"
      @size-change="getList"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import type { ElForm } from "element-plus";
import { getFlowList } from "@/http/modules/risks";
import { flowType } from "@/utils/selectOptions";
type FormInstance = typeof ElForm;
export default defineComponent({
  name: "signRewardList",
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const queryFormEl = ref<FormInstance | null>(null);
    const total = ref();
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      uid: "",
    });
    const typeOptions = [
      {
        label: t("global.checkall"),
        value: "",
      },
      {
        label: t("routes.operation_manage_page.ing"),
        value: "1",
      },
      {
        label: t("global.over"),
        value: "2",
      },
    ];
    const formatterFn = (val: any, options: any[]) => {
      const res = options.find((item) => String(item.value) === String(val));
      return res?.label ?? "-";
    };
    const listData = ref([]);
    const getList = () => {
      getFlowList(queryParams).then((res: any) => {
        if (res.status) {
          if (queryParams.page === 1) {
            total.value = res?.data?.t;
          }
        }
        listData.value = res.data.d;
      });
    };
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        queryParams.page = 1;
      }
      getList();
    };
    const handleQuery = () => {
      queryParams.page = 1;
      getList();
    };
    getList();
    //
    return {
      queryParams,
      total,
      listData,
      queryFormEl,
      t,
      getList,
      formatterFn,
      resetQuery,
      handleQuery,
      typeOptions,
      flowType,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.el-descriptions__body) {
  > table > tbody > tr {
    display: flex;
    width: 718px;

    // gap: 10px;
    > td {
      width: 33.33%;
      font-size: 14px;

      .el-descriptions__label {
        font-weight: bolder;
        color: #000;
        width: 100%;
      }
    }

    > th {
      width: 33.33%;
    }
  }

  tr + tr {
    // border-top:1px dashed #efefef ;
    // padding-top: 10px;
  }
}
.remark {
  width: 150px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
