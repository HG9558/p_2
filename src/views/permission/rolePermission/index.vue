<template>
  <div class="pg-view permission-view">
    <section class="oper-row">
      <el-button type="primary" @click="operatHandler('add')">{{ t('global.increment') }}</el-button>
      <!-- <el-button type="danger" @click="operatHandler('del')">删除</el-button> -->
      <!-- <el-button type="success" @click="operatHandler('edit')">{{ t('global.edit') }}</el-button> -->
    </section>
    <section class="flex">
      <div class="role-tree-wp">
        <el-tree :data="groupUserTree" :default-expand-all="true" :expand-on-click-node="false" :props="groupUserTreeDefaultProps" @node-click="roleAuthClickHandler" empty-text="">
          <template v-slot:default="slotProps"> {{ slotProps.data.label }} <span :id="`gid${slotProps.data.gid}`"></span></template>
        </el-tree>
      </div>
      <div class="flex1 role-per-sec">
        <el-form label-width="auto" :model="rolePermissionForm" ref="elForms">
          <el-form-item :label="t('routes.system.role_name')">
            <el-input v-model="rolePermissionForm.gname" :placeholder="t('routes.system.role_tips1')" :disabled="roleAuthFormCanEdit" maxlength="24"></el-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.up_name')" class="role-p-set">
            <el-input v-model="rolePermissionForm.pname" :disabled="true"></el-input>
            <el-button type="primary" @click="setting('parentRole')" :disabled="!isAdd" class="mgl-10">{{  t('global.edit')  }}</el-button>
          </el-form-item>
          <el-form-item :label="t('routes.system.role_permissions')" class="role-p-set">
            <el-input v-model="permissionStatusTxt" :disabled="true"></el-input>
            <el-button type="primary" @click="setting('role')" :disabled="roleAuthFormCanEdit" class="mgl-10">{{ t('routes.system.pz') }}</el-button>
          </el-form-item>
          <el-form-item :label="t('routes.system.role_notes')">
            <el-input type="textarea" v-model="rolePermissionForm.noted" maxlength="24"></el-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.role_state')">
            <el-radio v-model="rolePermissionForm.state" :label="0" :disabled="roleAuthFormCanEdit">{{ t('routes.system.close') }}</el-radio>
            <el-radio v-model="rolePermissionForm.state" :label="1" :disabled="roleAuthFormCanEdit">{{ t('routes.system.open') }}</el-radio>
          </el-form-item>
          <!-- <el-form-item :label="t('routes.system.dynamic_psw')" style="width: 700px">
            <el-input v-model.trim="rolePermissionForm.seamo" disabled :placeholder="t('routes.system.dynamic_psw_tips')" maxlength="24">
              <template #append>
                <el-button type="primary" @click="generateCodeHanlder">{{ t('routes.system.create_psw') }}</el-button>
              </template>
            </el-input>
          </el-form-item> -->
          <el-form-item
            :label="t('routes.finance_manage_page.dynamic_code')"
            prop="code"
            :rules="[
              {
                required: true,
                message: t('routes.finance_manage_page.dynamic_code_tip'),
                trigger: 'blur'
              },
              {
                pattern: dynamic,
                message: dynamicMsg
              }
            ]"
          >
            <el-input v-model="rolePermissionForm.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6" />
          </el-form-item>
          <el-form-item v-if="isModify | isAdd">
            <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
            <el-button type="primary" @click="submit">{{ t('global.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex1 role-per-sec" id="disalbletree">
        <el-tree
          :data="dialogRoleAuthTreeRight"
          :props="dialogRoleAuthTreeDefaultProps"
          empty-text=""
          show-checkbox
          node-key="id"
          ref="elEltreeRole2"
        >
          <template v-slot:default="slotProps"> {{ slotProps.data.label }}  ({{slotProps.data.module}}) <span :id="`one${slotProps.data.docId}`"></span> </template>
        </el-tree>
      </div>
    </section>
    <el-dialog :title="t('routes.system.user_moudel')" v-model="dialogRoleGroupUserVisible" width="800px" :close-on-click-modal="false">
      <div class="dialog-role-tree-wp">
        <el-tree
          :data="dialogRoleGroupUserTree"
          :expand-on-click-node="false"
          :default-expand-all="true" 
          :props="dialogRoleGroupUserTreeDefaultProps"
          @node-click="dialogRoleGroupUserClickHandler"
          empty-text=""
          :highlight-current="true"
        >
          <template v-slot:default="slotProps">
            <el-radio v-model="dialogRoleGroupUserItemRadio" :label="slotProps.data.gid">{{ slotProps.data.gname }} </el-radio>
          </template>
        </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialogRoleTree">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="sureDialog">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog :title="t('routes.system.auth_model')" v-model="dialogRoleVisible" width="800px" :close-on-click-modal="false">
      <div class="dialog-role-tree-wp">
        <el-tree
          :data="dialogRoleAuthTree"
          :props="dialogRoleAuthTreeDefaultProps"
          @node-click="dialogRoleAuthClickHandler"
          empty-text=""
          :render-after-expand="false"
          :highlight-current="true"
          show-checkbox
          node-key="id"
          ref="elEltreeRole"
        >
          <template v-slot:default="slotProps"> {{ slotProps.data.label }}  ({{slotProps.data.module}}) <span :id="`two${slotProps.data.docId}`"></span> </template>
        </el-tree>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialogRoleTree">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="sureDialog('role')">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
