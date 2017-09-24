<template>
  <p-layout>
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题">{{article.title}}</el-form-item>

      <el-form-item label="分类">{{article.belong}}</el-form-item>

      <el-form-item label="内容">{{article.content}}</el-form-item>

      <el-row>
        <el-col :span="14">
          <el-form-item label="自评">{{article.evaluate}}</el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

  </p-layout>
</template>

<script>
  import api from '../api/article.js';
  export default {
    data () {
      return {
        article: {}
      }
    },
    created(){
        this._getDetail();
    },
    methods: {
      _getDetail(){
        let id = this.$route.query.id;
        api.getArticleDetail(id).then((data) => {
          this.article = data;
        });
      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
