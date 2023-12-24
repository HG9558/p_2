import { defineComponent, ref, reactive, computed, getCurrentInstance, watch } from 'vue';
import { addSystemAccount, editSystemAccount, getSystemAccountList, updateSystemAccountState, getGroupList } from '@/http/modules/permission';
import { SystemAccountListItem } from './types';
import useQuery from './useQuery';
import useDialog from './useDialog';
import useValidate from './useValidate';
import { dateFormat } from '@/utils/date';
import { ResponseGroupUserItem, GroupUserItem } from '../rolePermission/types';
import listToTree from '@/utils/tree';
import { shakeParams } from '@/utils/params';
import { ElForm, ElTree, ElMessageBox, ElMessage } from 'element-plus';
import long2ip from '@/utils/long2ip';
import { removeTreeNoState } from '@/utils/tree';
import { useStore } from '@/store';
import base32Encode from 'base32-encode';
import _ from 'lodash';
import { empty } from '@/components/serch-form/empty';
import i18n from '@/locales';
import { dynamicMsg, dynamic } from '@/utils/expressions';
import { useI18n } from 'vue-i18n';
import DynamicVerificationCode from '@/components/dynamic-verification-code/index.vue';
const dialogTypes = new Map([
  ['add', i18n.global.t('global.increment')],
  ['edit', i18n.global.t('global.edit')]
]);

