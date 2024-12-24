<template>
  <el-dialog title="登录" :close-on-click-modal="false" width="30%" center>
    <el-form :model="loginForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { doLogin } from '@/api/request';
const loginForm = ref({
  username: '',
  password: ''
});


const emit = defineEmits(['update:dialogLoginVisible','update:currentUser'])
const handleLogin = () => {
  if (loginForm.value.username && loginForm.value.password) {
    doLogin(loginForm.value).then((res) => {
      let satoken = {
        tokenName: res.data.tokenName,
        tokenValue: res.data.tokenValue
      }
      sessionStorage.setItem('qihuis-world-token', JSON.stringify(satoken));
      emit('update:currentUser', res.username)
    });
    ElMessage.success('登录成功');
    emit('update:dialogLoginVisible', false)
  } else {
    ElMessage.error('请输入用户名和密码');
  }
};
function close() {
    emit('update:dialogLoginVisible', false)
}

</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>