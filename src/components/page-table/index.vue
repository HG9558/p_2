<template>
  <div class="page_table_layout">
    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit" :firstload="firstload" class="mgt-10" :myShortcuts='myShortcuts'>
      <template #csv>
        <slot name="csv"></slot>
        <slot name="add"></slot>
      </template>
    </formSerch>
    <div class="line_content" v-if="$slots.batch">
      <slot name="batch"></slot>
    </div>
    <el-table
      :data="tableData"
      @selection-change="selectionLineChangeHandle"
      ref="tebleRef"
      align="center"
      border
      :summary-method="getSummaries(summaries, cloumBai, allNum)"
      :show-summary="showsummary"
      style="width: 100%"
      :max-height="globalTableHeight"
    >
      <el-table-column v-if="isselection" align="center" type="selection" width="55"> </el-table-column>
      <slot></slot>
    </el-table>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" v-model:limit="pageQuery.limit" @pagination="pagination"></Pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, unref } from 'vue';
import { FormData } from '@/components/serch-form/types';
import { ElTable } from 'element-plus';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import formSerch from '@/components/serch-form/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import useTableStyle, { getSummaries } from '@/utils/table';
import Pagination from '@/components/pagination/index.vue';
import http from '@/http/core';

export default defineComponent({
  name: 'PageTable',
  components: { formSerch, Pagination },
  props: {
    // 搜索框数据
    FormDataList: {
      type: Array as PropType<FormData[]>,
      default: []
    },
    // 是否第一次加载
    firstload: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    isNew: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    // 页面请求url地址
    url: {
      type: String as PropType<string>,
      required: true
    },
    // 请求方法
    methods: {
      type: String as PropType<string>,
      default: 'get'
    },
    // 列表数据如需特殊处理的执行函数
    listHanlder: {
      type: Function as PropType<(data: any, agg?: any) => any>
    },
    // 其它请求数据，列如uid，username，通过provide注入之类的
    special_params: {
      type: Object as PropType<RefObjectKeyRulesType>,
      default: {}
    },
    // 移除表格底部计算总数的prop字段
    summaries: {
      type: Array as PropType<any[]>,
      default: []
    },
    // 是否支持多选，如果支持多选，那么使用ref调用getSelectLineData可以获取返回选中的数据
    isselection: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    cloumBai: {
      type: Array as PropType<any[]>,
      default: []
    },
    allNum: {
      type: Array as PropType<any[]>,
      default: []
    },
    showsummary: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    myShortcuts: {
      type: Array,
      default: []
    }
  },
  emits: [],
  setup(props, ctx) {
    // 控制分页
    const pageQuery = ref<RefObjectKeyRulesType>({});
    // 控制搜索框数据
    const listQuery = ref<RefObjectKeyRulesType>({});
    // 表格数据
    const tableData = ref<any[]>([
      // {
      //   id: '123123',
      //   amount: '3423',
      //   cid: 1,
      //   state: '361'
      // },
      // {
      //   id: 'ASDFASDF',
      //   amount: '342334',
      //   cid: 1,
      //   state: '362'
      // }
    ]);
    const totalCount = ref<number>();
    // 分页功能
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    // 表格选中数据
    let tableSelectData: any = [];
    const tebleRef = ref<typeof ElTable | null>(null);
    if (tebleRef.value) {
      tebleRef.value.doLayout();
    }
    const selectionLineChangeHandle = (val: any) => {
      tableSelectData = val;
    };
    // 返回选中的数据
    const getSelectLineData = () => {
      return tableSelectData;
    };
    // 设置表格的行尾总结栏目style
    useTableStyle();
    type Method = 'get' | 'post' | 'put' | 'delete';
    function getList() {
      let params: any = {
        ...unref(pageQuery.value),
        ...unref(listQuery.value),
        ...props.special_params
      };
      if (props.methods === 'get') {
        params = {
          params: params
        };
      }
      http[props.methods as Method](props.url, params).then(res => {
        // tableData.value = [];
        // total.value = 0;
        // tableData.value = [];
        if (res.status) {
          if (!res.data) return tableData.value = [];
          if (props.methods === 'get') {
            if (params.params.page == 1) {
              total.value = res.data.t;
            }
          } else {
            if (params.page == 1) {
              total.value = res.data.t;
            }
          }
          const { d = Array.isArray(res.data) ? res.data : null } = res.data;
          const resData = d;
          if (!resData) {
            tableData.value = [];
            return;
          }
          if (resData) {
            if (props.listHanlder) {
              tableData.value = props.listHanlder(resData, res.data) || [];
            } else {
              tableData.value = resData;
            }
          } else {
            if (props.listHanlder) {
              tableData.value = props.listHanlder(resData, res.data) || [];
            }
          }
        } else {
          tableData.value = [];
        }
      });
    }

    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      listQuery.value.real_name = data.real_name || '';
      getList();
    };
    return {
      pageQuery,
      listQuery,
      tableData,
      total,
      pagination,
      onSubmit,
      getSummaries,
      selectionLineChangeHandle,
      getSelectLineData,
      tebleRef,
      getList
    };
  }
});
</script>
<style lang="scss" scoped>
.line_content {
  margin-bottom: 20px;
}
</style>
