import { VxeTablePropTypes } from 'vxe-table';
import i18n from '@/locales';

const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach(item => {
    count += Number(item[field]);
  });
  return count;
};


export const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
  const means: any[] = [];
  const sums: any[] = [];
  columns.forEach((column, columnIndex) => {
    if (columnIndex === 0) {
      means.push(i18n.global.t('global.total'));
      sums.push(i18n.global.t('global.count'));
    } else {
      let meanCell = null;
      let sumCell = null;

      switch (column.property) {
        case 'age':
        case 'amount':
          meanCell = 20000;
          sumCell = sumNum(data, column.property);
          break;
        case 'sex':
          break;
      }
      means.push(meanCell);
      sums.push(sumCell);
    }
  });
  // 返回一个二维数组的表尾合计
  return [sums, means];
};
