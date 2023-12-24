
<template>
  <div class="add-bg">编辑 {{ props.row }}
    <el-form :model="formData" ref="formRef" :rules="rules" label-width="80px" :inline="false" size="medium">
      <el-form-item label="State" prop="state">
        <el-input v-model="formData.state"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElSelect } from 'element-plus'
import { ref } from 'vue';
import { useDialog } from '@/hooks/useDialog'
const props = defineProps<{
  row: any,
  getList: any
}>();
const { closeDialog } = useDialog();

const formRef = ref<typeof ElForm | null>(null)
const formData = ref({
  ...props.row
})
const rules = ref({
  state: [
    { required: true, message: '请输入State', trigger: 'blur' }
  ]
})

const onSubmit = () => {
  formRef.value?.validate((valid: any) => {
    if (valid) {
      console.log(formData.value)
      // props.getList()
      // closeDialog()
    }
  })
}
</script>

<style lang="scss" scoped>
.add-bg {
  background-color: white;
  padding: 20px;
  width: 500px;
}
</style>
  