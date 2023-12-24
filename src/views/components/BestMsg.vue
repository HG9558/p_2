<template>
  <div>
    <div class="best-msg">
      <p>会员信息</p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="num" label="会员账号" align="center"></el-table-column>
        <el-table-column prop="numstate" label="账号状态" align="center"></el-table-column>
        <el-table-column prop="lever" label="会员等级" align="center"></el-table-column>
        <el-table-column prop="svip" label="SVIP" align="center"></el-table-column>
        <el-table-column prop="isDl" label="是否代理" align="center"></el-table-column>
        <el-table-column prop="pre" label="上级代理" align="center"></el-table-column>
        <el-table-column prop="vipnum" label="会员标签" align="center"></el-table-column>
      </el-table>
      <div class="remark">
        <span>备注信息</span>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="添加时间：">
            <el-date-picker
              v-model="formInline.value2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
              @change="pickChange"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作人：">
            <el-input v-model="formInline.user" placeholder="请输入操作人账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
          <el-button type="primary" @click="handleClick">新增备注</el-button>
        </el-form>

        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="111" label="序号" align="center" width="80"></el-table-column>
          <el-table-column prop="222" label="备注内容" align="center"></el-table-column>
          <el-table-column prop="333" label="附件" align="center"></el-table-column>
          <el-table-column prop="444" label="操作人" align="center" width="80"></el-table-column>
          <el-table-column prop="555" label="操作时间" align="center" width="200"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="备注" v-model="dialogTableVisible" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto">
        <el-form-item label="备注内容：" prop="field101">
          <el-input
            v-model="formData.field101"
            type="textarea"
            placeholder="请填写备注信息，少于300字"
            :maxlength="300"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 15 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传" prop="field104">
          <el-upload ref="field104" :file-list="formInline.field104fileList" :action="formInline.field104Action" list-type="picture" accept="image/*">
            <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cacelUpload">取消</el-button>
        <el-button type="primary" @click="sureUpload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
export default defineComponent({
  name: 'BestMsg',
  setup() {
    const tableDatas = reactive({
      tableData: [
        {
          num: 'test123456',
          numstate: '启用',
          lever: 'VIP10',
          svip: 'SVIP0',
          isDl: '是',
          pre: 'KOK123456',
          vipnum: '套利会员 多账号  大额会员'
        }
      ]
    });
    const tableDatas2 = reactive({
      tableData2: [
        {
          111: '1',
          222: '备注该会员的状态，修改手机号，13400135000',
          333: 'VIP10',
          444: 'West',
          555: '2022-3-31 18:00'
        },
        {
          111: '2',
          222: '备注该会员的状态，修改手机号，13400135000',
          333: 'VIP10',
          444: 'West',
          555: '2022-3-31 18:00'
        },
        {
          111: '3',
          222: '备注该会员的状态，修改手机号，13400135000',
          333: 'VIP10',
          444: 'West',
          555: '2022-3-31 18:00'
        }
      ]
    });
    const dates = reactive({
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
    const formInline = ref({
      value2: '',
      user: '',
      field104Action: 'https://jsonplaceholder.typicode.com/posts/',
      field104fileList: [],
      startDate: '',
      endDate: ''
    });
    const isVisib = reactive({
      dialogTableVisible: false,
      inheritAttrs: false
    });
    const formDatas = reactive({
      formData: {
        field101: '',
        field104: null
      }
    });
    const rule1 = reactive({
      rules: {
        field101: [
          {
            required: true,
            message: '请填写备注信息，少于300字',
            trigger: 'blur'
          }
        ]
      }
    });
    // const pickerRef = ref<typeof ElForm | null>(null);
    function onSubmit() {
      console.log(formInline.value.user);
      console.log(formInline.value.startDate + '|' + formInline.value.endDate);
    }

    function pickChange() {
      const date1 = new Date(formInline.value.value2[0]);
      const date2 = new Date(formInline.value.value2[1]);
      formInline.value.startDate = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
      formInline.value.endDate = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
    }
    function handelConfirm() {
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
      //   this.close()
      // })
    }
    // function field104BeforeUpload(file: any) {
    //   const isRightSize = file.size / 1024 / 1024 < 5;
    //   if (!isRightSize) {
    //     //this.$message.error('文件大小超过 5MB')
    //   }
    //   const isAccept = new RegExp('image/*').test(file.type);
    //   if (!isAccept) {
    //     //this.$message.error('应该选择image/*类型的文件')
    //   }
    //   return isRightSize && isAccept;
    // }
    function handleClick() {
      isVisib.dialogTableVisible = true;
    }
    const cacelUpload = () => {
      isVisib.dialogTableVisible = false;
    };
    function sureUpload() {
      console.log('确认提交');
    }
    return {
      ...toRefs(tableDatas),
      ...toRefs(tableDatas2),
      ...toRefs(dates),
      ...toRefs(formDatas),
      ...toRefs(rule1),
      ...toRefs(isVisib),
      handleClick,
      formInline,
      cacelUpload,
      sureUpload,
      onSubmit,
      pickChange
    };
  }
});
</script>
<style lang="scss" scoped>
.best-msg {
  background: white;
  margin: 15px;
  padding: 0 20px 20px 20px;
  > p {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep(.el-table th) {
    background: #f7f7f7 !important;
    text-align: center;
    color: black;
    font-weight: normal;
    font-size: 16px;
  }
  .remark {
    margin-top: 30px;
    > span:nth-of-type(1) {
      float: left;
      margin-right: 30px;
      font-size: 18px;
      line-height: 38px;
      font-weight: bold;
    }
    font-size: 18px;
  }
  .el-button--primary {
    float: right;
  }
}
</style>
