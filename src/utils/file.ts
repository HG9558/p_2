import { Parser } from 'json2csv';
import router from '@/router/index';
import XLSX from 'xlsx';

export const exports = (data: any) => {
  const BOM = '\uFEFF';
  const blob_obj = new Blob([BOM + data], { type: 'text/csv' });
  return URL.createObjectURL(blob_obj);
};

interface ExportInr {
  data: any;
  name?: string;
  fields?: string[] | { label: string; value: string }[];
}

/**
 * 导出csv
 * */
export const export_csvfn = (exportData: ExportInr) => {
  // router.currentRoute.value.meta.name ?
  const json2csvParser = new Parser({ fields: exportData.fields });
  if (!exportData.data || (Array.isArray(exportData.data) && exportData.data.length === 0)) {
    console.info('无数据');
    return;
  }
  if (!exportData.name) {
    const routername: any = router.currentRoute.value.meta.name;
    exportData.name = routername ? `${routername}.csv` : '';
  }
  const aLink = document.createElement('a');
  aLink.download = exportData.name;
  aLink.href = exports(json2csvParser.parse(exportData.data));
  aLink.click();
};

// 将workbook装化成blob对象
function workbook2blob(workbook: any) {
  // 生成excel的配置项
  const w_opts: any = {
    // 要生成的文件类型
    bookType: 'xlsx',
    // 如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    // 二进制类型
    type: 'binary'
  };
  const wbout = XLSX.write(workbook, w_opts);

  // 将字符串转ArrayBuffer
  const buf = new ArrayBuffer(wbout.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== wbout.length; ++i) {
    view[i] = wbout.charCodeAt(i) & 0xff;
  }
  // buffer转二进制流
  const blob = new Blob([buf], {
    type: 'application/octet-stream'
  });
  return blob;
}

// 将blob对象创建bloburl，用a标签实现下载
function openDownloadDialog(blob: any, fileName: string) {
  if (typeof blob === 'object' && blob instanceof Blob) {
    blob = URL.createObjectURL(blob); // 创建blob地址
  }
  const aLink = document.createElement('a');
  aLink.href = blob;
  aLink.download = `${fileName}.xlsx` || '';
  const event = new MouseEvent('click');
  aLink.dispatchEvent(event);
  URL.revokeObjectURL(blob);
}

/**
 * 导出excel
 * table 表格DOM
 * filename 导出文件名
 * */
export function downLoadExcel(table: any, filename: string = 'xlsx') {
  const wb = XLSX.utils.table_to_book(table);
  // 创建工作薄blob
  const workbookBlob: any = workbook2blob(wb);
  // 导出工作薄
  openDownloadDialog(workbookBlob, filename);
}
/**
 * 导出excel
 * table JSON
 * filename 导出文件名
 * */
export function downLoadDataExcel(table: any, filename: string = 'xlsx') {
  const wb = XLSX.utils.table_to_book(table);
  // 创建工作薄blob
  const workbookBlob: any = workbook2blob(wb);
  // 导出工作薄
  openDownloadDialog(workbookBlob, filename);
}
export const downExcel = (table:Array<{ [name: string]: string;}>, titles:Array<string>,filename: string = 'xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(table);
  XLSX.utils.sheet_add_aoa( worksheet, [ titles], { origin: "A1" });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet,);
  XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true });
};