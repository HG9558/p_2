<template>
  <div>
    <div class="betting-cont">
      <div class="betting-table">
        <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit" :firstload="true">
        </formSerch>
        <el-table :data="tableData" border style="width: 100%" :max-height="globalTableHeight">
          <el-table-column type="index" :label="t('global.sort')" align="center" width="70"></el-table-column>
          <el-table-column prop="phone" :label="t('routes.vip_list_page.email')" align="center"> </el-table-column>
          <el-table-column prop="code" :label="t('routes.tips.yx_yzm')" align="center">
            <template #default="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_at" :label="t('global.send_time')" align="center" width="180">
            <template #default="scope">
              {{ $filters.format(scope.row.create_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" :label="t('routes.tips.cgsj')" align="center" width="180">
            <template #default="scope">
              <span v-if="scope.row.state == 1"></span>
              <span v-if="scope.row.state == 2">{{ $filters.format(+scope.row.updated_at, false) }}</span>
              <span v-if="scope.row.state == 3">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="IP" align="center"></el-table-column>
          <el-table-column prop="state" :label="t('global.codeStatus')"  align="center">
            <template #default="scope">
              <div>
                {{stateList[scope.row.state]}}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="empty"></div>
        <el-pagination
          v-if="totalCount"
          v-model:currentPage="curPage"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="totalCount"
          @size-change="sizesChangeHandler"
          @current-change="gotoPage"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import useSearchPlaceholder from './search_email';
import Pagination from '@/components/pagination/index.vue';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
import { format } from '../../../../filter';
import { appendBRL, toFixedNReport } from '../../../../utils/int';
import { qudaoType, regOriginOptionsToText } from '../../../../utils/selectOptions';
import { export_csvfn } from '../../../../utils/file';
import { ElMessage } from 'element-plus';
import { store } from '@/store';

export default defineComponent({
  name: 'EmailQuery',
  components: { formSerch, Pagination },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const stateList={
      '':t('global.checkall'),
      '1':t('routes.tips.wsy'),
      '2':t('global.success'),
      '3':t('global.filed'),
    }
    const totalCount = ref(0);
    const pageSize = ref(20);
    const curPage = ref(1);
    const listQuery = ref<RefObjectKeyRulesType>({});
    const tableData = ref<any>([]);
    const endTime = ref();
    const { FormDataList } = useSearchPlaceholder();
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 1000;
    } else {
      store.state.app.tableHeight = 650;
    }
    const onSubmit = (data: any) => {
      if (!data.start_time && !data.end_time) {
        ElMessage.error({
          message: t('routes.tips.choose_time_tips'),
          type: 'error'
        });
      } else {
        curPage.value = 1;
        listQuery.value = data;
        getList();
      }
    };
    function getList() {
      const params: any = {
        page: curPage.value,
        page_size: pageSize.value,
        ...listQuery.value
      };
      APIs.codequery.mailList(params).then(res => {
        tableData.value = [];
        if (res.status) {
          tableData.value = res.data?.d;
          if (curPage.value == 1) {
            totalCount.value = res?.data?.t;
          }
        }
      });
    }

    const sizesChangeHandler = (sizes: number) => {
      pageSize.value = sizes;
      getList();
    };

    const gotoPage = (page: number) => {
      curPage.value = page;
      getList();
    };

    // 导出
    const getListItem = (page: number) => {
      return new Promise((resolve, reject) => {
        let obj = {
          ...listQuery.value,
          page,
          page_size: 20
        };
        APIs.codequery.mailList(obj).then((res: any) => {
          if (res.status) {
            resolve(res.data.d ?? []);
          } else {
            resolve([]);
          }
        });
      });
    };

    // 导出csv
    const exportHanlder = () => {
      const PromiseList: any[] = [];
      const total_page = Math.ceil(totalCount.value / 20);
      for (let page = 1; page <= total_page; page++) {
        PromiseList.push(getListItem(page));
      }
      // 并发请求
      Promise.all(PromiseList).then(res => {
        const result: any = [].concat.apply([], res).sort();
        const data = result.map((item: any) => {
          return {
            username: item.username,
            phoen: item.phone,
            code: item.code,
            created_at: format(+item.create_at + 0, false),
            outTime: item.state == 2 ? format(+item.create_at + 10 * 60, false) : (item.state == 3 ? '-' : ''),
            ip: item.ip,
            state: stateList[item.state],
          };
        });
        const fields: any = [
          { label: t('global.username'), value: 'username' },
          { label: t('routes.vip_list_page.email'), value: 'phone' },
          { label: t('routes.tips.yx_yzm'), value: 'code' },
          { label: t('global.send_time'), value: 'created_at' },
          { label: t('routes.tips.cgsj'), value: 'outTime' },
          { label: 'IP', value: 'ip' },
          { label: t('global.codeStatus'), value: 'state' },
        ];
        export_csvfn({ data, fields, name: `${t('routes.member_manage_children.verc')}${listQuery.value.start_time}-${listQuery.value.end_time}` });
      });
    };
    return {
      onSubmit,
      exportHanlder,
      sizesChangeHandler,
      gotoPage,
      qudaoType,
      FormDataList,
      tableData,
      listQuery,
      curPage,
      t,
      endTime,
      totalCount,
      pageSize,
      stateList
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

  .betting-tables {
    margin-top: 10px;
  }

  .empty {
    height: 20px;
  }

  .no-code {
    color: #9d4d00;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
