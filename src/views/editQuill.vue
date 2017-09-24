<template>
  <p-layout>
    <div class="plugins-tips">
      Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。 访问地址：
      <a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
    </div>
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
  </p-layout>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
export default {
  data: function () {
    return {
      content: '<p>Hi girl</p>',
      editorOption: {
        // something config
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    submit() {
      console.log(this.content);
      this.$message.success('提交成功！');
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
}
</script>
<style lang="less">
 
</style>