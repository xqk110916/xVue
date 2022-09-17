<template>
  <div class="x-searchBar">
    <child 
      v-for="item in searchDatas"
      :key="item.prop" 
      :value.sync="formData[item.prop]"
      :label="item.label"
      :type="item.type"
      :options="item.options"
    ></child>
    <el-button type="primary" size="small" @click="getData"> 查询 </el-button>
    <el-button size="small" @click="resetParams" v-if="reset"> 重置 </el-button>
    <slot></slot>
  </div>
</template>

<script>
  import child from './child.vue'
  import { clone } from '../utils'
  export default {
    components: {
      child
    },
    props: {
      datas: {
        type: Array
      },
      params: {
        type: Object
      },
      reset: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      formData() {
        if(this.datas && this.datas.length) {
          let paramsKeys = Object.keys(this.params)
          this.datas.forEach(item => {
            if(paramsKeys.findIndex(key => item.prop === key) === -1) {
              let defaultValue = item.default || ''
              this.$set(this.params, item.prop, defaultValue)
            }
          })
        }
        return this.params
      },
      searchDatas() {
        let data = clone(this.datas)
        return data.map(item => {
          if(item.type.startsWith("slot:")) {
            item.type = item.type.replace("slot:", '')
          }
          return item
        })
      }
    },
    data() {
      return {
        val: '132'
      }
    },
    methods: {
      getData() {
        this.$emit("query")
      },
      resetParams() {
        this.datas.forEach(item => {
          let defaultValue = item.default || ''
          this.params[item.prop] = defaultValue
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.x-searchBar {
  padding: 15px 10px;
}
.el-button + .el-button {
  margin-left: 10px;
}
</style>