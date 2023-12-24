import {
  defineComponent,
  ref,
  nextTick,
  computed,
  watch,
  onMounted
} from 'vue';
import { toFixedN } from '@/utils/int';
// 计算object arr的和
function sum(data: any[]): any {
  if (data.length > 0) {
    let keys = Object.keys(data[0]);
    const sums: any = {};
    keys.forEach((column, index) => {
      let property = column;
      // if (index === 0) {
      //   sums[column] = '小计';
      //   return;
      // }
      const values = data.map(item => Number(item[column]));
      //验证每个value值是否是数字，如果是执行if
      if (!values.every(value => isNaN(value))) {
        sums[column] = values.reduce((prev, curr) => {
          return prev + curr;
        }, 0);
        // sums[column] += toFixedN(sums[column]);
        sums[column] = toFixedN(sums[column]);
      } else {
        sums[column] = '';
      }
      if (keys[keys.length - 1] === column) {
      }
    });
    return sums;
  }
}
// 返回数据
function div(text: number | string) {
  return `
    <div class="cell" style="text-align: center">${text}</div>
  `;
}
// 获取叔祖对象中第一个的所有key
function getProp(tableData: any[]): any[] {
  if (tableData) {
    return Object.keys(tableData[0]);
  }
  return [];
}
// 往表格中添加小计和总计
function append(tableData: any[], prop: string[] = ['d', 'e']) {
  const table_wrapper_main = document.querySelector(
    `.tablecalccontent .el-table__body-wrapper .el-table__body`
  ) as Element;
  const table_wrapper = table_wrapper_main.querySelector('tbody') as Element;
  const tr = table_wrapper.querySelector('tr');
  const children = Array.from(tr?.children ? tr.children : []);
  const tfoot = document.createElement('tfoot');
  tfoot.className = 'clacstyle_faker';
  const xiaoji = document.createElement('tr');
  const zongji = document.createElement('tr');
  children.forEach((el: any, i: number) => {
    const td = document.createElement('td');
    td.style.textAlign = 'center';
    td.setAttribute('data-prop', i ? getProp(tableData)[i - 1] : '');
    td.innerHTML = i === 0 ? div('小计') : '';
    const td2 = document.createElement('td');
    td2.style.textAlign = 'center';
    td2.setAttribute('data-prop', i ? `count${getProp(tableData)[i - 1]}` : '');
    td2.innerHTML = i === 0 ? div('总计') : '';
    xiaoji.appendChild(td);
    zongji.appendChild(td2);
  });
  tfoot.appendChild(xiaoji);
  tfoot.appendChild(zongji);
  table_wrapper_main.appendChild(tfoot);
}
// 根据attr获取dom
function getDom(value: string) {
  let selectDom = [];
  let dom = [
    ...(document
      .querySelector('.clacstyle_faker > tr')
      ?.querySelectorAll('td') as any),
    ...(document
      .querySelector('.clacstyle_faker > tr:nth-child(2)')
      ?.querySelectorAll('td') as any)
  ];
  for (let i = 0; i < dom.length; i++) {
    if (value === dom[i].getAttribute('data-prop')) {
      selectDom.push(dom[i]);
    }
  }
  return selectDom;
}
export function useTableCalc(
  tableData: any,
  notRender: any[] = [],
  count: any
) {
  const dataComputed = computed(() => {
    return sum(tableData.value);
  });
  function setTableData() {
    const keys = Object.keys(dataComputed.value);
    for (let i = 0; i < keys.length; i++) {
      if (notRender.includes(keys[i])) continue;
      getDom(keys[i])[0].innerHTML = dataComputed.value[keys[i]];
    }
  }
  function setTableData2() {
    const keys = Object.keys(count.value);
    for (let i = 0; i < keys.length; i++) {
      getDom('count' + keys[i])[0].innerHTML = toFixedN(count.value[keys[i]]);
    }
  }
  watch(
    () => tableData.value,
    () => {
      setTableData();
    },
    {
      deep: true
    }
  );
  watch(count.value, () => {
    setTableData2();
  });
  nextTick(() => {
    append(tableData.value);
    setTableData();
    setTableData2();
  });
  // onMounted(() => {
  //   append(tableData.value);
  // });
}
