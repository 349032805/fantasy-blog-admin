<template>
  <p-layout>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="content" label="内容" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="220" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template scope="scope">
            <el-button size="small" @click="handleView(scope.$index, scope.row)">查看/回复</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalCount" :page-size="15">
        </el-pagination>
      </div>
    </div>

    <!-- 删除模态框 -->
    <el-dialog title="确认" :visible.sync="dialogVisible" size="tiny">
      <span>确定要删除该记录?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="留言详细" :visible.sync="dialogViewVisible">
      <el-row>
        <el-col>{{content}}</el-col>
      </el-row>
      <p class="response">回复</p>
      <el-row>
        <el-col>
          <el-input type="textarea" v-model="response" :rows="4"></el-input>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogViewVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </p-layout>
</template>

<script>
import api from '../api/message.js';
import { formatDate } from '../utils/date.js';
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      totalCount: 0,
      currentPage: 0,
      param: {
        currentPage: 1
      },
      optId: '',
      dialogViewVisible: false,
      content: '',
      response: ''
    }
  },
  created() {
    this._getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.param.currentPage = val;
      this._getData();
    },
    dateFormat(row, column) {
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }
      date = new Date(date);
      let format = "yyyy-MM-dd hh:mm:ss";
      return formatDate(date, format);
    },
    handleDelete(index, row) {
      this.dialogVisible = true;
      this.optId = row.id;
    },
    sureDelete() {
      api.deleteMessage(this.optId).then((data) => {
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
    _getData() {
      api.getMessagesByParams(this.param).then((data) => {
        console.log(data);
        this.tableData = data.messageList;
        this.totalCount = data.totalCount;
      });
    },
    handleView(index, row) {
      let id = row.id;
      this.optId = id;
      this.dialogViewVisible = true;
      this.content = row.content;
      this.response = row.response;
    },
    handleSubmit() {
      if (!this.response) {
        this.$message({
          type: 'info',
          message: '请填写回复'
        })
        return;
      } else {
        api.responseMessage(this.optId,this.response).then((data) => {
          if (data.success) {
            this.dialogViewVisible = false;
            this.$message({
              type: 'success',
              message: '回复成功'
            })
            this._getData();
          }
        });
      }
    }
  }
}
</script>

<style lang="less">
.response {
  margin: 20px 0 10px;
}
</style>