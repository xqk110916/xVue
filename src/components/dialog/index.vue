<template>
  <el-dialog
    custom-class="x-dialog"
    :show-close="false"
    :title="title"
    :visible.sync="visible"
    :width="width + 'px'"
    :before-close="beforeClose"
  >
    <div class="close" @click="beforeClose"> {{ closeText }} </div>
    <slot></slot>
    <slot name="footer">
      <div slot="footer" class="footer">
        <el-button size="small" @click="beforeClose">取 消</el-button>
        <el-button v-if="reset" size="small" type="primary" @click="handleReset">重 置</el-button>
        <el-button size="small" type="primary" @click="enter">确 定</el-button>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
  import btnList from '../btnList'
  export default {
    components: {
      btnList
    },
    props: {
      title: {
        type: String,
        default: '编辑'
      },
      width: {
        type: String | Number,
        default: 800
      },
      reset: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean
      },
      'before-close': {
        type: Function
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      closeText: {
        type: String,
        default: '关闭'
      }
    },
    data() {
      return {

      }
    },
    methods: {
      enter() {
        this.$emit("enter")
      },
      handleReset() {
        this.$emit("reset")
      },
    }
  }
</script>

<style lang="scss" scoped>
.x-dialog {
  position: relative;

  

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    // line-height: 24px;
    font-size: 12px;
    color: #409EFF;
    cursor: pointer;
  }
}
.footer {
  width: 100%;
  text-align: right;

  .el-button + .el-button {
    margin-left: 10px;
  }
}
</style>