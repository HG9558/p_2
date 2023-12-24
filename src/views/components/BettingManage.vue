<template>
  <div>
    <div class="betting-cont">
      <div class="betting-title">
        <el-menu :default-active="actives.activeIndex" class="el-menu-demo" active-text-color="#409eff" mode="horizontal">
          <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>
      </div>
      <div class="betting-table">
        <el-form :inline="true" ref="ruleForm" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号:">
            <el-input v-model="formInline.orderNum" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="会员账号:">
            <el-input v-model="formInline.userNum" placeholder="请输入会员账号"></el-input>
          </el-form-item>
          <el-form-item label="申请人:">
            <el-input v-model="formInline.snum" placeholder="请输入申请人账号"></el-input>
          </el-form-item>
          <el-form-item label="审核人:">
            <el-input v-model="formInline.suser" placeholder="请输入审核人"></el-input>
          </el-form-item>
          <el-form-item label="调整类型">
            <el-select v-model="formInline.tzType" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="系统调整" value="beijing"></el-option>
              <el-option label="输赢调整" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整方式">
            <el-select v-model="formInline.tzMethod" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="上分" value="beijing"></el-option>
              <el-option label="下分" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整钱包">
            <el-select v-model="formInline.tzBag" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="中心钱包" value="beijing"></el-option>
              <el-option label="各场馆钱包" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.allStatus" placeholder="选择">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="成功" value="beijing"></el-option>
              <el-option label="拒绝" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间" class="time">
            <el-select v-model="formInline.sTime" placeholder="选择">
              <el-option label="申请时间" value="shanghai"></el-option>
              <el-option label="完成时间" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <div class="block">
              <el-date-picker
                v-model="formInline.value2"
                type="datetimerange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :shortcuts="shortcuts"
                @change="pickChange"
              ></el-date-picker>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="select">筛选</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button icon="el-icon-download">导出Csv</el-button>
          </el-form-item>
        </el-form>
        <div class="betting-tables">
          <el-table :data="tableData" border style="width: 100%" show-summary>
            <el-table-column fixed prop="col1" label="订单号" width="200"></el-table-column>
            <el-table-column prop="col2" label="会员账号" align="center"></el-table-column>
            <el-table-column prop="col3" label="调整类型" align="center"></el-table-column>
            <el-table-column prop="col4" label="调整方式" align="center"></el-table-column>
            <el-table-column prop="col5" label="调整钱包" align="center"></el-table-column>
            <el-table-column prop="col6" label="流水倍数(倍)" sortable align="center"></el-table-column>
            <el-table-column prop="col7" label="调整金额" sortable align="center" :class-name="colors.isColor"></el-table-column>
            <el-table-column prop="col8" label="申请人" align="center"></el-table-column>
            <el-table-column prop="col9" label="申请时间" align="center" width="150"></el-table-column>
            <el-table-column prop="col10" label="完成时间" align="center" width="150"></el-table-column>
            <el-table-column prop="col11" label="审核人" align="center"></el-table-column>
            <el-table-column prop="col12" label="审核备注" align="center"></el-table-column>
            <el-table-column prop="col13" label="状态" align="center" :class-name="colors.isStutas"></el-table-column>
          </el-table>
          <p class="empty"></p>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
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
      orderNum: '',
      userNum: '',
      snum: '',
      suser: '',
      tzType: '',
      tzMethod: '',
      tzBag: '',
      allStatus: '',
      sTime: '',
      value2: ''
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
          col1: 'GM13416794653164613',
          col2: 'wsfs785',
          col3: '输赢调整',
          col4: '会员下分',
          col5: '中心钱包',
          col6: 0,
          col7: '-545,125.00',
          col8: 'lily',
          col9: '2021-09-23 14:45:12',
          col10: '2021-09-27 22:45:12',
          col11: 'tony',
          col12: '审核备注内容',
          col13: '成功'
        },
        {
          col1: 'FSF134167878878613',
          col2: 'aaaa1233',
          col3: '系统调整',
          col4: '会员上分',
          col5: '场馆钱包',
          col6: 5,
          col7: '-5212.00',
          col8: 'lily',
          col9: '2021-09-23 14:45:12',
          col10: '2021-09-27 22:45:12',
          col11: 'tony',
          col12: '审核备注内容',
          col13: '拒绝'
        }
      ]
    });
    const colors = ref({
      isColor: '#67C23A',
      isStutas: '#F56C6C'
    });
    function pickChange() {
      const date1 = new Date(formInline.value.value2[0]);
    }
    function select() {
      console.log(formInline.value);
    }
    const ruleForm = ref<typeof ElForm | null>(null);
    const reset = () => {
      formInline.value = {
        orderNum: '',
        userNum: '',
        snum: '',
        suser: '',
        tzType: '',
        tzMethod: '',
        tzBag: '',
        allStatus: '',
        sTime: '',
        value2: ''
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
:v-deep .green {
  color: #3fb107;
}

:v-deep .el-table th > .cell {
  color: gray;
}
.empty {
  height: 20px;
}
</style>
