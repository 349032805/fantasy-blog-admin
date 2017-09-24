<template>
  <p-layout>
    <div class="web-config">
      <el-form :model="webConfig" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="主站域名" prop="mainDomainName">
              <el-input v-model="webConfig.mainDomainName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="详情页域名" prop="detailDomainName">
              <el-input v-model="webConfig.detailDomainName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="管理系统域名" prop="adminDomainName">
              <el-input v-model="webConfig.adminDomainName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">创建/更新</el-button>
        </el-form-item>
      </el-form>

    </div>

  </p-layout>
</template>

 <script type="text/ecmascript-6">
import api from '../api/webConfig.js';
export default {
  data() {
    return {
      webConfig: {
        mainDomainName: '',
        detailDomainName: '',
        adminDomainName: ''
      },
      rules: {
        mainDomainName: [
          { required: true, message: '请输入主域名', trigger: 'blur' },
        ],
        detailDomainName: [
          { required: true, message: '请输入详情页域名', trigger: 'blur' },
        ],
        adminDomainName: [
          { required: true, message: '请输入管理系统域名', trigger: 'blur' },
        ]
      }
    }
  },
  created() {
    this._getData();
  },
  methods: {
    _getData() {
      api.getConfig().then((data) => {
        if (data && data != null) {
          this.webConfig = data;
        }

      });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!');
          api.addOrUpdateConfig(this.webConfig).then((data) => {
            if (data.success) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            }
            this._getData();
          });

        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },

  }
};
</script>

<style lang="less">
.web-config {
  padding-left: 50px;
  padding-top: 100px;
}
</style>
