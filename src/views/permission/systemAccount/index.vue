<template>
  <div class="pg-view system-account-view">
    <section class="query-sec">
      <span>{{ t('routes.system.acount') }}</span>
      <el-input v-model="queryForm.name" :placeholder="t('routes.system.acount_tips')" maxlength="20" class="mgl-10 ipt-input"></el-input>
      <span class="mgl-20">{{ t('routes.system.character') }}</span>
      <el-input
        v-model="queryForm.gname"
        :placeholder="t('routes.system.character_tips')"
        maxlength="24"
        @click="triggerShowGroupUserDialog('query')"
        clearable
        class="crs-p mgl-10 ipt-input"
        style="width: 220px"
      ></el-input>
      <!-- <el-select v-model="queryForm.groupid" placeholder="请选择角色" class="mgl-10">
          <el-option
            v-for="item in groupUserList"
            :key="item.gid"
            :label="item.label"
            :value="item.gid"
          >
          </el-option>
        </el-select> -->
      <span class="mgl-20">{{ t('global.select_tip') }}</span>
      <el-select v-model="queryForm.state" :placeholder="t('routes.vip_list_page.state_sel')" class="mgl-10">
        <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button type="primary" @click="query" class="mgl-20">{{ t('routes.vip_list_page.query') }}</el-button>
      <el-button @click="reset">{{ t('global.reset') }}</el-button>
    </section>
    <section class="pdb-20 mgt-20">
      <el-button type="primary" @click="addAccount">{{ t('global.increment') }}</el-button>
    </section>
    <section class="">
      <el-table :data="tableData" border fit style="width: 100%">
        <el-table-column type="index" :label="t('global.sort')" width="100" align="center"></el-table-column>
        <el-table-column prop="name" :label="t('routes.system.acount')" width="130" align="center"></el-table-column>
        <!-- <el-table-column
          prop="email"
          label="邮箱"
          align="center"
        ></el-table-column> -->
        <el-table-column :label="t('routes.system.character')" align="center">
          <template #default="scope">
            <span>{{ groupUserMap.get(scope.row.group_id) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="U盾序列"
          align="center"
        ></el-table-column> -->
        <el-table-column prop="create_at" :label="t('routes.system.creat_time')" align="center">
          <template #default="scope">
            <span>{{ dateFormat(new Date(scope.row.create_at * 1000), 'yyyy-MM-dd hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('routes.system.lastlogin_time')" align="center">
          <template #default="scope">
            <span>{{ $filters.format(scope.row.last_login_time, false) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="LastLoginIP" :label="t('routes.system.lastlogin_ip')" align="center">
          <template #default="scope">
            <span>{{ long2ip(scope.row.last_login_ip) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_name" :label="t('routes.system.create_people')" align="center"></el-table-column>
        <el-table-column prop="updated_name" :label="t('routes.system.last_editor')" align="center"></el-table-column>
        <el-table-column :label="t('global.select_tip')" align="center">
          <template #default="{ row }">
            <vxe-switch
              @click="editState(row)"
              :model-value="row.state"
              :open-label="t('routes.operation_manage_page.start')"
              :open-value="1"
              :close-label="t('routes.finance_manage_page.disabled')"
              :close-value="0"
            ></vxe-switch>
            <!-- <span v-if="row.state == 0">禁用</span>
            <span v-if="row.state == 1">启用</span> -->
            <!-- <vxe-switch :model-value="row.state" open-label="启用" :open-value="1" close-label="禁用" :close-value="0"></vxe-switch> -->
          </template>
        </el-table-column>
        <el-table-column :label="t('global.operating')" align="center">
          <template #default="scope">
            <span @click="edit(scope.row)" class="crs-p oper-txt-c">{{ t('global.edit') }}</span>
            <!-- <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="deleteAccount">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="flex jc-sb paginatino-wp mgt-20">
      <span>{{ t('routes.system.all') }}{{ totalCount }}{{ t('routes.system.all1') }}{{ curPage }}/{{ totalPage }}{{ t('routes.system.all2') }}</span>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="totalCount"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageSize"
        @size-change="sizesChangeHandler"
        @current-change="gotoPage"
      />
    </section>

    <el-dialog :title="`${dialogTitle}${t('routes.system.acount')}`" v-model="dialogVisible" width="800px" :close-on-click-modal="false" @close="closedDialog">
      <div class="dialog-ctx-wp">
        <el-form label-width="auto" :model="dialogFormInfo" :rules="formRules" ref="elDialogForm">
          <el-form-item :label="t('routes.system.acount')" prop="name">
            <el-input
              v-model.trim="dialogFormInfo.name"
              :placeholder="t('routes.system.acount_tips')"
              maxlength="20"
              :disabled="dialogType === 'edit'"
            ></el-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.character')" prop="group_id">
            <el-input
              v-model="dialogFormInfo.gname"
              :placeholder="t('routes.system.character_tips')"
              maxlength="24"
              readonly
              @click="triggerShowGroupUserDialog('dialog')"
              class="crs-p"
            ></el-input>
            <!-- <el-select v-model="dialogFormInfo.group_id" prop="group_id" placeholder="请选择角色">
              <el-option
                v-for="item in groupUserList"
                :key="item.gid"
                :label="item.label"
                :value="item.gid"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item :label="t('routes.system.login_psw')" prop="password">
            <el-input class="display_form" v-model.trim="dialogFormInfo.password" type="password"></el-input>
            <!-- <el-input v-model.trim="dialogFormInfo.password" placeholder="请输入密码校验" maxlength="20" show-password></el-input> -->
            <vxe-input style="width: 100%" v-model="dialogFormInfo.password" :placeholder="t('routes.system.login_psw')" type="password"></vxe-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.login_psw_confirm')" prop="passwordRepeat" v-if="dialogType === 'add'">
            <el-input class="display_form" v-model.trim="dialogFormInfo.passwordRepeat" type="password"></el-input>
            <!-- <el-input v-model.trim="dialogFormInfo.passwordRepeat" placeholder="请输入密码校验" maxlength="20" show-password></el-input> -->
            <vxe-input style="width: 100%" v-model="dialogFormInfo.passwordRepeat" :placeholder="t('routes.system.login_psw_confirm')" type="password"></vxe-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.dynamic_psw')" prop="seamo">
            <el-input v-model.trim="dialogFormInfo.seamo" disabled :placeholder="t('routes.system.dynamic_psw_tips')">
              <template #append>
                <el-button type="primary" v-clipboard="dialogFormInfo.seamo">{{ t('global.ctrlv') }}</el-button>
                <el-divider direction="vertical" content-position="left"></el-divider>
                <el-button type="primary" @click="generateCode">{{ t('routes.system.create_psw') }}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="t('routes.system.role_state')" prop="state" v-if="dialogType === 'add'">
            <el-radio v-model="dialogFormInfo.state" :label="0">{{ t('routes.system.close') }}</el-radio>
            <el-radio v-model="dialogFormInfo.state" :label="1">{{ t('routes.system.open') }}</el-radio>
          </el-form-item>
          <el-form-item
            v-if="dialogType !== 'add'"
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
            <el-input v-model="dialogFormInfo.code" :placeholder="t('routes.finance_manage_page.dynamic_code_tip')" maxlength="6" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="sure">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog :title="t('routes.system.role_select')" v-model="dialogRoleGroupUserVisible" width="400px" :close-on-click-modal="false">
      <div class="dialog-groupuser-tree-wp">
        <el-tree
          :data="groupUserTree"
          :props="groupUserTreeDefaultProps"
          @node-click="dialogGroupUserClickHandler"
          empty-text=""
          :highlight-current="true"
          node-key="gid"
          :default-expanded-keys="[0, 1]"
        />
      </div>
    </el-dialog>
    <DynamicVerificationCode ref="dynamicVerificationCode">
      <template #vit>
        <el-button type="primary" @click="VitHanlder">{{ t('routes.finance_manage_page.yz') }}</el-button>
      </template>
    </DynamicVerificationCode>
  </div>
</template>

<script src="./index.ts"></script>

<style lang="scss">
@import './index.scss';
</style>
