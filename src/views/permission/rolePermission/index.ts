import { defineComponent, ref, reactive, toRefs, getCurrentInstance, computed, nextTick, watch } from 'vue';
import { getPrivList, getGroupList, groupInsert, groupUpdate } from '@/http/modules/permission';
import { ElForm, ElTree } from 'element-plus';
import { listToTree, getPriveItemByPid } from './tree';
import { ResponseGroupUserItem, GroupUserItem } from './types';
import { ResponsePriveListItem, PriveListItem } from '../roleModules/types';
import { listToTree as listToTreeOfRole } from '../roleModules/tree';
import _ from 'lodash';
import { dynamicMsg, dynamic } from '@/utils/expressions';
import { generateCode } from '../systemAccount/generateCode';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'RolePermission',
  components: {},
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const app = getCurrentInstance();
    const $message = app?.appContext.config.globalProperties.$message;
    const UNSETTING = t('routes.system.wpz');
    const ALREADY_SET = t('routes.system.ypz');
    const elForms = ref<typeof ElForm | null>(null);
    const roleForm = {
      gid: -1,
      gname: '',
      noted: '',
      pname: UNSETTING,
      permission: UNSETTING,
      parentPermission: '',
      module: '',
      pid: -1,
      state: 0,
      seamo: '',
      code: '111111'
    };
    const formeDatas = reactive({
      rolePermissionForm: Object.assign({}, roleForm)
    });
    const isModify = ref(false);
    const isAdd = ref(false);
    // 侧边栏用户组
    const groupUserTree = reactive<any>([]);
    const groupUserTreeDefaultProps = reactive({
      children: 'children',
      label: 'label',
      disabled: 'disabled',
    });
    // 弹出框用户组
    const dialogRoleGroupUserTree = reactive<any>([]);
    const dialogRoleGroupUserTreeDefaultProps = reactive({
      children: 'children',
      label: 'label',
      disabled: 'disabled',
    });
    // 弹出框角色
    const dialogRoleAuthTree = reactive<any>([]);
    const dialogRoleAuthTreeRight = reactive<any>([]);
    const dialogRoleAuthTreeDefaultProps = reactive({
      children: 'children',
      label: 'label',
      disabled: 'disabled',
    });
    const dialogRoleGroupUserVisible = ref(false); // 用户
    const dialogRoleVisible = ref(false);
    const dialogRoleGroupUserItemRadio = ref(-1);
    const dialogRoleTreeItemRadio = ref(-1);
    const dialogRoleTreeCheckedKeys = reactive<number[]>([]);
    let storePriveList: ResponseGroupUserItem[] = [];
    let storeDialogPriveList: ResponseGroupUserItem[] = [];
    let cachedDialogRoleTreeSelected: GroupUserItem | ObjectParams = {};
    let cachedDialogTreeData: PriveListItem[] = [];
    const elEltreeRole = ref<typeof ElTree | null>(null);
    const elEltreeRole2 = ref<typeof ElTree | null>(null);

    const roleAuthFormCanEdit = computed(() => {
      return !isModify.value && !isAdd.value;
    });

    const permissionStatusTxt = computed(() => {
      return formeDatas.rolePermissionForm.permission.length > 0 && formeDatas.rolePermissionForm.permission !== UNSETTING ? ALREADY_SET : UNSETTING;
    });

    let idList: any[] = [];
    let clickId = '';
    // 侧边角色树导航-选中项处理
    const roleAuthClickHandler = (data: typeof ElTree) => {
      clickId = `gid${data.gid}`;
      // 上级角色
      const item: ResponseGroupUserItem | undefined = getPriveItemByPid(data.pid, storePriveList);

      cachedDialogTreeData.splice(0, cachedDialogTreeData.length);
      dialogRoleAuthTree.splice(0, dialogRoleAuthTree.length);
      dialogRoleAuthTreeRight.splice(0);
      idList = [];

      // 自身的权限
      // console.error('data.permission', data.permission);

      getPrivList({
        gid: item?.gid
      }).then((res: any) => {
        if (res.status) {
          const dataList: ResponseGroupUserItem[] = (res.data || []).sort((a: any, b: any) => { return Number(a.id) - Number(b.id)});
          // const root = data.shift();
          const root = null;
          let dialogTreeData: PriveListItem[] = [];
          let temp: PriveListItem;
          dataList.forEach((item: any) => {
            temp = {
              id: item.id,
              lvl: item.lvl,
              lft: item.lft,
              module: item.module,
              name: item.name,
              rgt: item.rgt,
              state: item.state,
              label: item.name,
              docId: `preid${item.id}`,
              pid: parseInt(item.pid, 10)
            };
            if (item.state === 1) {
              dialogTreeData.push(Object.assign({}, temp));
            }
          });
          cachedDialogTreeData = _.cloneDeep(dialogTreeData);
          dialogTreeData = listToTreeOfRole(dialogTreeData, 0);
          dialogRoleAuthTree.push(...dialogTreeData);

          // 获取点击的角色的权限
          idList = data.permission.split(',');
          const rightList = cachedDialogTreeData.filter(item => {
            return idList.includes(item.id);
          }).map(item => {
            return {
              ...item,
              disabled: true
            }
          })
          const treeDataRight = listToTreeOfRole(rightList, 0);
          dialogRoleAuthTreeRight.push(...treeDataRight);

          

          // 设置编辑
          operatHandler('edit');
          // 设置选中
          setting('role', true);

          // nextTick(() => {
          //   const inputChecked = document.getElementById('disalbletree')?.querySelectorAll('.el-checkbox__original') || [];
          //   for(let i = 0; i < inputChecked.length; i++) {
          //     // inputChecked[i].setAttribute('disabled', 'disabled');
          //     inputChecked[i].closest('.el-checkbox__input')?.querySelector('.el-checkbox__inner')?.classList.add('disabled-input-style')
          //   }
          // })
        }
      });
      
      if (isAdd.value) {
        Object.assign(formeDatas.rolePermissionForm, {
          gid: 0,
          gname: '',
          module: '',
          pid: data.pid,
          pname: item?.gname || ''
        });
      } else {
        // 无论是否是编辑-填充表单
        Object.assign(formeDatas.rolePermissionForm, {
          gid: data.gid,
          gname: data.gname,
          pname: item?.gname || '',
          pid: data.pid,
          permission: data.permission,
          parentPermission: item?.permission,
          noted: data.noted,
          state: data.state
        });
        // 编辑-重新计算角色权限
        if (isModify.value) {
          // updateDialogRoleAuthTreeByIds(parsePermissionToIds(data.permission));
          // updateDialogRoleAuthTreeByIds(parsePermissionToIds(item?.permission || data.permission));
        }
      }

      // console.log('roleAuthClickHandler data=', formeDatas.rolePermissionForm);
    };

    let isLoad: boolean = false;
    const throttle = (gid: any) => {
      if (!isLoad) {
        isLoad = true;
        updateDialogRoleAuthTreeByIds(gid);
      }
    }


    // 弹出框角色树-选中项处理
    const dialogRoleGroupUserClickHandler = (data: typeof ElTree) => {
      cachedDialogRoleTreeSelected = Object.assign({}, formeDatas.rolePermissionForm, {
        gid: -1,
        pname: data.gname,
        pid: data.gid,
        permission: data.permission,
        noted: data.noted,
        state: data.state
      });
      // lodash 在固定时间内只执行一次
      throttle(data.gid);
    };

    // 弹出框权限树-选中项处理
    const dialogRoleAuthClickHandler = (data: typeof ElTree) => {
      cachedDialogRoleTreeSelected = Object.assign({}, formeDatas.rolePermissionForm, {
        pname: data.name,
        pid: data.id,
        state: data.state
      });
      // console.log('dialogRoleAuthClickHandler data=', data);
    };

    const parsePermissionToIds = (p: string) => {
      let ids: number[] = [];
      if (p !== UNSETTING && p.length > 0) {
        ids = p.split(',').map((n: string) => parseInt(n, 10));
      }
      return ids;
    };

    const operatHandler = (type: string) => {
      isAdd.value = false;
      isModify.value = false;
      switch (type) {
        case 'add':
          resetForm();
          isAdd.value = true;
          break;
        case 'del':
          break;
        case 'edit':
          if (formeDatas.rolePermissionForm.gid === -1) {
            $message.warning(t('routes.system.please_role'));
            return;
          }
          isModify.value = true;
          // updateDialogRoleAuthTreeByIds(parsePermissionToIds(formeDatas.rolePermissionForm.parentPermission || formeDatas.rolePermissionForm.permission));
          break;
        default:
          break;
      }
    };

    // 重置数据
    const resetData = () => {
      isAdd.value = false;
      isModify.value = false;
      groupUserTree.splice(0, groupUserTree.length);
      formeDatas.rolePermissionForm = Object.assign({}, roleForm);
      dialogRoleAuthTree.splice(0, dialogRoleAuthTree.length);
      dialogRoleGroupUserTree.splice(0, dialogRoleGroupUserTree.length);
      resetDialogRoleTreeCheckedKeys();
    };

    const resetDialogRoleTreeCheckedKeys = () => {
      if (elEltreeRole.value) {
        elEltreeRole.value.setCheckedKeys([]);
      }
      dialogRoleTreeCheckedKeys.splice(0, dialogRoleTreeCheckedKeys.length);
    };

    const resetForm = () => {
      resetDialogRoleTreeCheckedKeys();
      Object.assign(formeDatas.rolePermissionForm, {
        gname: '',
        permission: UNSETTING,
        noted: '',
        pname: UNSETTING,
        pid: -1,
        state: 1
      });
    };

    // 修改角色权限
    const modify = () => {
      if (!isModify.value) return;
      const params = {
        pid: formeDatas.rolePermissionForm.pid,
        id: formeDatas.rolePermissionForm.gid,
        gname: formeDatas.rolePermissionForm.gname,
        permission: formeDatas.rolePermissionForm.permission,
        noted: formeDatas.rolePermissionForm.noted,
        state: formeDatas.rolePermissionForm.state,
        seamo: formeDatas.rolePermissionForm.seamo,
        code: formeDatas.rolePermissionForm.code
      };
      if (!validate(params)) return;
      groupUpdate(params).then((res: any) => {
        if (res.status) {
          initData();
          $message.success(t('routes.tips.modify_suc'));

          isModify.value = false;

          setTimeout(() => {
            document.getElementById(clickId)?.click();
          }, 500)
        }
      });
    };

    const validate = (data: any, type?: string) => {
      if (!data.gname) {
        $message.warning(t('routes.system.role_tips1'));
        return false;
      }
      if (!data.noted) {
        $message.warning(t('routes.system.role_tips2'));
        return false;
      }
      if (type === 'add') {
        if (data.pid === -1) {
          $message.warning(t('routes.system.role_tips3'));
        }
        if (data.permission === UNSETTING || data.permission.length === 0) {
          $message.warning(t('routes.system.role_tips4'));
          return false;
        }
      }
      if (!data.code) {
        app?.appContext.config.globalProperties.$message.warning(t('routes.finance_manage_page.dynamic_code_tip'));
        return false;
      }
      return true;
    };

    // 插入角色权限
    const insert = () => {
      const params = {
        gname: formeDatas.rolePermissionForm.gname,
        pid: formeDatas.rolePermissionForm.pid,
        noted: formeDatas.rolePermissionForm.noted,
        permission: formeDatas.rolePermissionForm.permission,
        state: formeDatas.rolePermissionForm.state,
        seamo: formeDatas.rolePermissionForm.seamo,
        code: formeDatas.rolePermissionForm.code
      };
      if (!validate(params, 'add')) return;
      groupInsert(params).then((res: any) => {
        if (res.status) {
          initData();
          app?.appContext.config.globalProperties.$message.success(t('global.add_suc'));
        }
      });
    };

    const cancel = () => {
      isAdd.value = false;
      isModify.value = false;
      cancelDialogRoleTree();
      resetForm();
    };

    const submit = () => {
      if (elForms.value) {
        elForms.value.validate((valid: boolean) => {
          if (valid) {
            if (isModify.value) {
              modify();
            } else {
              if (isAdd.value) {
                insert();
              }
            }
          }
        })
      }
    };

    function getTreeDataListId(list: any[], arr: any[]) {
      for (let i = 0; i < list.length; i++) {
        const id = list[i].id;
        if (id) {
          arr.push(id);
        }
        if (list[i].children && list[i].children.length) {
          getTreeDataListId(list[i].children, arr);
        }
      }
    }

    const checkStrictly = ref(false);

    // 上级角色，角色权限设置
    const setting = (type?: string, isShowDialog?: boolean) => {
      if (type === 'parentRole') {
        dialogRoleGroupUserVisible.value = true;
      } else {
        if (type === 'role') {
          if (isShowDialog === undefined) {
            dialogRoleVisible.value = true;
          }
          // 设置默认选中
          const permission = formeDatas.rolePermissionForm.permission;
          let keys: number[] = [];
          if (permission.length > 0 && permission !== UNSETTING) {
            keys = permission.split(',').map(n => parseInt(n, 10)).sort((a, b) => a - b);
          }
          if (keys && keys.length > 0) {
            dialogRoleTreeCheckedKeys.splice(0, dialogRoleTreeCheckedKeys.length);
            dialogRoleTreeCheckedKeys.push(...keys);

            nextTick(() => {
              if (elEltreeRole.value) {
                elEltreeRole.value.setCheckedKeys(dialogRoleTreeCheckedKeys);

                const alist: any = []; // 所有的权限节点 id
                // console.error(dialogRoleTreeCheckedKeys); //  被选中的节点
                getTreeDataListId(dialogRoleAuthTree, alist);
                // 需要取消选择的 checked
                const noChecked = alist.filter(function (v: any) {
                  return dialogRoleTreeCheckedKeys.indexOf(Number(v)) == -1;
                });
                noChecked.forEach((v: any) => {
                  // 判断是否选中
                  const label = document.getElementById(`twopreid${v}`)?.closest('.el-tree-node__content')?.querySelector('.el-checkbox') as any;
                  setTimeout(() => {
                    if (label.className.indexOf('is-checked') != -1) {
                      label.click();
                    }
                  });
                });
              }
              
              if (elEltreeRole2.value) {
                // 设置全选
                elEltreeRole2.value.setCheckedKeys(idList);
              }
                
              //   elEltreeRole2.value.setCheckedKeys(dialogRoleTreeCheckedKeys);

              //   const alist: any = []; // 所有的权限节点 id
              //   // console.error(dialogRoleTreeCheckedKeys); //  被选中的节点
              //   getTreeDataListId(dialogRoleAuthTree, alist);
              //   // 需要取消选择的 checked
              //   const noChecked = alist.filter(function (v: any) {
              //     return dialogRoleTreeCheckedKeys.indexOf(Number(v)) == -1;
              //   });
              //   noChecked.forEach((v: any) => {
              //     // 判断是否选中
              //     const label = document.getElementById(`onepreid${v}`)?.closest('.el-tree-node__content')?.querySelector('.el-checkbox') as any;
              //     setTimeout(() => {
              //       if (label.className.indexOf('is-checked') != -1) {
              //         label.click();
              //       }
              //     });
              //   });

              //   setTimeout(() => {
              //     const inputChecked = document.getElementById('disalbletree')?.querySelectorAll('.el-checkbox__original') || [];
              //     for(let i = 0; i < inputChecked.length; i++) {
              //       inputChecked[i].setAttribute('disabled', 'disabled');
              //       // inputChecked[i].closest('.el-checkbox__input')?.querySelector('.el-checkbox__inner')?.classList.add('disabled-input-style')
              //     }
              //   },500)
              // }
            });
          }
        }
      }
    };

    const initData = () => {
      resetData();
      getGroupList().then((res: any) => {
        if (res.status) {
          const data: ResponseGroupUserItem[] = res.data;
          // const root = data.shift();
          let treeData: GroupUserItem[] = [];
          let dialogGroupUserTreeData: GroupUserItem[] = [];
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
            if (item.state === 1) {
              dialogGroupUserTreeData.push(Object.assign({}, temp));
            }
          });
          treeData = listToTree(treeData, treeData[0].pid);
          groupUserTree.push(...treeData);
          storePriveList = data;
          storeDialogPriveList = data;
          dialogGroupUserTreeData = listToTree(dialogGroupUserTreeData, dialogGroupUserTreeData[0].pid);
          dialogRoleGroupUserTree.push(...dialogGroupUserTreeData);
        }
      });
    };

    const updateDialogRoleAuthTreeByIds = (gid: string) => {
      cachedDialogTreeData.splice(0, cachedDialogTreeData.length);
      dialogRoleAuthTree.splice(0, dialogRoleAuthTree.length);

      getPrivList({
        gid,
      }).then((res: any) => {
        if (res.status) {
          isLoad = false;
          const data: ResponseGroupUserItem[] = res.data;
          // const root = data.shift();
          const root = null;
          let dialogTreeData: PriveListItem[] = [];
          let temp: PriveListItem;
          data.forEach((item: any) => {
            temp = {
              id: item.id,
              lvl: item.lvl,
              lft: item.lft,
              module: item.module,
              name: item.name,
              rgt: item.rgt,
              state: item.state,
              label: item.name,
              docId: `preid${item.id}`,
              pid: parseInt(item.pid, 10)
            };
            if (item.state === 1) {
              dialogTreeData.push(Object.assign({}, temp));
            }
          });
          cachedDialogTreeData = _.cloneDeep(dialogTreeData);
          dialogTreeData = listToTreeOfRole(dialogTreeData, 0);
          dialogRoleAuthTree.push(...dialogTreeData);

          // nextTick(() => {
          //   const inputChecked = document.getElementById('disalbletree')?.querySelectorAll('.el-checkbox__original') || [];
          //   for(let i = 0; i < inputChecked.length; i++) {
          //     inputChecked[i].setAttribute('disabled', 'disabled');
          //     // inputChecked[i].closest('.el-checkbox__input')?.querySelector('.el-checkbox__inner')?.classList.add('disabled-input-style')
          //   }
          // })
        }
      });

    };

    // 用户分组模块,角色模块 确定
    const sureDialog = (type?: string) => {
      if (type === 'role') {
        if (elEltreeRole.value) {
          const keys: number[] = elEltreeRole.value.getCheckedKeys().concat(elEltreeRole.value.getHalfCheckedKeys());
          if (keys && keys.length > 0) {
            formeDatas.rolePermissionForm.permission = keys && keys.join(',');
          } else {
            return $message.warning(t('routes.tips.qxzjsqx'));
          }
        }
        
        dialogRoleVisible.value = false;
      } else {
        Object.assign(formeDatas.rolePermissionForm, cachedDialogRoleTreeSelected);
        closeDialogRoleTree();
      }
    };

    const closeDialogRoleTree = () => {
      dialogRoleVisible.value = false;
      dialogRoleGroupUserVisible.value = false;
      cachedDialogRoleTreeSelected = {};
    };

    const cancelDialogRoleTree = () => {
      dialogRoleTreeItemRadio.value = -1;
      closeDialogRoleTree();
    };

    initData();

    function generateCodeHanlder() {
      formeDatas.rolePermissionForm.seamo = generateCode();
    }

    watch(
      () => formeDatas.rolePermissionForm.code,
      n => {
        if (n) {
          formeDatas.rolePermissionForm.code = String(n).replace(/[^\d]/g,'')
        }
      }
    );

    return {
      isAdd,
      isModify,
      elForms,
      roleAuthFormCanEdit,
      ...toRefs(formeDatas),
      dialogRoleGroupUserVisible,
      dialogRoleVisible,
      groupUserTree,
      groupUserTreeDefaultProps,
      dialogRoleGroupUserTree,
      dialogRoleGroupUserTreeDefaultProps,
      dialogRoleAuthTree,
      dialogRoleAuthTreeDefaultProps,
      dialogRoleAuthTreeRight,
      dialogRoleGroupUserItemRadio,
      dialogRoleTreeItemRadio,
      dialogRoleTreeCheckedKeys,
      elEltreeRole,
      elEltreeRole2,
      checkStrictly,
      permissionStatusTxt,
      t,
      generateCodeHanlder,
      operatHandler,
      roleAuthClickHandler,
      dialogRoleGroupUserClickHandler,
      dialogRoleAuthClickHandler,
      setting,
      cancel,
      submit,
      sureDialog,
      closeDialogRoleTree,
      cancelDialogRoleTree,
      dynamicMsg,
      dynamic
    };
  }
});
