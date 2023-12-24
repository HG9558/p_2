/**
 * @表格数字颜色
 * @export
 * @param {(string | number)} value
 * @return {*}
 */
export function computedColor(value: string | number) {
  return value > 0 ? '#F56C6C' : '#67C23A';
}

/**
 * @详情信息处理
 * @export
 * @param {string} str
 * @param {number} [length=39]
 * @param {isShowAll} 是否显示全部字符
 * @return {*}
 */
export function setStringSplit(str: string, isShowAll: boolean = false, length: number = 39) {
  if (!str) return {};
  const noHtmlStr = str.split('|');
  let domStr: any = '';
  let domStr2: any = '';
  noHtmlStr.forEach(item => {
    domStr += `<p>${item}</p>`;
    if (isShowAll) {
      domStr2 += `<p>${item.replace(/[:|：]/, 'kok-split').split('kok-split')[1]}</p>`;
    }
  });
  let l = '';
  let s = '';
  if (!isShowAll) {
    l = str.slice(0, 39);
    s = `${l}...`;
  } else {
    l = str;
    s = domStr2;
  }
  const len = noHtmlStr.length > 16 ? true : false;
  return {
    noHtmlStr,
    domStr,
    s,
    len
  };
}
