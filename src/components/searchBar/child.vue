<template>
  <div class="x-search_child">
    <span class="label" :style="{ width: labelWidth + 'px' }"> {{ label }}{{ colon ? '：' : '' }} </span>
    <el-input v-model="childValue" size="small" style="width: 200px;"></el-input>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      },
      label: {
        type: String
      },
      labelWidth: {
        type: Number | String
      },
      align: {
        type: String,
        default: 'right'
      },
      colon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        
      }
    },
    computed: {
      childValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit("update:value", val)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.x-search_child {
  display: inline-block;
  padding: 0 10px;
  .label {
    font-size: 14px;
    margin-right: 10px;
    display: inline-block;
  }
}
</style>