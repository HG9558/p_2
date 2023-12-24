<template>
  <div class="container">
    <div class="card-title">
      <div class="empty"></div>
      <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit" v-model="modelObjectv" ref="formSerchRef">
        <template #add>
          <el-button type="primary" @click="add">{{ t('global.increment') }}</el-button>
        </template>
      </formSerch>
    </div>

    <AddSystem v-model="systemVisible.dialogFlashVisible" ref="AddStationRef" :datas="datas" :title="title" @checkList="getList" />
    <el-table :data="tableData" border style="width: 100%" :max-height="globalTableHeight">
      <el-table-column type="index" :label="t('global.sort')" align="center"></el-table-column>
      <el-table-column align="center" prop="title" :label="t('routes.tips.title')"></el-table-column>
      <el-table-column align="center" prop="content" :label="t('routes.tips.content')" min-width="100">
        <template #default="scope">
          <el-popover placement="top" trigger="hover" :width="400">
            <template #reference>
              <span v-html="scope.row.content" class="pop-content wids"></span>
            </template>
            <div class="popover-content" v-html="scope.row.content"></div>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="redirect_url" :label="t('routes.tips.href_link')"></el-table-column> -->

      <el-table-column align="center" prop="created_at" :label="t('global.creat_time')">
        <template #default="scope">
          {{ $filters.format(scope.row.created_at, false) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_name" :label="t('routes.operation_manage_page.operating_people')" width="115">
        <template #default="scope">
          <span v-html="scope.row.created_name"></span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="" :label="t('routes.operation_manage_page.operating')" width="170">
        <template v-slot="scope">
          <el-button type="text" @click="editRow(scope.row)">{{ t('global.edit') }}</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" v-if="scope.row.state == 0" @click="openUse(scope.row)">{{ t('routes.operation_manage_page.start') }}</el-button>
          <el-button type="text" v-if="scope.row.state == 1" @click="stopUse(scope.row)">{{ t('routes.operation_manage_page.stop') }}</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" :disabled="scope.row.state == 2" @click="deleteSystemContext(scope.row)">{{ t('global.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination-page v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, provide, onMounted, unref } from 'vue';
import useSearchPlaceholder from './search';
import PageTable from '@/components/page-table/index.vue';
import { ElTable, ElMessage, ElMessageBox } from 'element-plus';
import AddSystem from './AddSystem.vue';
import { systemTypeToText, getsystemNotificationTypeText } from '@/utils/selectOptions';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';
import _ from 'lodash';
import { RefObjectKeyRulesType } from '../../../components/serch-form/types';
import usePaginationHanlder from '../../../components/pagination/pagination';
import formSerch from '../../../components/serch-form/index.vue';
import { store } from '@/store';
export default defineComponent({
  name: 'operation-content',
  components: { PageTable, AddSystem, formSerch },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const listQuery = ref<RefObjectKeyRulesType>({});
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const tableData = ref([]);
    const { FormDataList } = useSearchPlaceholder();
    const modelObjectv = ref<any>({});
    const formSerchRef = ref<any>();
    const pageTable = ref<typeof ElTable | null>(null);
    const systemVisible = ref({
      dialogVisible: false,
      dialogDetail: false,
      dialogFlashVisible: false
    });
    const datas = ref();
    const title = ref();
    const AddStationRef = ref<any>(null);
    const noteTable = reactive({
      noteTableData: []
    });
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 900;
    } else {
      store.state.app.tableHeight = 600;
    }
    // 初始化
    onMounted(() => {
      getList();
    });

    const getData = () => {
      if (pageTable.value) {
        pageTable.value.getList();
      }
    };

    function getList() {
      const params: any = {
        ...unref(listQuery.value),
        ...unref(pageQuery.value)
      };
      APIs.content.postTenantNoticeList(params).then(res => {
        if (res.status) {
          tableData.value = res.data?.d;

          if (pageQuery.value.page == 1) {
            total.value = res?.data?.t;
          }
        }
      })
    }

    const URLdecode = (str:string) => {
      let ret = "";
      for(let i=0;i<str.length;i++) {
        let chr = str.charAt(i);
        if(chr == "+") {
          ret += " ";
        }else if(chr=="%") {
          var asc = str.substring(i+1,i+3);
          if(parseInt("0x"+asc)>0x7f) {
            ret += decodeURI("%"+ str.substring(i+1,i+9));
            i += 8;
          }else {
            ret += String.fromCharCode(parseInt("0x"+asc));
            i += 2;
          }
        }else {
          ret += chr;
        }
      }
      return ret;
    }

    provide('SystemNodeGetList', getData);
    const currentHanlder = (tableData: any) => {
      return _.sortBy(tableData, ['review_at', 'asc']).reverse();
      // return tableData;
    };
    const add = () => {
      title.value = t('global.increment');
      systemVisible.value.dialogFlashVisible = true;
      AddStationRef.value.showForm();
    };
    const deleteSystemContext = (row: any) => {
      ElMessageBox.confirm(t('routes.tips.sure_delete'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.content
          .getdelete({
            id: row.id
          })
          .then(res => {
            if (res.status) {
              ElMessage.success(t('global.deletesuc'));
              getData();
              getList();
            }
          });
        // ElMessage.success({
        //   message: '已删除',
        //   type: 'success'
        // });
      });
    };
    const remark = ref<any>();

    const editRow = (row: any) => {
      let obj: any = Object.assign({}, row);
      title.value = t('global.edit');
      systemVisible.value.dialogFlashVisible = true;
      let ti = obj.title;
      let co = obj.content;
      obj.title = ti.split('&nbsp;').join(' ');
      obj.content = co.split('&nbsp;').join(' ');
      AddStationRef.value.showForm(obj);
    };
    const openUse = (row: any) => {
      ElMessageBox.confirm(t('routes.tips.start_tips'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.content
          .poststate({
            id: row.id,
            state: 2
          })
          .then(res => {
            if (res.status) {
              ElMessage.success({
                message: t('routes.tips.start_already'),
                type: 'success'
              });
              systemVisible.value.dialogVisible = false;
              getData();
              getList();
            }
          });
      });
    };

    // 搜索
    const onSubmit = (data: any) => {
        console.log(data);
        pageQuery.value.page = 1;
        listQuery.value = data;
        getList();
    };

    // 分页
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });

    const stopUse = (row: any) => {
      ElMessageBox.confirm(t('routes.tips.stop_tips'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.content
          .poststate({
            id: row.id,
            state: 1
          })
          .then(res => {
            if (res.status) {
              ElMessage.success({
                message: t('routes.tips.stop_already'),
                type: 'success'
              });
              systemVisible.value.dialogVisible = false;
              getData();
              getList();
            }
          });
      });
    };
    return {
      FormDataList,
      modelObjectv,
      currentHanlder,
      pageTable,
      getData,
      add,
      deleteSystemContext,
      systemVisible,
      editRow,
      openUse,
      stopUse,
      getList,
      ...toRefs(noteTable),
      systemTypeToText,
      URLdecode,
      datas,
      AddStationRef,
      title,
      listQuery,
      total,
      pageQuery,
      onSubmit,
      pagination,
      getsystemNotificationTypeText,
      remark,
      tableData,
      formSerchRef,
      t,
    };
  }
});
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .blue-cursor {
    color: #409eff;
    cursor: pointer;
  }
  .red {
    color: #F56C6C;
  }
  .green {
    color: #67C23A;
  }
  .empty {
    height: 20px;
  }
  .pop-content {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  .wid {
    width: 400px;
  }
  .wids {
    width: 400px;
  }
  .widh {
    width: 400px;
  }
}
</style>
