<template>
    <p-layout>
        <div class="table">
            <div class="handle-box">
                <el-select v-model="selectCate" placeholder="筛选分类" class="handle-select mr10">
                    <el-option key="0" label="全部" value="all"></el-option>
                    <el-option key="1" label="图片" value="picture"></el-option>
                    <el-option key="2" label="文档" value="document"></el-option>
                    <el-option key="3" label="压缩" value="zip"></el-option>
                    <el-option key="4" label="媒体" value="video"></el-option>
                    <el-option key="5" label="其他" value="unknow"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-upload class="create-btn" action="/api/uploadWebFile" :show-file-list="false" :on-success="handleAvatarSuccess" :headers="auth">
                    <span class="el-icon-upload"></span> 上传
                </el-upload>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="fileName" label="文件名" align="center" width="380"></el-table-column>
                <el-table-column prop="fileType" label="文件类型" align="center" width="100"></el-table-column>
                <el-table-column prop="filePath" label="文件路径" align="center" width="280" show-overflow-tooltip></el-table-column>
                <el-table-column prop="use" label="用途" align="center" show-overflow-tooltip></el-table-column>

                <el-table-column label="操作" width="200" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleView(scope.$index, scope.row)" v-if="scope.row.fileType=='picture'">查看</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <el-dialog title="编辑用途" :visible.sync="dialogEditUse">
            <el-form label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="用途/备注">
                            <el-input v-model="formUse"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditUse=false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="查看图片" :visible.sync="dialogViewImage">
             <img :src="completePath" class="dialog-view-img">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogViewImage=false">关闭</el-button>
            </div>
        </el-dialog>

    </p-layout>
</template>

<script>
import api from '../api/webFile.js';
import store from '../store';
export default {
    data() {
        return {
            tableData: [],
            selectCate: '',
            dialogVisible: false,
            totalCount: 0,
            currentPage: 0,
            param: {
                selectCate: '',
                currentPage: 1
            },
            optId: '',
            optFilePath: '',
            auth: { token: store.state.token },
            dialogEditUse: false,
            formUse: '',
            completePath: '',
            dialogViewImage: false
        }
    },
    created() {
        this._getData();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res);
            this._getData();
        },
        handleCurrentChange(val) {
            this.param.currentPage = val;
            this._getData();
        },
        search() {
            console.log(this.selectCate);
            if (this.selectCate == 'all') {
                this.param.selectCate = '';
            } else {
                this.param.selectCate = this.selectCate;
            }
            this._getData();
        },
        handleEdit(index, row) {
            this.optId = row.id;
            this.formUse = row.use;
            this.dialogEditUse = true;
        },
        handleDelete(index, row) {
            this.dialogVisible = true;
            this.optId = row.id;
            this.optFilePath = row.filePath;
        },
        handleView(index, row){
            this.completePath = row.completePath;
            this.dialogViewImage = true;
        },
        sureDelete() {
            api.deleteFile(this.optId, this.optFilePath).then((data) => {
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
            api.getFilesByParams(this.param).then((data) => {
                console.log(data);
                this.tableData = data.newFileList;
                this.totalCount = data.totalCount;
            });
        },
        handleSubmit() {
            if (this.formUse != "") {
                console.log('submit!');
                this._updateUse();
            } else {
                console.log('error submit!!')
                this.$message({
                    type: 'info',
                    message: '请填用途/备注'
                })
                return false;
            }
        },
        _updateUse() {
            api.updateUse(this.optId, this.formUse).then((data) => {
                console.log(data);
                this.dialogEditUse = false;
                this.$message({
                    type: 'success',
                    message: '编辑成功'
                })
                this._getData();
            });
        }
    }
}
</script>

<style lang="less">
.handle-box {
    margin-bottom: 20px;
    .handle-select {
        width: 140px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .create-btn {
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #4db3ff;
        border-radius: 4px;
        float: right;
        margin-right: 20px;
        font-size: 14px;

        .el-upload {
            width: 100%;
        }
    }
}

.dialog-view-img {
    width: auto;
    height: 200px;
    display: block;
    margin: 0 auto;
}
</style>