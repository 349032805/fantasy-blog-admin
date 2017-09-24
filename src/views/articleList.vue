<template>
    <p-layout>
        <div class="table">
            <div class="handle-box">
                <el-select v-model="selectCate" placeholder="筛选分类" class="handle-select mr10">
                    <el-option key="0" label="全部" value="all"></el-option>
                    <el-option key="1" label="vuejs" value="vuejs"></el-option>
                    <el-option key="2" label="angularjs" value="angularjs"></el-option>
                    <el-option key="3" label="nodejs" value="nodejs"></el-option>
                    <el-option key="4" label="css3" value="css3"></el-option>
                    <el-option key="5" label="java" value="java"></el-option>
                    <el-option key="6" label="网站" value="web"></el-option>
                    <el-option key="7" label="生活" value="life"></el-option>
                </el-select>
                <el-input v-model="keyword" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <!-- <el-select v-model="select_year" placeholder="筛选年份" class="handle-select mr10">
                        <el-option key="0" label="2017" value="2017"></el-option>
                        <el-option key="1" label="2018" value="2018"></el-option>
                        <el-option key="2" label="2019" value="2019"></el-option>
                        <el-option key="3" label="2020" value="2020"></el-option>
                        <el-option key="4" label="2021" value="2021"></el-option>
                    </el-select> -->

                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="edit" @click="addArticle" class="create-btn">创建文章</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="belong" label="分类" align="center" width="120"></el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="140" :formatter="statusFormat"></el-table-column>
                <!-- <el-table-column prop="createTime" label="创建时间" align="center" width="220" :formatter="dateFormat"></el-table-column> -->
                <el-table-column prop="updateTime" label="修改时间" align="center" width="220" :formatter="dateFormat"></el-table-column>
                <el-table-column label="操作" width="350" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" @click="handleUp(scope.$index, scope.row)">
                            <span v-show="scope.row.isUp==0">置顶</span>
                            <span v-show="scope.row.isUp==1">正常</span>
                        </el-button>
                        <el-button size="small" @click="handleHide(scope.$index, scope.row)">
                            <span v-show="scope.row.isHide==0">隐藏</span>
                            <span v-show="scope.row.isHide==1">显示</span>
                        </el-button>
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

    </p-layout>
</template>

<script>
import api from '../api/article.js';
import { formatDate } from '../utils/date.js';
export default {
    data() {
        return {
            tableData: [],
            selectCate: '',
            // select_year: '',
            keyword: '',
            dialogVisible: false,
            totalCount: 0,
            currentPage: 0,
            param: {
                selectCate: '',
                keyword: '',
                currentPage: 1
            },
            optId: ''

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
        search() {
            console.log(this.selectCate);
            console.log(this.keyword);
            if (this.selectCate == 'all') {
                this.param.selectCate = '';
            } else {
                this.param.selectCate = this.selectCate;
            }

            this.param.keyword = this.keyword;
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
        statusFormat(row, column) {
            let isUp = row.isUp;
            let isHide = row.isHide;

            if (isUp == 0 && isHide == 0) {
                return "正常";
            }

            if (isUp == 1 && isHide == 1) {
                return "置顶 隐藏";
            }
            if (isUp == 1) {
                return "置顶";
            }
            if (isHide == 1) {
                return "隐藏";
            }
        },
        handleEdit(index, row) {
            let id = row.id;
            this.$router.push({ path: 'addArticle', query: { id: id } });
        },
        handleDelete(index, row) {
            this.dialogVisible = true;
            this.optId = row.id;
        },
        sureDelete() {
            api.deleteArticle(this.optId).then((data) => {
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
        addArticle() {
            this.$router.push({ name: 'addArticle' });
        },
        _getData() {
            api.getArticlesByParams(this.param).then((data) => {
                console.log(data);
                this.tableData = data.articleList;
                this.totalCount = data.totalCount;
            });
        },
        handleUp(index, row) {
            let id = row.id;
            let isUp = row.isUp;
            if (isUp == 0) {
                isUp = 1;
            } else {
                isUp = 0;
            }
            api.setArticleUp(id, isUp).then((data) => {
                this.$message({
                    type: 'success',
                    message: '设置成功'
                })
                this._getData();
            });
        },
        handleHide(index, row) {
            let id = row.id;
            let isHide = row.isHide;
            if (isHide == 0) {
                isHide = 1;
            } else {
                isHide = 0;
            }
            api.setArticleHide(id, isHide).then((data) => {
                this.$message({
                    type: 'success',
                    message: '设置成功'
                })
                this._getData();
            });

        },
        handleView(index, row) {
            let id = row.id;
            this.$router.push({ path: 'viewArticle', query: { id: id } });
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
        float: right;
        margin-right: 20px;
    }
}
</style>