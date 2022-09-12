<template>
  <div :class="[ inner ? 'inner' : 'list' ]">
    <el-button 
      v-for="(item, index) in showOption"
      :key="index"
      :type="inner ? 'text' : item.type"
      :size="size"
      :class="{ [item.type]: inner }"
      :disabled="item.disabled ? item.disabled(row) : false"
      @click="item.handle(row)"
    > {{ item.label }} </el-button>
    
    <el-dropdown v-if="showDropdown" @command="handleCommand">
      <span class="primary ml"> ... </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(list, index) in shrinkOption"
          :key="index"
          :command="list"
          :class="[ list.type ]"
          :disabled="list.disabled ? list.disabled(row) : false"
        > {{ list.label }} </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'btnlist',
    props: {
      option: {
        type: Array,
        dafault: () => {
          let data = {
            label: '',
            handle: (row) => {},
          }
          return []
        }
      },
      row: {
        type: Object,
        dafault: () => {}
      },
      max: {
        type: Number,
        default: 3
      },
      // inner为true代表table中的text
      inner: {
        type: Boolean,
        dafault: false
      },
      size: {
        type: String,
        default: 'small'
      }
    },
    computed: {
      // 在inner模式下, 超出最大值的隐藏, 显示省略号
      showDropdown() {
        return this.inner && this.option && this.option.length > this.max
      },
      showOption() {
        return this.showDropdown ? this.option?.slice(0, this.max) : this.option
      },
      shrinkOption() {
        return this.showDropdown ? this.option.slice(this.max, this.option.length) : []
      },
    },
    methods: {
      handleCommand(command) {
        console.log(command)
        command.handle(this.row)
      }
    },
  }
</script>

<style lang="scss" scoped>
.ml {
  margin-left: 10px;
}
.el-button + .el-button {
  margin-left: 10px;
}
.inner {
  .el-button + .el-button {
    margin-left: 5px;
  }
}
// .list {
  // margin: 10px;
// }
</style>