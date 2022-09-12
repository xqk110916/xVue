<template>
  <el-dialog
    custom-class="x-dialog"
    :show-close="false"
    title="dialog"
    :visible.sync="visible"
    width="800px"
    :before-close="beforeClose"
  >
    <div class="close" @click="beforeClose"> {{ closeText }} </div>
    <slot></slot>
    <div slot="footer" class="footer">
      <el-button size="small" @click="beforeClose">取 消</el-button>
      <el-button v-if="isReset" size="small" type="primary" @click="enter">重 置</el-button>
      <el-button size="small" type="primary" @click="enter">确 定</el-button>
    </div>
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
        type: String
      },
      isReset: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean
      },
      'before-close': {
        type: Function
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
        
      },
      reset() {
        
      },
    }
  }
</script>

<style lang="scss" scoped>
.x-dialog {
  position: relative;

  .el-dialog__title {
    font-size: 14px;
  }

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