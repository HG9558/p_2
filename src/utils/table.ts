import { nextTick } from 'vue';
import { toFixedN, toFixedNReport } from '@/utils/int';
import i18n from '@/locales/index';

/**
 *
 * @param createExcluded 需要不展示的prop数组
 * @param cloumBai 需要展示百分号的prop数组
 * @param count 需要使用外面值的数组
 * @returns
 */
export const getSummaries = (createExcluded: any[] = [], cloumBai: any[] = [], count: any[] = [], notFixed: any[] = []) => {
  return (param: any): void => {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = count.length ? i18n.global.t('global.total') : i18n.global.t('global.count');
        return;
      }
      const c = count.find((item: any) => item.prop === column.property);
      if (c) {
        if (site === 'vp9') {
          sums[index] = c.val;
        } else {
          sums[index] = toFixedNReport(c.val);
        }
        return;
      }

      if (createExcluded.includes(column.property)) {
        return;
      }

      const values = data.map((item: any) => {
        const d = { ...item };
        delete d['uid'];
        return Number(d[column.property])
      });


      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        if (cloumBai.includes(column.property)) {
          sums[index] = (sums[index] * 100).toFixed(2) + '%';
        } else {
          if (notFixed.includes(column.property)) {
            sums[index] = sums[index];
          } else {
            sums[index] = toFixedNReport(sums[index]);
          }
        }
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
  // return (param: any): void => {
  //   const { columns, data } = param;
  //   const sums: any = [];
  //   columns.forEach((column: any, index: any) => {
  //     if (index === 0) {
  //       sums[index] = count.length ? i18n.global.t('global.total') : i18n.global.t('global.count');
  //       return;
  //     }
  //     const c = count.find((item: any) => item.prop === column.property);
  //     if (c) {
  //       if (c.toFixed === undefined) {
  //         sums[index] = toFixedN(c.val);
  //       } else {
  //         sums[index] = c.val;
  //       }
  //       return;
  //     }

  //     if (createExcluded.includes(column.property)) {
  //       return;
  //     }

  //     const values = data.map((item: any) => Number(item[column.property]));
  //     if (!values.every((value: any) => isNaN(value))) {
  //       sums[index] = values.reduce((prev: any, curr: any) => {
  //         const value = Number(curr);
  //         if (!isNaN(value)) {
  //           return prev + curr;
  //         } else {
  //           return prev;
  //         }
  //       }, 0);
  //       if (cloumBai.includes(column.property)) {
  //         sums[index] = (sums[index] * 100).toFixed(4) + '%';
  //       } else {
  //         if (notFixed.includes(column.property)) {
  //           sums[index] = sums[index].toFixed(0);
  //         } else {
  //           sums[index] = toFixedN(sums[index]);
  //         }
  //       }
  //     } else {
  //       sums[index] = '';
  //     }
  //   });
  //   return sums;
  // };
};

export const getSummaries_report = (createExcluded: any[] = [], cloumBai: any[] = [], count: any[] = [], notFixed: any[] = []) => {
  return (param: any): void => {
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = count.length ? i18n.global.t('global.total') : i18n.global.t('global.count');
        return;
      }
      const c = count.find((item: any) => item.prop === column.property);
      if (c) {
        if (c.toFixed === undefined) {
          sums[index] = toFixedNReport(c.val);
        } else {
          sums[index] = toFixedNReport(c.val);
        }
        return;
      }

      if (createExcluded.includes(column.property)) {
        return;
      }

      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        if (cloumBai.includes(column.property)) {
          sums[index] = (sums[index] * 100).toFixed(4) + '%';
        } else {
          if (notFixed.includes(column.property)) {
            sums[index] = sums[index];
          } else {
            sums[index] = toFixedNReport(sums[index]);
          }
        }
      } else {
        sums[index] = '';
      }
    });
    return sums;
  };
};

export default function tableStyle() {
  nextTick(() => {
    const arr = Array.from(document.querySelectorAll('.el-table__footer-wrapper tbody tr td'));
    arr.forEach(item => {
      item.className += ' nscss_get_blank_style';
    });
  });
  return {};
}

export function indexMethod(index: number, page: number, page_size: number) {
  return (page - 1) * page_size + 1;
  return (page - 1) * page_size + index + 1;
}
