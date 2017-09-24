<template>
  <p-layout>
    <div class="table">
      <div class="handle-box">
        <el-button type="primary" icon="edit" @click="addLink" class="create-btn">添加友链</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="sign" label="标志" align="center" width="120"></el-table-column>
        <el-table-column prop="link" label="链接" align="center" width="400"></el-table-column>
        <el-table-column prop="intro" label="介绍" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除模态框 -->
    <el-dialog title="确认" :visible.sync="dialogVisible" size="tiny">
      <span>确定要删除该记录?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加友链" :visible.sync="dialogFormVisible">
      <el-form :model="friendLink" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="标识" prop="sign">
              <el-input v-model="friendLink.sign"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="18">
            <el-form-item label="链接" prop="link">
              <el-input v-model="friendLink.link"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="介绍" prop="intro">
              <el-input v-model="friendLink.intro"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </p-layout>
</template>

<script>
import api from '../api/friendLink.js';
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      optId: '',
      dialogFormVisible: false,
      friendLink: {
        sign: '',
        link: '',
        intro: ''
      },
      rules: {
        sign: [
          { required: true, message: '填标识', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '填链接', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this._getData();
  },
  methods: {
    handleEdit(index, row) {
      this.friendLink = row;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.optId = row.id;
    },
    sureDelete() {
      api.deleteLink(this.optId).then((data) => {
        if (data.success) {
          this.dialogVisible = false;
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this._getData();
        }
      });
    },
    addLink() {
      this.dialogFormVisible = true;
    },
    _getData() {
      api.getAllFriendLinks().then((data) => {
        this.tableData = data;
      });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('submit!');
          if (this.friendLink.id) {
            this._gotoUpdate();
          } else {
            this._gotoAdd();
          }

        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    _gotoAdd() {
      api.addLink(this.friendLink).then((data) => {
        if (data.success) {
          this.$refs.ruleForm.resetFields()
          this.dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this._getData();
        }
      });
    },
    _gotoUpdate() {
      api.updateLink(this.friendLink).then((data) => {
        if (data.success) {
          this.$refs.ruleForm.resetFields()
          this.dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this._getData();
        }
      });
    },
    cancelForm() {
      this.dialogFormVisible = false;
      this.friendLink = {};
      this._getData();
    }
  }
}
</script>

<style lang="less">
.handle-box {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  .create-btn {
    float: right;
    margin-right: 20px;
  }
}
</style>