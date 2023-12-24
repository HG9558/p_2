<template>
  <el-button @click="appendss">Add</el-button>
  <el-button @click="xiugai">修改总计数据</el-button>
  <el-table class="tablecalccontent" ref="table" :data="tableData" border style="width: 100%">
    <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
    <el-table-column prop="a" label="会员账号" align="center"></el-table-column>
    <el-table-column prop="b" label="签到时间" align="center" width="150">
      <template #default="scope">
        {{ $filters.format(scope.row.b, false) }}
      </template>
    </el-table-column>
    <el-table-column prop="c" label="是否补签" align="center">
      <template #default="scope">
        <span class="green" v-if="scope.row.c == '1'">是</span>
        <span class="red" v-if="scope.row.c == '2'">否</span>
      </template>
    </el-table-column>
    <el-table-column prop="d" label="当日存款金额" align="center" sortable></el-table-column>
    <el-table-column prop="e" label="当日有效投注" align="center" sortable> </el-table-column>
    <el-table-column prop="f" label="设备号" align="center" width="250"> </el-table-column>
  </el-table>
  <div class="el_table_footer_wrapper"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTableCalc } from './table';

export default defineComponent({
  name: 'TableCalc',
  components: {},
  props: {
    align: {
      type: String,
      default: 'center'
    }
  },
  setup(props) {
    const tableData = ref([
      {
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '1',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      },
      {
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '2',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      },
      {
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '2',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      },
      {
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '2',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      },
      {
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '2',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      }
    ]);

    function appendss() {
      tableData.value.push({
        a: 'test1234345',
        b: '2121-12-12 12:12:12',
        c: '1.2',
        d: '123.00',
        e: '11.23',
        f: 'FASDFASDF-2134SDFSSFD'
      });
    }
    const zongji = ref({
      c: 100,
      d: 200
    });
    function xiugai() {
      zongji.value.c = 200;
      zongji.value.d = 500;
      console.log(zongji.value);
    }
    useTableCalc(tableData, ['e'], zongji);
    return {
      tableData,
      appendss,
      xiugai
      // sum_xiaoji,
      // sum_heji,
      // table,
      // getXiaoji
    };
  }
});
</script>
<style lang="scss">
.clacstyle td {
  background-color: #f5f7fa;
}
</style>
