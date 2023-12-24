import { toFixedNReport } from '@/utils/int';
import { export_csvfn } from '@/utils/file';
import {
  defineComponent,
  ref,
  reactive,
  type PropType,
  computed,
  defineExpose,
} from 'vue';
import type { VxeGridProps, VxeTableInstance, VxeTableDefines } from 'vxe-table';
import { genDataList, SearchType } from './genData'
import { useExpose } from './useExpose';
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from '@/locales';

type TableExportHandle = {
  onSubmit: (params: any) => void;
  getListData: () => void;
  delete: (params: any, argu: []) => void;
  changeStatus: (params: any, argu: []) => void;
  setSerchFormData: (key: any, val: any) => void;
};
type ApiCaller = (params: any) => Promise<any>;
type Obj = Record<string, any>;
type OtherConfigType = {
  label?: string;
  model?: string;
  max?: string;
  isSearch?: boolean;
  searchType?: SearchType;
  options?: any[];
  modelNameArray?: any;
  isMultiple?: boolean;
  otherSearch?: any;
}

export type ColumnsProp = VxeTableDefines.ColumnOptions & {
  handle?: (params?: any, type?: string) => void;
  otherConfig?: OtherConfigType;
}

export const tableProProps = {
  ifGet: {
    type: Boolean,
    required: true,
    default: true,
  },
  listApi: {
    type: Function as PropType<ApiCaller>,
    required: true,
    default: () => { },
  },
  deleteApi: {
    type: Function as PropType<ApiCaller>,
    required: false,
    default: () => { },
  },
  changeStatusApi: {
    type: Function as PropType<ApiCaller>,
    required: false,
    default: () => { },
  },
  columns: {
    type: Array as PropType<ColumnsProp[]>,
    required: true,
    default: () => [],
  },
  // 小记
  subtotalFooterArray: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  // 总计
  totalFooterArray: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  isExport: {
    type: Boolean,
    required: false,
    default: false,
  },
  exportName: {
    type: String,
    required: false,
    default: '',
  },
};

const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach(item => {    
    let aa =item[field]&&(item?.[field]+'')?.replace(/,/g, "");
    count += Number(aa);
  });
  return toFixedNReport(count);
};

