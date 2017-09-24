<template>
  <p-layout>
    <div class="belong">
      <div class="cate">
        <ul>
          <li @click="changeTheme('all')" style="border:1px dashed #666;color:#666">全部</li>
          <li @click="changeTheme('vuejs')" style="background:red">vuejs</li>
          <li @click="changeTheme('angularjs')" style="background:orange">angularjs</li>
          <li @click="changeTheme('nodejs')" style="background:yellow;color:#666">nodejs</li>
          <li @click="changeTheme('css3')" style="background:green">css3</li>
          <li @click="changeTheme('java')" style="background:cyan">java</li>
          <li @click="changeTheme('web')" style="background:#20A0FF">网站</li>
          <li @click="changeTheme('life')" style="background:purple">生活</li>
        </ul>
      </div>

      <div class="describe">
        <div class="theme">{{cate}}</div>
        <!-- <el-input type="textarea" v-model="describe" :rows="4"></el-input> -->
        <quill-editor ref="myTextEditor" v-model="describe"></quill-editor>
        <div class="opt-block">
          <el-button type="primary" @click="addOrEditDescribe">添加/修改</el-button>
        </div>
      </div>

    </div>
  </p-layout>
</template>

<script>
import api from '../api/belong.js';
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      cate: 'all',
      describe: ''
    }
  },
  created() {
    this._getData();
  },
  computed: {
  },
  methods: {
    addOrEditDescribe() {
      let belong = {};
      belong.belong = this.cate;
      belong.describe = this.describe;
      console.log(belong);
      if (this.describe == "") {
        this.$message({
          type: 'info',
          message: '填写描述!'
        });
        return;
      }
      api.addOrUpdateBelong(belong).then((data) => {
        console.log(data);
        if (data.success) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
        this._getData();
      });
    },
    changeTheme(cate) {
      this.cate = cate;
      this.describe = "";
      this._getData();
    },
    _getData() {
      api.getBelong(this.cate).then((data) => {
        if (data && data != null) {
          this.describe = data.describe;
        }

      });
    }
  }
}
</script>

<style lang="less">
.belong {
  padding: 30px;
  .cate {
    float: left;
    width: 20%;
    ul {
      li {
        width: 140px;
        height: 42px;
        line-height: 42px;
        border-radius: 4px;
        margin-bottom: 30px; //  background: #13CE66;
        color: #fff;
        text-align: center;
        cursor: pointer
      }
    }
  }
  .describe {
    float: left;
    width: 70%;

    .theme {
      text-align: center;
      font-size: 20px;
      margin-bottom: 30px;
    }

    .opt-block {
      text-align: center;
      margin-top: 20px;
      button {
        width: 120px;
      }
    }
  }
}
</style>