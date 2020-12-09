<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  import request from '@/utils/request'

  export default {
    name: 'userlogin',
    data() {
      const validateUsername = (rule, value, callback) => {

        callback()

      }
      const validateCode = (rule, value, callback) => {
        if (this.code.value !== value) {
          this.loginForm.code = ''
          this.refreshCode()
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '123'
        },
        checked: false,
        code: {
          src: '',
          value: '',
          len: 4,
          type: 'text'
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '密码长度最少为3位', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validateCode }
          ]
        },
        passwordType: 'password'
      }
    },
    created() {
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: '<div style="white-space: pre">' +
          '<strong>登录实现了权限控制</strong>' +
          '<p><strong>不同用户只能访问权限允许的页面</strong></p><br/>' +
          '<p>管理员         账号：admin          密码：123</p>' +
          '<p>挂号员         账号：ghy               密码：123</p>' +
          '<p>门诊医生     账号：doctor           密码：123</p>' +
          '<p>检查员         账号：checker        密码：123</p>' +
          '<p>药房医师      账号：pharmacy     密码：123</p></div>',
        duration: 0
      })
    },
    mounted() {
    },
    computed: {},
    props: [],
    methods: {
      showPassword() {
        this.passwordType === ''
          ? (this.passwordType = 'password')
          : (this.passwordType = '')
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {

            //路由dispatch Login请求
            this.$store.dispatch('Login', this.loginForm).then(res => {
                this.$notify.closeAll()
                this.$message({
                  message: '验证成功!',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({ path: '/dashboard/dashboard' })
              }, error => {
                this.$message.error(error)
              }
            )

          }
        })
      },
      validateUserPassword(username, password) {

        if (password == '123') {
          return true
        } else {
          this.$message.error('账号密码错误')
          return false
        }
      }
    }
  }
</script>
<style>
</style>
