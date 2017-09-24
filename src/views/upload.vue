<template>
  <p-layout>
    <div class="plugins-tips">
      Element UI自带上传组件。 访问地址：
      <a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
    </div>
    
    <el-upload class="avatar-uploader" action="/api/uploadWebFile" 
    :show-file-list="false" :on-success="handleAvatarSuccess" 
    :before-upload="beforeAvatarUpload"
    :headers="auth">
      <img v-if="eleImgUrl" :src="eleImgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

  </p-layout>
</template>

<script>
import store from '../store'
export default {
  data: function () {
    return {
      eleImgUrl: '',
      auth:{token: store.state.token}
    }
  },
  methods: {
    // ele
    handleAvatarSuccess(res, file) {
        console.log(res);
        this.eleImgUrl = res.imageCompletePath;
    },
    beforeAvatarUpload(file) {

    }
  }
}
</script>

<style lang="less">
  // ele
.avatar-uploader {
  width: 800px;
  text-align: center;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}

</style>
