<template>
  <p-layout>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="分类" prop="belong">
        <el-select v-model="ruleForm.belong" placeholder="请选择文章分类">
          <el-option label="vuejs" value="vuejs"></el-option>
          <el-option label="angularjs" value="angularjs"></el-option>
          <el-option label="nodejs" value="nodejs"></el-option>
          <el-option label="css3" value="css3"></el-option>
          <el-option label="java" value="java"></el-option>
          <el-option label="网站" value="web"></el-option>
          <el-option label="生活" value="life"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <!-- <el-input v-model="ruleForm.content"></el-input> -->
        <quill-editor ref="myTextEditor" v-model="ruleForm.content"></quill-editor>
      </el-form-item>

      <el-row>
        <el-col :span="14">
          <el-form-item label="自评" prop="evaluate">
            <el-input type="textarea" v-model="ruleForm.evaluate" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">创建/修改</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

  </p-layout>
</template>

<script>
import api from '../api/article.js';
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      id: '',
      ruleForm: {
        title: '',
        belong: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        belong: [
          { required: true, message: '请选择所属分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this._getDetail();
    }
  },
  methods: {
    _getDetail() {
      api.getArticleDetail(this.id).then((data) => {
        console.log(data);
        this.ruleForm = data;
      });
    },
    handleReset() {
      this.$refs.ruleForm.resetFields()
    },
    handleSubmit(ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!')
          if (this.id) {
            this._updateArticle();
          } else {
            this._addArticle();
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _addArticle() {
      api.addArticle(this.ruleForm).then((data) => {
        console.log(data);
        if (data.success) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.push({ name: 'article' });
        } else {
          this.$message({
            type: 'info',
            message: '添加失败'
          });
        }
      });
    },
    _updateArticle() {
      api.updateArticle(this.ruleForm).then((data) => {
        console.log(data);
        if (data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ name: 'article' });
        } else {
          this.$message({
            type: 'info',
            message: '修改失败'
          });
        }
      });
    }
  }
}
</script>