export default defineComponent({
  name: 'SystemAccount',
  components: { DynamicVerificationCode },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const app = getCurrentInstance();
    const $message = app?.appContext.config.globalProperties.$message;
    let tableData = ref<SystemAccountListItem[]>([]);
    const store = useStore();
    const stateList = reactive([
      { label: i18n.global.t('global.please_choose'), value: -1 },
      { label: i18n.global.t('routes.operation_manage_page.start'), value: 1 },
      { label: i18n.global.t('routes.finance_manage_page.disabled'), value: 0 }
    ]);
    const groupUserTree = reactive<any>([]);
    const groupUserTreeDefaultProps = reactive({
      children: 'children',
      label: 'label'
    });
    const curPage = ref(1);
    const totalCount = ref(0);
    const pageSize = ref(10);
    const groupUserList: any[] = reactive([
      {
        gid: '-1',
        label: i18n.global.t('routes.system.character_tips'),
        gname: '',
        create_at: 0,
        lvl: 0,
        lft: 0,
        noted: '',
        rgt: -1,
        pid: '-1',
        state: -1,
        permission: ''
      }
    ]);
    const groupUserMap = reactive(new Map<string, string>());
    const elDialogForm = ref<typeof ElForm | null>(null);
    const dialogRoleGroupUserVisible = ref(false);
    const groupUserDialogOpenFrom = ref('');
    const { queryForm, reset } = useQuery();
    const {
      // defaultDialogFormInfo,
      dialogVisible,
      dialogType,
      dialogFormInfo,
      cancel,
      closeDialog
    } = useDialog();
    const { formRules, validateForm } = useValidate();

    const dialogTitle = computed(() => dialogTypes.get(dialogType.value));
    const totalPage = computed(() => Math.ceil(totalCount.value / pageSize.value));

    const addAccount = () => {
      Object.assign(dialogFormInfo, {
        name: '',
        password: '',
        passwordRepeat: '',
        state: 1,
        group_id: -1,
        gname: '',
        seamo: ''
      });
      dialogVisible.value = true;
      dialogType.value = 'add';
    };

    const initTableData = () => {
      getList().then((res: any) => {
        if (res.status) {
          if (res.data.t) {
            totalCount.value = res.data.t;
          }
        }
      });
    };

    // 获取账号列表
    const getList = () => {
      const params: any = {
        page: curPage.value,
        page_size: pageSize.value
      };
      if (queryForm.name) {
        params.name = queryForm.name;
      }
      if (queryForm.state !== -1) {
        params.state = queryForm.state;
      }
      if (queryForm.groupid !== -1) {
        params.groupid = queryForm.groupid;
      }
      if (!queryForm.gname) {
        params.groupid = '';
      }
      return getSystemAccountList(empty.preProcessData(params)).then((res: any) => {
        tableData.value = [];
        if (res.status) {
          if (res.data && res.data.d) {
            tableData.value = res.data.d;
          }
        }
        return res;
      });
    };

    const query = () => {
      curPage.value = 1;
      totalCount.value = 0;
      getList().then((res: any) => {
        if (res.status) {
          if (res.data.t) {
            totalCount.value = res.data.t;
          }
        }
      });
    };

    const add = () => {
      const params = shakeParams(
        {
          name: '',
          // password: '',
          state: -1,
          group_id: -1,
          seamo: '' // 动态密码绑定
        },
        dialogFormInfo
      );
      params.password = dialogFormInfo.password;
      addSystemAccount(params).then((res: any) => {
        if (res.status) {
          initTableData();
          closeDialog();
          $message.success(i18n.global.t('global.addsuc'));
        }
      });
    };
    const editFn = (par: any) => {
      const params = {
        password: par.password,
        group_id: par.group_id,
        state: par.state,
        seamo: par.seamo,
        id: par.id,
        code: par.code
      };
      editSystemAccount(empty.preProcessData(params)).then((res: any) => {
        if (res.status) {
          initTableData();
          closeDialog();
          $message.success(i18n.global.t('routes.tips.modify_suc'));
        }
      });
    };

    // 点击编辑处理
    const edit = (info: SystemAccountListItem) => {
      // 把密码清空
      info.password = '';
      dialogVisible.value = true;
      dialogType.value = 'edit';
      Object.assign(shakeParams(dialogFormInfo, info));
      dialogFormInfo.group_id = info.group_id;
      dialogFormInfo.gname = getGroupIdText(info.group_id);
      dialogFormInfo.id = info.id;
      dialogFormInfo.code = '111111';
    };

    const getGroupIdText = (group_id: number | string) => {
      const obj = gidList.value.find((it: any) => it.gid == group_id);
      return obj ? obj.gname : '';
    };

    const updateAccountState = (info: any) => {
      const params = {
        id: info.id,
        state: info.state
      };
      if (!params.id) {
        return;
      }
      updateSystemAccountState(params).then((res: any) => {
        if (res.status) {
          $message.success(i18n.global.t('routes.tips.modify_suc'));
        }
      });
    };

    const gidList = ref<any>([]);

    // 获取角色列表
    getGroupList().then((res: any) => {
      if (res.status) {
        const data: ResponseGroupUserItem[] = res.data;
        console.error('角色', data)
        // data.shift();
        gidList.value = _.cloneDeep(data);
        let treeData: GroupUserItem[] = [];
        let temp: GroupUserItem;
        data.forEach((item: ResponseGroupUserItem) => {
          temp = {
            create_at: item.create_at,
            gid: (item.gid),
            lvl: item.lvl,
            lft: item.lft,
            gname: item.gname,
            noted: item.noted,
            permission: item.permission,
            rgt: item.rgt,
            state: item.state,
            label: item.gname,
            pid: item.pid
          };
          treeData.push(Object.assign({}, temp));
          groupUserMap.set(item.gid + '', item.gname);
        });
        groupUserList.push(...treeData);
        treeData = listToTree(treeData, treeData[0].pid);
        console.error(removeTreeNoState(treeData));
        groupUserTree.push(...removeTreeNoState(treeData));
        // console.log('groupUserTree=', groupUserTree);
        // console.log('groupUserList=', groupUserList, groupUserMap);
      }
    });

    const sure = () => {
      if (dialogType.value === 'add') {
        if (elDialogForm.value && elDialogForm.value.validate) {
          elDialogForm.value.validate((valid: boolean) => {
            if (valid) {
              if (!validateForm(dialogFormInfo)) return;
              add();
            }
          });
        }
      } else {
        elDialogForm.value && elDialogForm.value.validateField('code');
        setTimeout(() => {
          // 编辑
          if (!document.querySelector('.dialog-ctx-wp')?.querySelector('.el-form-item__error')) {
            editFn(dialogFormInfo);
          }
        }, 20);
        //
        // if (elDialogForm.value && elDialogForm.value.validate) {
        //   elDialogForm.value.validate((valid: boolean) => {
        //     if (valid) {
        //       if (!validateForm(dialogFormInfo)) return;
        //       editFn(dialogFormInfo);
        //     }
        //   });
        // }
        // closeDialog();
      }
    };

    const closedDialog = () => {
      if (elDialogForm.value) {
        elDialogForm.value.clearValidate();
      }
      closeDialog();
    };

    const triggerShowGroupUserDialog = (type: string) => {
      groupUserDialogOpenFrom.value = type;
      dialogRoleGroupUserVisible.value = true;
    };

    // 弹出框角色树-选中项处理
    const dialogGroupUserClickHandler = (data: typeof ElTree) => {
      switch (groupUserDialogOpenFrom.value) {
        case 'dialog':
          dialogFormInfo.gname = data.gname;
          dialogFormInfo.group_id = data.gid;
          break;
        case 'query':
          queryForm.gname = data.gname;
          queryForm.groupid = data.gid;
          break;
        default:
          break;
      }
      dialogRoleGroupUserVisible.value = false;
    };

    const pagePrev = () => {
      // curPage.value--;
      // getList({ page: curPage.value });
    };

    const pageNext = () => {
      // curPage.value++;
      // getList({ page: curPage.value });
    };

    const gotoPage = (page: number) => {
      curPage.value = page;
      getList();
    };

    const sizesChangeHandler = (sizes: number) => {
      pageSize.value = sizes;
      getList();
    };

    initTableData();

    function randomWord(randomFlag: any, min: any, max: any) {
      let str: any = '',
        range: any = min,
        arr: any = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    }
    // 生成动态验证码，包含登录用户名
    // 获取用户名和用户名长度
    // 将用户名改成数组
    function getNameInfo() {
      const name = store.state.user.name;
      const len = name.length;
      const nameArr = name.split('');
      return {
        len,
        nameArr
      };
    }

    // 向字符串中插入值
    function insertStr(soure: string, start: number, newStr: string) {
      return soure.slice(0, start) + newStr + soure.slice(start);
    }

    function stringToUint8Array(str: string) {
      let arr = [];
      for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
      }

      let tmpUint8Array = new Uint8Array(arr);
      return tmpUint8Array;
    }
    const generateCode = () => {
      const l = 32;
      const obj = getNameInfo();
      const len = obj.len;
      const arr = obj.nameArr;
      let randomStr = randomWord(false, l - len, l - len);
      // 把nameArr随机插入到randomStr中
      arr.forEach((item: any) => {
        // 生成随机数
        const w = Number.parseInt((Math.random() * (l - len)).toString());
        randomStr = insertStr(randomStr, w, item);
      });
      // console.log(base32Encode(stringToUint8Array(randomStr), 'Crockford'));
      // console.log(base32Encode(stringToUint8Array(randomStr), 'RFC3548'));
      // console.log(base32Encode(stringToUint8Array(randomStr), 'RFC4648'));
      // console.log(base32Encode(stringToUint8Array(randomStr), 'RFC4648-HEX'));
      dialogFormInfo.seamo = base32Encode(stringToUint8Array(randomStr), 'RFC3548');
      // dialogFormInfo.seamo = randomStr;
    };

    const deleteAccount = () => {
      ElMessageBox.confirm(i18n.global.t('routes.system.delete_tips'), i18n.global.t('global.warning'), {
        confirmButtonText: i18n.global.t('global.sure'),
        cancelButtonText: i18n.global.t('global.cancel'),
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {});
    };
    const dynamicVerificationCode = ref();
    let rowData: any = {};
    function editState(row: any) {
      rowData = row;
      // channelID.value = row.id;
      const txt = row.state == 1 ? t('routes.finance_manage_page.disabled') : t('routes.operation_manage_page.start');
      if (dynamicVerificationCode.value) {
        dynamicVerificationCode.value.showForm(true, {
          title: txt,
          content: `${t('routes.finance_manage_page.you_sure')}${txt}${t('routes.finance_manage_page.mm')}`
        });
      }
    }
    // 验证码查询
    const VitHanlder = () => {
      dynamicVerificationCode.value.submitmBtn().then((code: any) => {
        editSystemAccount({
          group_id: rowData.group_id,
          id: rowData.id,
          state: rowData.state == 1 ? 0 : 1,
          code
        }).then((res: any) => {
          if (res.status) {
            $message.success(i18n.global.t('routes.tips.modify_suc'));
            initTableData();
            closeDialog();
            // 对接接口，成功关闭弹框
            dynamicVerificationCode.value.cancel();
          }
        });
        // ElMessage.success(t('routes.tips.modify_suc'));
        //       getList();
        //       // 对接接口，成功关闭弹框
        //       dynamicVerificationCode.value.cancel();
      });
    };

    watch(
      () => dialogFormInfo.value?.code,
      n => {
        if (n) {
          dialogFormInfo.value.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    return {
      dynamicVerificationCode,
      VitHanlder,
      editState,
      queryForm,
      tableData,
      stateList,
      dialogVisible,
      dialogType,
      dialogFormInfo,
      dialogTypes,
      dialogTitle,
      groupUserList,
      curPage,
      groupUserMap,
      totalCount,
      pageSize,
      totalPage,
      formRules,
      elDialogForm,
      dialogRoleGroupUserVisible,
      groupUserTree,
      groupUserTreeDefaultProps,
      addAccount,
      query,
      reset,
      sure,
      cancel,
      edit,
      dateFormat,
      updateAccountState,
      closeDialog,
      closedDialog,
      gotoPage,
      pagePrev,
      pageNext,
      sizesChangeHandler,
      long2ip,
      dialogGroupUserClickHandler,
      triggerShowGroupUserDialog,
      generateCode,
      deleteAccount,
      dynamicMsg,
      dynamic,
      t
    };
  }
});
