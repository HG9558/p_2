import _ from 'lodash';
import dayjs from 'dayjs';

export const empty = {
  isEmpty(obj: any) {
    if (typeof obj === 'undefined' || obj === null || obj === '') {
      return true;
    } else {
      return false;
    }
  },
  preProcessData(data: any,no_format?:boolean) {
    let formData: any = _.cloneDeep(data);
    /* 删除空值 */
    Object.keys(formData).forEach(item => {
      if (this.isEmpty(formData[item])) {
        delete formData[item];
      }
      if (_.isDate(formData[item]) && !no_format) {
        formData[item] = dayjs(formData[item]).format('YYYY-MM-DD HH:mm:ss');
      }
    });
    return formData;
  }
};
