<template>
  <div>
    <div class="betting-cont">
      <div class="betting-title">
        <el-menu :default-active="actives.activeIndex" class="el-menu-demo" active-text-color="#409eff" mode="horizontal">
          <el-menu-item index="1">投注记录</el-menu-item>
        </el-menu>
      </div>
      <div class="betting-table">
        <el-form :inline="true" ref="ruleForm" :model="formInline" class="demo-form-inline">
          <el-form-item label="场馆名称:">
            <el-select v-model="formInline.tz1" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="场馆名字" value="beijing"></el-option>
              <el-option label="场馆名字2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="场馆类型:">
            <el-select v-model="formInline.tz2" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="场馆类型" value="beijing"></el-option>
              <el-option label="场馆类型" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏名称:">
            <el-input v-model="formInline.tz3" placeholder="请输入游戏名称"></el-input>
          </el-form-item>
          <el-form-item label="会员账号:">
            <el-input v-model="formInline.tz4" placeholder="请输入会员账号"></el-input>
          </el-form-item>
          <el-form-item label="代理账号:">
            <el-input v-model="formInline.tz5" placeholder="请输入代理账号"></el-input>
          </el-form-item>
          <el-form-item label="注单流水号:">
            <el-input v-model="formInline.tz6" placeholder="请输入注单流水号"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.tz7" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="未结算" value="beijing"></el-option>
              <el-option label="已结算" value="beijing"></el-option>
              <el-option label="取消" value="beijing"></el-option>
              <el-option label="无效" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整方式">
            <el-select v-model="formInline.tz8" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="上分" value="beijing"></el-option>
              <el-option label="下分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整钱包">
            <el-select v-model="formInline.tz9" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="中心钱包" value="beijing"></el-option>
              <el-option label="各场馆钱包" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.tz10" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="成功" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下注时间" class="time">
            <el-select v-model="formInline.tz11" placeholder="选择">
              <el-option label="申请时间" value="shanghai"></el-option>
              <el-option label="完成时间" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <div class="block">
              <el-date-picker v-model="formInline.tz12" type="datetimerange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" @change="pickChange"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="游戏编号:">
            <el-input v-model="formInline.tz13" placeholder="请输入游戏编号"></el-input>
          </el-form-item>
          <el-form-item label="提前结算">
            <el-select v-model="formInline.tz14" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二次结算">
            <el-select v-model="formInline.tz15" placeholder="请选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="是" value="beijing"></el-option>
              <el-option label="否" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下注金额:">
            <el-input v-model="formInline.tz16" placeholder="请输入下注金额"></el-input>
          </el-form-item>
          <el-form-item label="联赛/赛事名称:">
            <el-input v-model="formInline.tz17" placeholder="输入联赛/赛事名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="select">筛选</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button icon="el-icon-download">导出Csv</el-button>
          </el-form-item>
        </el-form>
        <div class="betting-tables">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="col1" label="会员账号" align="center" :class-name="colors.isStutas"></el-table-column>
            <el-table-column prop="col2" label="场馆名称" align="center"></el-table-column>
            <el-table-column prop="col3" label="场馆类型" align="center"></el-table-column>
            <el-table-column prop="col4" label="游戏名称" align="center"></el-table-column>
            <el-table-column prop="col5" label="游戏编号" align="center"></el-table-column>
            <el-table-column prop="col6" label="输赢情况" sortable align="center"></el-table-column>

            <el-table-column prop="col7" label="下注详情" align="center">
              <template #default="scope">
                <span style="margin-left: 10px">
                  <el-popover placement="top-start" title :width="200" trigger="hover" :content="scope.row.col7">
                    <template #reference>
                      <span>{{ scope.row.col7 }}</span>
                    </template>
                  </el-popover>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="col8" label="下注金额(KVND)" sortable align="center"></el-table-column>
            <el-table-column prop="col9" label="有效投注(KVND)" align="center" sortable></el-table-column>
            <el-table-column prop="col10" label="状态" align="center"></el-table-column>
            <el-table-column prop="col11" label="下注时间" align="center"></el-table-column>
            <el-table-column prop="col12" label="开赛时间" align="center"></el-table-column>
            <el-table-column prop="col13" label="结算时间" align="center"></el-table-column>
            <el-table-column prop="col14" label="流水号" align="center"></el-table-column>
          </el-table>

          <p class="empty"></p>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { ElForm } from 'element-plus';
export default defineComponent({
  name: 'BettingManage',

  setup() {
    const actives = ref({
      activeIndex: '1'
    });
    const formInline = ref({
      tz1: '',
      tz2: '',
      tz3: '',
      tz4: '',
      tz5: '',
      tz6: '',
      tz7: '',
      tz8: '',
      tz9: '',
      tz10: '',
      tz11: '',
      tz12: '',
      tz13: '',
      tz14: '',
      tz15: '',
      tz16: '',
      tz17: ''
    });

    const dataPickers = reactive({
      shortcuts: [
        {
          text: '最近一周',
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })()
        },
        {
          text: '最近一个月',
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })()
        },
        {
          text: '最近三个月',
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })()
        }
      ]
    });

    const bettingTableData = reactive({
      tableData: [
        {
          col1: 'cz2021',
          col2: 'KOK彩票',
          col3: '彩票',
          col4: '排列3/5',
          col5: '2021048',
          col6: '0.12',
          col7: 'sfsadfasdfasdfasdfasdfasfasdfasdfasfasfdasfasfasfasdfsd',
          col8: '127.21',
          col9: '0.00',
          col10: '取消',
          col11: '2021-09-27 22:45:12',
          col12: '2021-09-27 22:45:12',
          col13: '2021-09-27 22:45:12',
          col14: '123121232132'
        },
        {
          col1: 'cz2021',
          col2: 'KOK彩票',
          col3: '彩票',
          col4: '排列3/5',
          col5: '2021048',
          col6: '0.12',
          col7: '下注详情',
          col8: '127.21',
          col9: '0.00',
          col10: '取消',
          col11: '2021-09-27 22:45:12',
          col12: '2021-09-27 22:45:12',
          col13: '2021-09-27 22:45:12',
          col14: '123121232132'
        }
      ]
    });
    const colors = ref({
      isStutas: 'blue'
    });
    function pickChange() {
      const date1 = new Date(formInline.value.tz12[0]);
    }
    function select() {
      console.log(formInline.value);
    }
    const ruleForm = ref<typeof ElForm | null>(null);
    const reset = () => {
      formInline.value = {
        tz1: '',
        tz2: '',
        tz3: '',
        tz4: '',
        tz5: '',
        tz6: '',
        tz7: '',
        tz8: '',
        tz9: '',
        tz10: '',
        tz11: '',
        tz12: '',
        tz13: '',
        tz14: '',
        tz15: '',
        tz16: '',
        tz17: ''
      };
    };
    function handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`);
    }
    function handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
    }
    return {
      actives,
      formInline,
      ...toRefs(dataPickers),
      pickChange,
      select,
      reset,
      ruleForm,
      ...toRefs(bettingTableData),
      colors,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>
<style lang="scss" scoped>
.betting-cont {
  margin: 20px;
  background: white;
  ::v-deep(.green) {
    color: #3fb107;
  }
  ::v-deep(.blue) {
    color: #409eff;
  }
  ::v-deep(.el-table th > .cell) {
    color: gray;
  }
}
.betting-title {
  > ul {
    padding-left: 20px;
  }
}
.betting-table {
  padding: 20px;
  background: white;
}
.time {
  margin-right: 0;
}
.betting-tables {
  margin-top: 10px;
}

.empty {
  height: 20px;
}
</style>