export default defineComponent({
  name: 'TablePro',
  props: tableProProps,
  setup(props, { slots }) {
    const searchData = ref({});
    const totalFooterData = ref<Obj>({});
    const formRef = ref<any>(null);

    // 配置表格
    const gridOptions: VxeGridProps = reactive<VxeGridProps>({
      border: true,
      showOverflow: true,
      showFooter: true,
      align: 'center',
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        isHover: true
      },
      data: [],
      columns: props.columns,
      footerMethod({ columns, data }) {
        if (!paginationProps.total) return [];
        let subtotalArr: any = [];
        let totalArr: any = [];
        if (props.subtotalFooterArray.length > 0) {
          subtotalArr = [
            columns.map((column, columnIndex) => {
              if (columnIndex === 0) {
                return i18n.global.t('global.count')
              }
              if (props.subtotalFooterArray.includes(column.field)) {
                return sumNum(data, column.field)
              }
              return ''
            }),
          ];
        }

        if (props.totalFooterArray.length > 0) {
          totalArr = [
            columns.map((column, columnIndex) => {
              if (columnIndex === 0) {
                return i18n.global.t('global.total')
              }
              if (props.totalFooterArray.includes(column.field)) {
                let str = '';
                if (column.field.includes('count')) {
                  str = totalFooterData.value[column.field];
                } else if (['profit_amount'].includes(column.field)) { // 特例
                  str = `${toFixedNReport(totalFooterData.value[column.field] * 100, 2)}%`;
                } else {
                  str = toFixedNReport(totalFooterData.value[column.field]);
                }
                return str;
              }
              return ''
            }),
          ];
        }

        return [...subtotalArr, ...totalArr];
      },
    });

    const searchFormDataComputed = computed(() => {
      return genDataList(props.columns);
    })

    // 表格实例
    const gridRef = ref<VxeTableInstance>();
    // 分页props
    const paginationProps = reactive({
      page: 1,
      page_size: 10,
      total: 0,
    });

    const dropdownData = reactive({
      list: [
        // {
        //   label: '导出当前页',
        //   value: '1',
        // },
        {
          label: i18n.global.t('routes.report_center_page.d_c'),
          value: '2',
        },
      ],
      value: '2',
    });

    // 处理返回的数据
    const handleData = (data: any[]) => {
      const list = data.map(item => {
        const obj = { ...item }
        const keys = Object.keys(obj);
        keys.forEach(key => {
          const _ = props.columns?.find(ele => ele.field === key);
          if (_?.handle) {
            obj['origin_' + key] = obj[key];
            obj[key] = _?.handle(obj, key);
          }
        })
        return obj;
      });
      return list;
    }

    const getListData = () => {
      setTimeout(() => {
        if (props.ifGet) getInfo();
      }, 0);
    };

    const getInfo = async () => {
      try {
        const params = {
          page: paginationProps.page,
          page_size: paginationProps.page_size,
          ...searchData.value,
        }
        const { status, data: { d, t, agg } } = await props.listApi(params);
        if (status === true) {
          gridOptions.data = handleData(d || []);
          if (params.page == 1) {
            paginationProps.total = t;
            if (agg) {
              totalFooterData.value = agg;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // serch-form提交事件
    const onSubmit = (data: any) => {
      paginationProps.page = 1;
      searchData.value = { ...data };
      getListData();
    };

    // 分页事件
    const paginationEvent = (params: any) => {
      getListData();
    };

    const pagination = () => {
      return paginationProps.total > 0 ? <pagination-page total={paginationProps.total} v-models={[
        [paginationProps.page_size, 'limit'],
        [paginationProps.page, 'page'],
      ]} onPagination={paginationEvent} /> : null;
    };

    const exportAll = async () => {
      const pageSize = 1000;
      const t = paginationProps.total;
      if (t <= 0) return;
      const promiseList = [];
      const totalPage = Math.ceil(t / pageSize);
      for (let i = 1; i <= totalPage; i++) {
        // TODO 链式
        promiseList.push(
          {
            ...await props.listApi({
              page: i,
              page_size: pageSize,
              ...searchData.value,
            })
          }
        );
      }
      Promise.all(promiseList).then(res => {
        let data = res.map(item => handleData(item.data?.d || [])).flat();
        data = data.map((it: any) => {
          return {
            ...it,
            id: '\t' + it.id,
            created_at: '\t' + it.created_at,
            updated_at: '\t' + it.updated_at,
            pay_at: '\t' + it.pay_at,
          }
        })
        const arr = props.columns.filter((item: any) => (item.field !== 'operate' && !['expand', 'seq'].includes(item.type))); // TODO
        const fields: any = arr?.map(item => {
          return {
            label: item.title,
            value: item.field,
          }
        })
        export_csvfn({
          data,
          fields,
          name: props.exportName,
        })
      });
    }

    const exportHanlder = (type: 'item' | 'parent', value?: string) => {
      if (type === 'item') {
        dropdownData.value = value || '1';
      }

      if (dropdownData.value === '1') {
        const $table = gridRef.value
        $table?.exportData({ type: 'csv' })
        return
      }

      // 导出所有
      if (dropdownData.value === '2') {
        exportAll();
        return
      }
    }

    const exportDom = () => {
      return (
        <el-button type="primary" style={{ display: props.isExport ? '' : 'none' }} onClick={() => exportHanlder('parent')}>{ i18n.global.t('routes.report_center_page.d_c') }</el-button>
        // <el-dropdown split-button type="primary" style={{ paddingLeft: '10px', display: props.isExport ? '' : 'none' }} onClick={() => exportHanlder('parent')} v-slots={{
        //   default: () => <span>{dropdownData.list.find(item => item.value === dropdownData.value)?.label}</span>,
        //   dropdown: () => (
        //     <el-dropdown-menu >
        //       {dropdownData.list.map(item => {
        //         return (
        //           <el-dropdown-item onClick={() => exportHanlder('item', item.value)}>{item.label}</el-dropdown-item>
        //         )
        //       })}
        //     </el-dropdown-menu>
        //   )
        // }}>
        // </el-dropdown>
      )
    }


    const deleteRow = (row: any, argu: []) => {
      const param: Obj = {}
      argu.forEach((item: any) => {
        param[item] = row[`origin_${item}`] || row[item]
      })

      ElMessageBox.confirm(
        '确定删除吗？',
        '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(async () => {
          try {
            const { status } = await props.deleteApi(param)
            if (status === true) {
              ElMessage.success('删除成功')
              getListData()
            }
          } catch (error) {
            ElMessage.error('删除失败')
          }
        })
        .catch(() => { })
    }

    const changeStatus = (row: any, argu: []) => {
      const param: Obj = {}
      let str: any = argu.pop();
      let arr = str.split(',');
      argu.forEach((item: any, ind: number) => {
        param[item] = row[`origin_${item}`] || row[item]
        if (ind === 1) param[item] = row[item] == arr[0] ? arr[1] : arr[0];
      })
      console.log(row, param);
      ElMessageBox.confirm(
        '您确定要提交吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(async () => {
          try {
            const { status } = await props.changeStatusApi(param)
            if (status === true) {
              ElMessage.success('修改成功')
              getListData()
            }
          } catch (error) {
            ElMessage.error('修改失败')
          }
        })
        .catch(() => { })
    }

    const setSerchFormData = (key: string, val: string) => {
      console.error(formRef.value)
      formRef.value?.setSerchFormData(key, val);
    }

    useExpose<TableExportHandle>({
      onSubmit,
      getListData,
      changeStatus: changeStatus,
      delete: deleteRow,
      setSerchFormData
    })

    return () => (
      <div style="padding: 20px">
        <form-serch
          ref={formRef}
          FormDataList={searchFormDataComputed.value}
          onOnSubmit={onSubmit}
          v-slots={{
            csv: () => exportDom(),
            add: () => slots.add?.(),
          }}
        ></form-serch>
        {slots.tool?.()}
        <vxe-grid ref={gridRef} {...gridOptions} v-slots={slots}></vxe-grid>
        {pagination()}
      </div>
    );
  },
});