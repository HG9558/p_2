<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form
      :model="queryParams"
      ref="queryFormEl"
      size="small"
      :inline="true"
      label-width="auto"
    >
      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input
          v-model="queryParams.username"
          :placeholder="t('routes.activity.username_placeholder')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input
          v-model="queryParams.uid"
          :placeholder="t('routes.activity.userId_placeholder')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道id" prop="cid">
        <el-input
          v-model="queryParams.cid"
          :placeholder="t('global.enter') + '渠道id'"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="t('routes.vip_list_page.email')" prop="email">
        <el-input
          v-model="queryParams.email"
          :placeholder="t('routes.vip_list_page.email_tips')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        :label="t('routes.vip_list_page.invitation_code')"
        prop="email"
      >
        <el-input
          v-model="queryParams.invite_code"
          :placeholder="t('routes.vip_list_page.invitation_code_label')"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item :label="t('global.account_type')" prop="tester">
        <el-select v-model="queryParams.tester" placeholder>
          <el-option
            v-for="(selectItem, selectIndex) in AccountType"
            :key="selectIndex"
            :label="selectItem.label"
            :value="selectItem.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('routes.vip_list_page.reg_time')" prop="day">
        <el-date-picker
          v-model="timer"
          type="datetimerange"
          @change="timerChange"
          unlink-panels
          value-format="YYYY-MM-DD HH:mm:ss"
          :range-separator="t('global.zhi')"
          :start-placeholder="t('global.start_date')"
          :end-placeholder="t('global.end_date')"
          :shortcuts="shortcuts"
        >
        </el-date-picker>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="ml10"
          size="mini"
          @click="handleQuery"
          >{{ t("global.search") }}</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{
          t("global.reset")
        }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="openVipDialog"
          >{{ t("routes.vip_list_page.add_vip") }}</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="listData">
      <el-table-column
        :label="t('routes.activity.userId')"
        align="center"
        prop="uid"
      />
      <el-table-column
        :label="t('routes.activity.username')"
        align="center"
        prop="username"
      />
      <el-table-column
        :label="t('routes.vip_list_page.vip_usephone')"
        align="center"
        prop="phone"
      />
      <el-table-column
        :label="t('routes.agent.channelAgent')"
        align="center"
        prop="cname"
        width="260"
      >
        <template #default="{ row }">
          <div>{{ row.cname ? `${row.cname} : ${row.cid}` : "-" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="邀请信息" align="center" prop="cname" width="180">
        <template #default="{ row }">
          <el-tag type="warning"
            >{{ t("routes.agent.direct_push_num") }}：{{
              row.direct_push_num
            }}</el-tag
          >
          <div>
            <span class="row-label">{{
              t("routes.agent.direct_push_deposit_num")
            }}</span
            >：{{ row.direct_push_deposit_num }}
          </div>
          <div>
            <span class="row-label">{{
              t("routes.agent.direct_push_deposit")
            }}</span
            >：{{ row.direct_push_deposit }}
          </div>
          <div>
            <span class="row-label">{{ "直推首充金额" }}</span
            >：{{ row.direct_push_fd_amount }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('routes.activity.vip')"
        align="center"
        prop="vip"
      />
      <el-table-column
        :label="t('routes.vip_list_page.superior_agency')"
        align="left"
        prop="id"
      >
        <template #default="{ row }">
          <div>上上级：{{ row.great_grand_name }}</div>
          <div>上上级：{{ row.grand_name }}</div>
          <div>上级：{{ row.parent_name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        :label="t('routes.vip_list_page.reg_message')"
        align="left"
        width="260"
      >
        <template #default="{ row }">
          <div>{{ t("routes.vip_list_page.email") }}：{{ row.email }}</div>
          <div>
            {{ t("routes.vip_list_page.reg_time") }}：{{
              $filters.format(row.created_at, false)
            }}
          </div>
          <div>
            {{ t("routes.vip_list_page.reg_ip") }}：{{ row.created_ip }}
          </div>
          <div>
            {{ t("routes.vip_list_page.zcyqm") }}：{{ row.invite_code }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('routes.report_center_page.account_balance') + '(BRL)'"
        align="center"
        prop="deposit_amount"
        width="200"
      >
        <template #default="{ row }">
          <div>{{ t("routes.tips.ye") }}：{{ toFixedN2(row.brl, 2) }}</div>
          <div>
            {{ t("routes.vip_list_page.cumulative_deposit") }}：{{
              row.deposit_amount
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('routes.agent.jf')"
        align="center"
        prop="score"
      />
      <el-table-column
        :label="t('global.account_type')"
        align="center"
        prop="tester"
        :formatter="AccountTypeFormatter"
      />
      <!-- 状态 -->
      <el-table-column label="状态" align="center" prop="state">
        <template #default="{ row }">
          {{ stateToString(String(row.state)) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('global.operating')"
        align="center"
        width="200"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleDetail(scope.row)"
            >{{ t("global.detail") }}</el-button
          >
          <br />
          <el-button
            size="mini"
            type="text"
            icon="el-icon-sort"
            @click="handlePoints(scope.row)"
            >{{ t("global.setpoints") }}</el-button
          >
          <br />
          <el-button
            size="mini"
            type="text"
            :icon="
              scope.row.can_bonus !== 1
                ? 'el-icon-circle-check'
                : 'el-icon-circle-close'
            "
            @click="handleBanReward(scope.row)"
            :style="{
              color: scope.row.can_bonus !== 1 ? '#409EFF' : '#F56C6C',
            }"
          >
            {{
              t(
                `routes.vip_list_page.${
                  scope.row.can_bonus == 1 ? "banBonus" : "enableBonus"
                }`
              )
            }}</el-button
          >
          <br />
          <el-button
            size="mini"
            type="text"
            :icon="
              scope.row.can_rebate !== 1
                ? 'el-icon-circle-check'
                : 'el-icon-circle-close'
            "
            @click="handleBanRebate(scope.row)"
            :style="{
              color: scope.row.can_rebate !== 1 ? '#409EFF' : '#F56C6C',
            }"
          >
            {{
              t(
                `routes.vip_list_page.${
                  scope.row.can_rebate == 1 ? "banRebate" : "enableRebate"
                }`
              )
            }}</el-button
          >
          <br />
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="handleUserSetting(scope.row)"
          >
            状态设置
          </el-button>
          <br />
          <el-button
            size="mini"
            type="text"
            icon="el-icon-setting"
            @click="setCid(scope.row)"
          >
            {{ "绑定渠道" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total > 0"
      :total="total"
      v-model:current-page="queryParams.page"
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size"
      @current-change="getList"
      @size-change="getList"
    />
    <!-- 用户详情 -->
    <el-dialog
      :title="title"
      v-model="open"
      width="800px"
      append-to-body
      @close="cancel"
    >
      <el-card>
        <template #header>
          <div class="card-header">
            <i class="el-icon-user mr10"></i>
            <span class="mx-1" style="color: #409eff">{{
              userInfo?.username
            }}</span>
          </div>
        </template>
        <el-descriptions class="margin-top" :column="3">
          <el-descriptions-item :label="t('routes.vip_list_page.reg_time')">
            <div>{{ $filters.format(userInfo.created_at, false) }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.vip_list_page.reg_ip')">
            <div>{{ userInfo.created_ip }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.vip_list_page.zcyqm')">
            <div>{{ userInfo.invite_code }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.vip_list_page.vip_usephone')">
            <div>{{ userInfo.phone }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.activity.vip')">
            <div>{{ userInfo.vip }}</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('global.account_type')">
            <div>
              <el-tag>{{
                AccountTypeFormatter("", "", userInfo.tester)
              }}</el-tag>
            </div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.tips.ye')">
            <div style="color: red">{{ toFixedN2(userInfo.brl, 2) }} BRL</div>
          </el-descriptions-item>
          <el-descriptions-item
            :label="t('routes.vip_list_page.cumulative_deposit')"
          >
            <div>{{ toFixedN2(userInfo.deposit_amount) }} BRL</div>
          </el-descriptions-item>
          <el-descriptions-item :label="t('routes.agent.jf')">
            <div>{{ userInfo.score }}</div>
          </el-descriptions-item>

          <el-descriptions-item :label="t('routes.vip_list_page.email')">
            <div>{{ userInfo.email }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-dialog>
    <!-- 添加测试账号 -->
    <el-dialog
      :title="title"
      v-model="openVip"
      width="500px"
      append-to-body
      @close="cancelPoints"
    >
      <el-form ref="formEl" :model="vipform" :rules="rules" label-width="auto">
        <el-form-item
          :label="t('routes.vip_list_page.bank.username')"
          prop="username"
          class="mt10"
        >
          <el-input
            v-model="vipform.username"
            :placeholder="t('routes.activity.username_placeholder')"
            class="nbInput"
          />
        </el-form-item>
        <el-form-item
          :label="t('routes.system.login_psw')"
          prop="password"
          class="mt10"
        >
          <el-input
            v-model="vipform.password"
            :placeholder="t('routes.system.login_psw_tips')"
            class="nbInput"
          />
        </el-form-item>
        <el-form-item
          :label="t('global.account_type')"
          prop="tester"
          :placeholder="t('global.please_choose')"
        >
          <el-select v-model="vipform.tester">
            <template v-for="item in AccountType" :key="item.value">
              <el-option
                v-if="item.value === '2' || item.value === '3'"
                :label="item.label"
                :value="+item.value"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="t('routes.vip_list_page.superior_agency')"
          prop="parent_id"
          class="mt10"
        >
          <el-input
            v-model="vipform.parent_id"
            :placeholder="t('routes.vip_list_page.superior_agency_id_tips')"
            class="nbInput"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddvip">{{
          t("global.submit")
        }}</el-button>
        <el-button @click="cancel">{{ t("global.cancel") }}</el-button>
      </div>
    </el-dialog>

    <!-- 会员上下分 -->
    <el-dialog
      :title="title"
      v-model="openPoints"
      width="500px"
      append-to-body
      @close="cancel"
    >
      <el-form
        ref="vipPointsFormEl"
        :model="vipPointsform"
        :rules="rules2"
        label-width="auto"
      >
        <el-form-item
          :label="t('routes.vip_list_page.vip_id')"
          prop="uid"
          class="mt10"
        >
          <el-input
            v-model="vipPointsform.uid"
            :placeholder="t('routes.risk.userid_tips')"
            class="nbInput"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item
          :label="t('routes.vip_list_page.up_down')"
          prop="adjust_mode"
          :placeholder="t('global.please_choose')"
        >
          <el-select v-model="vipPointsform.adjust_mode">
            <el-option
              :label="t('routes.vip_list_page.up')"
              :value="1"
            ></el-option>
            <el-option
              :label="t('routes.vip_list_page.down')"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="t('routes.vip_list_page.up_amount')"
          prop="amount"
          class="mt10"
        >
          <el-input
            v-model="vipPointsform.amount"
            :placeholder="t('routes.vip_list_page.adjust_money')"
            class="nbInput"
          />
        </el-form-item>
        <el-form-item
          :label="t('routes.finance_manage_page.upper_reason')"
          prop="apply_remark"
          class="mt10"
        >
          <el-input
            v-model="vipPointsform.apply_remark"
            :placeholder="t('routes.finance_manage_page.enter_upper_reason')"
            class="nbInput"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commitPoints">{{
          t("global.submit")
        }}</el-button>
        <el-button @click="cancelPoints">{{ t("global.cancel") }}</el-button>
      </div>
    </el-dialog>
    <!-- 设置账号状态 -->
    <el-dialog
      title="账号状态设置"
      v-model="userSetting"
      width="500px"
      append-to-body
    >
      <el-form
        ref="userSettingRef"
        :model="userSettingForm"
        :rules="rules3"
        label-width="auto"
      >
        <el-form-item
          label="账号状态"
          prop="state"
          :placeholder="t('global.please_choose')"
        >
          <el-select v-model="userSettingForm.state" multiple>
            <el-option
              v-for="item in userState"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交备注" prop="remake">
          <el-input
            v-model="userSettingForm.remake"
            placeholder="请输入备注"
            class="nbInput"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            maxlength="150"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setUserSetting">{{
          t("global.submit")
        }}</el-button>
        <el-button @click="userSetting = !userSetting">{{
          t("global.cancel")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 绑定渠道 -->
    <el-dialog
      title="绑定渠道"
      v-model="bindStatus"
      width="500px"
      append-to-body
      @close="cancelChannel"
    >
      <el-form
        ref="channelFormEl"
        :model="channelData"
        :rules="rules4"
        label-width="auto"
      >
        <el-form-item
          :label="t('routes.activity.userId')"
          prop="uid"
          class="mt10"
        >
          <el-input
            v-model="channelData.uid"
            class="nbInput"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="渠道id" prop="cid" class="mt10">
          <el-input
            v-model="channelData.cid"
            placeholder="请输入渠道id"
            class="nbInput"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commitChannel">{{
          t("global.submit")
        }}</el-button>
        <el-button @click="cancelChannel">{{ t("global.cancel") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ElForm, ElMessage, ElMessageBox } from "element-plus";
import {
  getMemberList,
  addTesterMember,
  upOrDownPoints,
  updateBonus,
  updateRebate,
  updateMemberStatus,
  updateAgentChannel,
} from "@/http/modules/viplist";
import { empty } from "@/components/serch-form/empty";
import { toFixedN2 } from "@/utils/int";
import useShortcuts from "@/components/serch-form/useShortcuts";
type FormInstance = typeof ElForm;
export default defineComponent({
  name: "signRewardList",
  setup() {
    const { t } = useI18n({ useScope: "global" });
    const { shortcuts } = useShortcuts();
    const timer = ref([]);
    const route = useRoute();
    const loading = ref(false);
    const ids = ref([]);
    const open = ref(false); ////会员详情
    const title = ref("");
    const queryFormEl = ref<FormInstance | null>(null);
    const formEl = ref<FormInstance | null>(null);
    const vipPointsFormEl = ref<FormInstance | null>(null);
    const userSettingRef = ref<FormInstance | null>(null);
    const total = ref();
    const userInfo = ref<any>({});
    const openVip = ref(false); //新增测试账号弹出
    const openPoints = ref(false); //上下分弹窗
    const userSetting = ref(false); //设置账号状态
    const bindStatus = ref(false); //绑定渠道弹窗
    // state 1正常 2登陆锁定 3游戏锁定 4充提锁定
    const userState = ref([
      {
        label: "正常",
        value: "1",
      },
      {
        label: "登陆锁定",
        value: "2",
      },
      {
        label: "游戏锁定",
        value: "3",
      },
      {
        label: "充提锁定",
        value: "4",
      },
    ]);
    const vipform = ref({
      username: "",
      password: "",
      parent_id: "",
      tester: "",
    });
    const vipPointsform = ref({
      uid: "",
      amount: "",
      adjust_mode: null, //1上分 2下分
      apply_remark: "",
      brl: 0,
    });
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      // vip: '',
      username: "",
      start_time: computed(() => timer.value[0] ?? ""),
      end_time: computed(() => timer.value[1] ?? ""),
      tester: "",
      email: "",
      uid: "",
      invite_code: "",
      cid: "",
    });
    const userSettingForm = ref({
      state: [],
      remake: "",
    });
    const AccountType = [
      {
        label: t("global.checkall"),
        value: "",
      },
      {
        label: t("global.official_account"),
        value: "1",
      },
      {
        label: t("global.test_account"),
        value: "2",
      },
      {
        label: t("routes.tips.proxy_account"),
        value: "3",
      },
    ];
    const AccountTypeFormatter = (row, col, cell) => {
      const res = AccountType.find((item) => +item.value === cell);
      return res?.label ?? "-";
    };
    const listData = ref([]);
    const getList = () => {
      getMemberList({ ...empty.preProcessData(queryParams) }).then(
        (res: any) => {
          if (res.status) {
            if (queryParams.page === 1) {
              total.value = res.data.t;
            }
            listData.value = res.data.d;
          }
        }
      );
    };
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        queryParams.page = 1;
        timer.value = [];
      }
      getList();
    };
    const handleQuery = () => {
      queryParams.page = 1;
      getList();
    };
    const timerChange = () => {
      console.log(timer.value);
      console.log(queryParams);
    };
    const handleDetail = (row: any) => {
      title.value = t("routes.tips.vip_detail");
      userInfo.value = row;
      open.value = true;
    };
    const handlePoints = (row: any) => {
      title.value = t("global.vipPoints");
      vipPointsform.value = {
        uid: row.uid,
        amount: "",
        adjust_mode: null, //1上分 2下分
        apply_remark: "",
        brl: +row.brl, //存款金额
      };
      openPoints.value = true;
    };
    const currentSettingInfo = ref<any>({});
    const handleUserSetting = (row: any) => {
      const _row = { ...row };
      _row.state = _row.state.toString();
      userSetting.value = true;
      currentSettingInfo.value = row;
      userSettingForm.value = {
        state: _row.state === "0" ? [] : _row.state.split(","),
        remake: "",
      };
    };
    //
    const cancel = () => {
      open.value = false;
    };
    const validAmout = (rule: any, value: any, callback: any) => {
      if (
        vipPointsform.value.adjust_mode == 2 &&
        vipPointsform.value.brl < value
      ) {
        callback(
          new Error(
            `${t("routes.tips.ye")}:${vipPointsform.value.brl},
         ${t("routes.tips.insufficient_balance")}  
          `
          )
        );
      } else {
        callback();
      }
    };
    // 表单校验
    const rules = reactive<FormInstance["rules"]>({
      tester: [
        { required: true, message: t("global.please_choose"), trigger: "blur" },
      ],
      username: [
        {
          required: true,
          message: t("routes.activity.username_placeholder"),
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: t("routes.system.login_psw_tips"),
          trigger: "blur",
        },
      ],
    });
    // 表单校验2
    const rules2 = reactive<FormInstance["rules"]>({
      adjust_mode: [
        { required: true, message: t("global.please_choose"), trigger: "blur" },
      ],
      amount: [
        {
          required: true,
          message: t("routes.vip_list_page.adjust_money"),
          trigger: "blur",
        },
        { validator: validAmout },
      ],
      apply_remark: [
        {
          required: true,
          message: t("routes.finance_manage_page.enter_upper_reason"),
          trigger: "blur",
        },
      ],
    });
    const rules3 = reactive<FormInstance["rules"]>({
      state: [
        { required: true, message: t("global.please_choose"), trigger: "blur" },
      ],
      remake: [{ required: true, message: "请输入备注", trigger: "blur" }],
    });
    const rules4 = reactive<FormInstance["rules"]>({
      cid: [{ required: true, message: "请输入渠道id", trigger: "blur" }],
    });
    const openVipDialog = () => {
      openVip.value = true;
      title.value = t("global.increment");
      vipform.value = {
        username: "",
        password: "",
        parent_id: "",
        tester: "",
      };
    };
    const handleAddvip = () => {
      if (formEl.value) {
        formEl.value.validate((valid, fields) => {
          if (valid) {
            addTesterMember(vipform.value).then((res) => {
              openVip.value = false;
              getList();
              if (res.status) {
                ElMessage.success({
                  message: t("global.submit_suc"),
                  type: "success",
                });
              }
            });
          } else {
            console.log("error submit!", fields);
            return false;
          }
        });
      }
    };
    // 上分
    const commitPoints = () => {
      if (vipPointsFormEl.value) {
        vipPointsFormEl.value.validate((valid, fields) => {
          if (valid) {
            upOrDownPoints({
              ...vipPointsform.value,
              amount: vipPointsform.value.amount + "",
            }).then((res) => {
              openPoints.value = false;
              if (res.status) {
                ElMessage.success({
                  message: t("global.submit_suc"),
                  type: "success",
                });
                getList();
              }
            });
          }
        });
      }
    };
    const cancelPoints = () => {
      openPoints.value = false;
    };
    //1启用 2禁用
    const handleBanReward = (row: any) => {
      updateBonus({
        uid: row.uid,
        can_bonus: row.can_bonus !== 1 ? 1 : 2,
      }).then((res) => {
        if (res.status) {
          ElMessage.success({
            message: t("global.update_suc"),
            type: "success",
          });
          getList();
        }
      });
    };
    //1启用 2禁用
    const handleBanRebate = (row: any) => {
      updateRebate({
        uid: row.uid,
        can_rebate: row.can_rebate !== 1 ? 1 : 2,
      }).then((res) => {
        if (res.status) {
          ElMessage.success({
            message: t("global.update_suc"),
            type: "success",
          });
          getList();
        }
      });
    };

    const setUserSetting = () => {
      if (userSettingRef.value) {
        userSettingRef.value.validate((valid: any) => {
          if (valid) {
            updateMemberStatus({
              ...{
                remake: userSettingForm.value.remake,
                state: userSettingForm.value.state.join(","),
              },
              uid: currentSettingInfo.value.uid,
            }).then((res) => {
              userSetting.value = false;
              if (res.status) {
                ElMessage.success({
                  message: t("global.submit_suc"),
                  type: "success",
                });
                getList();
              }
            });
          }
        });
      }
    };

    const stateToString = (ids: string) => {
      return ids
        .split(",")
        .map((item) => {
          return (
            userState.value.find((state) => state.value === item)?.label ?? ""
          );
        })
        .join(",");
    };
    getList();
    const channeldata = {
      uid: "",
      cid: "",
    };
    const channelData = ref({
      ...channeldata,
    });
    /**
     * @description 设置绑定渠道
     * @param row
     */
    const setCid = (row: any) => {
      bindStatus.value = true;
      channelData.value = {
        uid: row.uid,
        cid: row.cid,
      };
    };
    /**
     * @description 绑定渠道
     * @param row
     */
    const commitChannel = async () => {
      let res = await updateAgentChannel(channelData.value);
      if (res.status) {
        bindStatus.value = false;
        ElMessage.success({
          message: t("global.submit_suc"),
          type: "success",
        });
        getList();
      }
    };
    const cancelChannel = () => {
      channelData.value = { ...channeldata };
      bindStatus.value = false;
    };

    //
    return {
      route,
      loading,
      ids,
      open,
      queryParams,
      total,
      listData,
      title,
      userSetting,
      userSettingForm,
      userState,
      queryFormEl,
      formEl,
      userSettingRef,
      rules3,
      stateToString,
      handleDetail,
      setUserSetting,
      handleUserSetting,
      t,
      getList,
      timer,
      shortcuts,
      timerChange,
      AccountType,
      AccountTypeFormatter,
      toFixedN2,
      resetQuery,
      handleQuery,
      userInfo,
      cancel,
      handleAddvip,
      openVip,
      openVipDialog,
      vipform,
      rules,
      rules2,
      handlePoints,
      openPoints,
      vipPointsform,
      vipPointsFormEl,
      commitPoints,
      cancelPoints,
      handleBanReward,
      handleBanRebate,
      setCid,
      bindStatus,
      channelData,
      rules4,
      commitChannel,
      cancelChannel,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.el-descriptions__body) {
  > table > tbody > tr {
    display: flex;
    width: 718px;
    gap: 10px;

    > td {
      width: 33.33%;
      font-size: 14px;

      .el-descriptions__label {
        font-weight: bolder;
        color: #000;
      }
    }
  }

  tr + tr {
    border-top: 1px dashed #efefef;
    padding-top: 10px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.nbInput {
  width: 230px;
}
</style>
