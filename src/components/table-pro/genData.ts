import type { ColumnsProp } from "./index"

export type SearchType = 'composite|input' | 'composite|datetimerange' | 'date' | 'doubleInput' | 'input' | 'month' | 'select' | 'datetimerange' | 'daterange'

const searchFormList = [
  {
    type: 'composite',
    model: 'xxxxx',  // label对应的字段
    modelName: '1', // 对应【option】选项的value值
    selectType: 'input',
    valueModel: 'device', // 输入框对应的字段
    width: 350, // label的宽度
    options: [
      {
        value: '1',
        label: '选项1',
        placeholder: '请输入选项1'
      },
      {
        value: '2',
        label: '选项2',
        placeholder: '请输入选项2'
      }
    ]
  },
  {
    type: 'composite',
    model: 'xxxxx', // label对应的字段
    selectType: 'datetimerange',
    modelName: '1', // 对应【option】选项的value值,
    width: 100, // label的宽度
    modelNameArray: ['start_time', 'end_time'], // 时间对应的字段
    options: [
      {
        value: '1',
        label: '选项1'
      },
      {
        value: '2',
        label: '选项2'
      }
    ],
    rules: [{ required: true, message: '验证', trigger: 'change' }]
  },
  {
    label: 'Label名称',
    model: 'xxxxxx',
    type: 'date',
    placeholder: '请选择Label名称',
  },
  {
    label: 'Label名称',
    type: 'doubleInput',
    model: 'xxxxxx', //字段名称
    max: 'xxxxxx', //字段名称
  },
  {
    type: 'input',
    label: 'Label名称',
    model: 'xxxxx', // 字段
    width: '250px', // 宽度【可选】
    placeholder: '请输入Label名称',
  },
  {
    label: 'Label名称',
    model: 'xxxxxx',
    type: 'month',
    placeholder: '请选择Label名称',
  },
  {
    type: 'select',
    label: 'Label名称',
    multiple: false, // 是否多选【可选】
    options: [
      {
        label: '张三',
        value: 'zhangsan'
      },
    ],
    placeholder: '请选择Label名称',
    model: 'xxxxxx', // 字段
    default: ''
  },
  {
    label: 'Label名称',
    type: 'datetimerange',
    modelNameArray: ['start_time', 'end_time'],
    default: null
  },
  {
    label: 'Label名称',
    type: 'daterange',
    modelNameArray: ['start_time', 'end_time'],
    // default: null // 默认是否为空
  }
]

/**
 * 生成搜索表单数据
 * @param data 
 * @returns 
 */
export const genDataList = (data: ColumnsProp[]) => {
  const searchList = data.filter((item) => item.otherConfig?.isSearch);
  const list: any = [];
  searchList.forEach((item) => {
    const obj = searchFormList.find((searchItem) => {
      const _type = item.otherConfig?.searchType?.split('|');
      if (_type) {
        if (_type?.length > 1) {
          return _type[0] === searchItem.type && _type[1] === searchItem.selectType;
        }
        return _type[0] === searchItem.type
      }
    });

    if (item.otherConfig?.otherSearch) {
      list.push(item.otherConfig?.otherSearch);
    } else if (obj && ['date', 'doubleInput', 'input', 'month', 'select', 'datetimerange', 'daterange'].includes(item.otherConfig?.searchType as SearchType)) {
      obj.model = item.field;
      obj.label = item.title;
      obj.placeholder = `${item.otherConfig?.searchType === 'select' ? '全部' : '请输入' + item.title}`;
      if (item.otherConfig?.searchType === 'select') {
        obj.options = item.otherConfig?.options;
        obj.multiple = item.otherConfig?.isMultiple;
      }
      if (item.otherConfig?.searchType === 'doubleInput') {
        obj.model = item.otherConfig.model;
        obj.max = item.otherConfig.max;
      }
      if (item.otherConfig?.searchType === 'datetimerange') {
        obj.modelNameArray = [item.otherConfig.modelNameArray[0], item.otherConfig.modelNameArray[1]];
      }
      if (item.otherConfig?.searchType === 'daterange') {
        obj.label = item.otherConfig.label;
        obj.modelNameArray = [item.otherConfig.modelNameArray[0], item.otherConfig.modelNameArray[1]];
      }
      list.push({ ...obj });
    }
  });

  return list;
}