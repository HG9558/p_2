<template>
  <div class="cardcont">
    <div class="card-title">
      <div class="empty"></div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="会员账号：">
          <el-input v-model="formInline.user" placeholder="请输入会员账号"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：">
          <el-input v-model="formInline.cardNum" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-managecont">
      <el-button type="primary" @click="addCard">新增银行卡</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="会员账号"></el-table-column>
        <el-table-column prop="name" label="开户人姓名"></el-table-column>
        <el-table-column prop="province" label="银行卡号"></el-table-column>
        <el-table-column prop="city" label="开户银行"></el-table-column>
        <el-table-column prop="address" label="开户地址"></el-table-column>
        <el-table-column prop="zip" label="填加时间"></el-table-column>
        <el-table-column :label="t('global.operating')">
          <template #default="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>

      <el-dialog title="新增银行卡" v-model="dialogTableVisible">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto">
          <el-form-item label="会员账号：" prop="date">
            <el-input v-model="formData.date" placeholder="请输入会员账号" clearable :style="{ width: '100%' }" :disabled="formInline.isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="开户人姓名：" prop="name">
            <el-input v-model="formData.name" placeholder="请输入开户人姓名" clearable :style="{ width: '100%' }" :disabled="formInline.isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号：" prop="province">
            <el-input v-model="formData.province" placeholder="请输入银行卡号" clearable :style="{ width: '100%' }"></el-input>
          </el-form-item>
          <el-form-item label="开户银行:" prop="city">
            <el-select v-model="formData.city" placeholder="请选择开户银行:" clearable :style="{ width: '100%' }">
              <el-option v-for="(item, index) in field104Options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户地址：" prop="adds">
            <el-cascader></el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="btn">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submitCardNum">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue';
import { ElForm } from 'element-plus';
// import CityInfos from '../../../src/assets/js/city.ts';

interface FormDatas {
  date?: string;
  name?: string;
  province?: number | null;
  city?: string;
  address?: string;
  zip?: string;
}
export default defineComponent({
  name: 'CardManages',

  setup() {
    const formInline = ref({
      user: '',
      cardNum: '',
      currentPage4: 4,
      isDisabled: false
    });
    const listTable = reactive({
      tableData: [
        {
          date: 'test123456',
          name: '李元芳',
          province: '6212 8888 8888 8888 888',
          city: '建设银行',
          address: '广东省 广州市',
          zip: '2021-3-31  18:00'
        },
        {
          date: 'test123456',
          name: '李元芳',
          province: '6212 8888 8888 8888 888',
          city: '建设银行',
          address: '广东省 广州市',
          zip: '2021-3-31  18:00'
        }
      ]
    });
    const formData = ref<FormDatas>({
      date: '',
      name: '',
      province: null,
      city: ''
    });
    const ruleDate = reactive({
      rules: {
        field101: [
          {
            required: true,
            message: '请输入会员账号',
            trigger: 'blur'
          }
        ],
        field102: [
          {
            required: true,
            message: '请输入开户人姓名',
            trigger: 'blur'
          }
        ],
        field103: [
          {
            required: true,
            message: '请输入银行卡号',
            trigger: 'blur'
          },
          {
            pattern: /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
            message: '请正确输入银行卡号！',
            trigger: 'blur'
          }
        ],
        field104: [
          {
            required: true,
            message: '请选择开户银行',
            trigger: 'change'
          }
        ]
      },
      dialogTableVisible: false
    });
    const ptions = reactive({
      field104Options: [
        {
          label: '招商银行',
          value: 1
        },
        {
          label: '中国银行',
          value: 2
        }
      ]
    });
    const elForms = ref<typeof ElForm | null>(null);

    const search = () => {
      const user = formInline.value.user;
      const cardNum = formInline.value.cardNum;
      console.log(user + '|' + cardNum);
    };
    const onReset = () => {
      formInline.value.user = '';
      formInline.value.cardNum = '';
    };
    const addCard = () => {
      formData.value.date = '';
      formData.value.name = '';
      formData.value.province = null;
      formData.value.city = '';
      ruleDate.dialogTableVisible = true;
    };

    function submitCardNum() {
      if (elForms.value) {
        elForms.value.validate((valid: boolean) => {
          if (valid) {
            console.log(formData.value.date + '|' + formData.value.name + '|' + formData.value.province + '|' + formData.value.city);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
    function edit(row: FormDatas) {
      formData.value = Object.assign({}, row);
      formInline.value.isDisabled = true;
      ruleDate.dialogTableVisible = true;
      console.log(row);
    }
    function handleSizeChange(val: number) {
      console.log(`每页 ${val} 条`);
    }
    function handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
    }
    const close = async () => {
      await nextTick(() => {
        if (elForms.value) {
          elForms.value.clearValidate();
        }
      });
      ruleDate.dialogTableVisible = false;
    };
    return {
      formInline,
      search,
      onReset,
      edit,
      formData,
      ...toRefs(listTable),
      ...toRefs(ruleDate),
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(ptions),
      addCard,
      close,
      submitCardNum
    };
  }
});
</script>

<style lang="scss" scoped>
.cardcont {
  .block {
    margin-top: 20px;
  }
}
.card-managecont {
  background: white;
  margin: 15px;
  padding: 20px 20px 20px 20px;
  .el-button--primary {
    margin-bottom: 20px;
  }
}
.btn {
  text-align: center !important;
}
.empty {
  height: 20px;
}
.card-title {
  background: white;
  margin: 15px;
  padding: 0 20px;
}
</style>
