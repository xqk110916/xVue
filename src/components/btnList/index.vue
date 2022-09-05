<template>
  <div :class="{ inner: 'inner' }">
    <el-button 
      v-for="(item, index) in showOption"
      :key="index"
      :type="inner ? 'text' : item.type"
      :class="[ item.type ]"
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
      }
    },
    computed: {
      showOption() {
        return this.option?.slice(0, this.max)
      },
      shrinkOption() {
        return this.option?.length > this.max ? this.option.slice(this.max, this.option.length) : []
      },
      showDropdown() {
        return this.inner && this.option && this.option.length > this.max
      }
    },
    methods: {
      handleCommand(command) {
        console.log(command)
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
</style>