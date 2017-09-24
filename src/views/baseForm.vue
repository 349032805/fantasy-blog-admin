<template>
  <p-layout>
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
          <el-input v-model="form.name" placeholder="fuck"></el-input>
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="form.role" placeholder="请选择">
            <el-option key="fighter" label="战士" value="fighter"></el-option>
            <el-option key="master" label="法师" value="master"></el-option>
            <el-option key="assassin" label="刺客" value="assassin"></el-option>
            <el-option key="tank" label="坦克" value="tank"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="选择开关">
          <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="多选框">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="法师" name="type"></el-checkbox>
            <el-checkbox label="刺客" name="type"></el-checkbox>
            <el-checkbox label="坦克" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="form.resource">
            <el-radio label="法师"></el-radio>
            <el-radio label="刺客"></el-radio>
            <el-radio label="坦克"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </p-layout>
</template>

<script>
export default {
  data: function () {
    return {
      form: {
        name: '',
        role: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['法师'],
        resource: '坦克',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    }
  }
}
</script>
<style lang="less">
	.form-box {
    padding-left: 50px;
    padding-top: 30px;
    width: 600px;
  }
</style>
