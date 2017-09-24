<template>
    <p-layout>
        <div class="table">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delSome">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选专辑" class="handle-select mr10">
                    <el-option key="1" label="七里香" value="七里香"></el-option>
                    <el-option key="2" label="十一月的肖邦" value="十一月的肖邦"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="date" label="发行日期" sortable align="center"></el-table-column>
                <el-table-column prop="name" label="歌名" header-align="center"></el-table-column>
                <el-table-column prop="belong" label="所属专辑" header-align="center"></el-table-column>
                <el-table-column prop="singer" label="star" header-align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="80">
                </el-pagination>
            </div>
        </div>

        <!-- 删除模态框 -->
        <el-dialog title="确认" :visible.sync="dialogVisible" size="tiny">
            <span>确定要删除该记录?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="活动名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </p-layout>
</template>

<script>
import songs from '../../static/songs';
export default {
    data() {
        return {
            tableData: songs.songArr,
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            del_list: [],
            is_search: false,
            dialogVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: ''
            },
            formLabelWidth: '120px'
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        search() {
            this.is_search = true;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.dialogFormVisible = true;
        },
        handleDelete(index, row) {
            this.dialogVisible = true;
        },
        delSome() {
            const self = this,
                length = self.multipleSelection.length;
            let str = '';
            self.del_list = self.del_list.concat(self.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += self.multipleSelection[i].name + ' ';
            }
            self.$message.error('删除了' + str);
            self.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
}
</style>