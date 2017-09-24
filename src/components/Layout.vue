<template>
  <div class="p-layout">
      <!-- 左边导航 -->
      <div class="p-layout-sider">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in menus">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i> {{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                          <i :class="subItem.icon"></i> {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i> {{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu> 
      </div>

      <!-- 右边内容 -->
      <div class="p-layout-panel">
        <div class="p-layout-breadcrumb">
           <el-breadcrumb separator="/" class="float-left" style="line-height: inherit">
            <el-breadcrumb-item :to="{ path: '/index' }" v-if="!$menuArr || $menuArr.length==0"><span class="first-page">首页</span></el-breadcrumb-item>
            <el-breadcrumb-item v-for="nav in $menuArr" :key="nav.index">{{nav}}</el-breadcrumb-item>
          </el-breadcrumb> 

          <div class="p-layout-head">
            <el-dropdown class="is-user" @command="handleDropdown">
              <img src="../images/leaf.jpg" class="p-layout-avatar"> 
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="nickname">fantasy</span>
          </div> 
        </div>

          <div class="p-layout-container">
            <slot></slot>
          </div>
      </div>
  </div>
</template>
<script>
import menus from '../nav-config'

export default {
  name: 'p-layout',

  data () {
    return {
      menus,
      currentRoute: this.$router.history.current.fullPath
    }
  },
  created () {
   
  },
  computed:{
    onRoutes(){
        return this.$route.path.replace('/','');
    }
  },
  methods: {
    handleDropdown (cmd) {
      if (cmd === 'logout') {
        this.$router.replace({ name: 'login' })
      }
    },
     handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
  }
}
</script>

<style lang="less">
.p-layout {
  height: 100%;
  width: 100%;

  .p-layout-sider {
    background-color: rgb(50, 64, 87);
    min-height: 100%;
    width: 14%;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
  }

  .p-layout-panel {
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    padding-left: 14%;

    .p-layout-breadcrumb {
      height: 60px;
      line-height: 60px;
      background-color: #eff2f7;
      padding-left: 20px;
      padding-right: 30px;

      .first-page{
        color:#48576a;
      }

      .p-layout-head {
        float: right;
        .p-layout-avatar {
          width: 36px;
          height: 36px;
          border: 2px solid #d3dce6;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
        }
        .nickname {
          margin-left:5px;
          color: #666;
        }
      }
    }
  }
  .p-layout-container {
    padding: 15px 20px;
  }
}
</style>
