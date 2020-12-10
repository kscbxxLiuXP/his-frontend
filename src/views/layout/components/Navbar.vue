<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <div class="hello right-menu-item">
        <el-tag type="success">{{ nowuser.usertype }}</el-tag>
      </div>
      <div class="hello right-menu-item" style="font-size: 14px">
        <span style="margin-top: 10px">你好，{{ name }}</span>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover">
        <div class="avatar-wrapper">

          <img class="user-avatar" src="@/assets/images/头像.jpg">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'

export default {
  name: 'navBar',
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'nowuser'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.navbar .hamburger-container {
  line-height: 58px;
  height: 50px;
  float: left;
  padding: 0 10px;
}

.navbar .breadcrumb-container {
  float: left;
}

.navbar .hello {
  font-size: 12px;
}

.navbar .errLog-container {
  display: inline-block;
  vertical-align: top;
}

.navbar .right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
}

.navbar .right-menu:focus {
  outline: none;
}

.navbar .right-menu .right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}

.navbar .right-menu .right-menu-item.hover-effect {
  cursor: pointer;
  transition: background 0.3s;
}

.navbar .right-menu .right-menu-item.hover-effect:hover {
  background: rgba(0, 0, 0, 0.025);
}

.navbar .right-menu .screenfull {
  height: 20px;
}

.navbar .right-menu .international {
  vertical-align: top;
}

.navbar .right-menu .theme-switch {
  vertical-align: 15px;
}

.navbar .right-menu .avatar-container {
  margin-right: 30px;
}

.navbar .right-menu .avatar-container .avatar-wrapper {
  cursor: pointer;
  position: relative;
}

.navbar .right-menu .avatar-container .avatar-wrapper .user-avatar {
  /*padding-top: 5px;*/
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.navbar .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}


</style>
