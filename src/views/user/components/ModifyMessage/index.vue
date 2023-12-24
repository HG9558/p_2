<template>
  <div>
    <el-button type="text" @click="openInfoModify">打开弹框</el-button>
    <el-dialog v-bind="$attrs" v-on="$listeners" title="个人资料" v-model="dialogTableVisible" :close-on-click-modal="false">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="auto">
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="formData.name" :disabled="true" :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" :disabled="true" :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="rolename">
          <el-input v-model="formData.rolename" :disabled="true" :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" prop="password">
          <el-input v-model="formData.password" placeholder="不填则不修改密码" clearable show-password :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="操作授权码:" prop="psw">
          <el-input v-model="formData.psw" placeholder="不填则不修改密码操作授权码:" clearable show-password :style="{ width: '100%' }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close(elForm)">取消</el-button>
        <el-button type="primary" @click="handelConfirm(elForm)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'InfoModify',
  inheritAttrs: false,

  setup() {
    const isVisib = reactive({
      dialogTableVisible: false
    });
    const formData = reactive({
      name: undefined,
      email: undefined,
      rolename: undefined,
      password: undefined,
      psw: undefined
    });
    const ruleFomes = reactive({
      rules: {
        name: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        rolename: [],
        password: [
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: '密码为6-20位字母和数字组合',
            trigger: 'blur'
          }
        ],
        psw: []
      }
    });
    const elForm = ref(null);
    function handelConfirm(formName: any) {
      formName.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    const openInfoModify = () => {
      isVisib.dialogTableVisible = true;
    };
    const close = (closeName: any) => {
      closeName.resetFields();
      isVisib.dialogTableVisible = false;
    };
    return {
      ...toRefs(ruleFomes),
      ...toRefs(isVisib),
      formData,
      handelConfirm,
      openInfoModify,
      elForm,
      close
    };
  }
});
</script>

<style scoped lang="scss"></style>
