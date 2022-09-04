<template>
  <div class="x-search_child">
    <span class="label" :style="{ width: labelWidth + 'px' }"> {{ label }}{{ colon ? '：' : '' }} </span>
    <el-input 
      v-if="!type || type === 'text'" 
      v-model="childValue" 
      :clearable="clearable" 
      size="small" 
      :style="{width: valueWidth + 'px'}"
      :placeholder="`请输入${label}`"
    ></el-input>
    <el-select 
      v-if="type === 'select'"
      v-model="childValue" 
      size="small" 
      :clearable="clearable" 
      :multiple="multiple" 
      :placeholder="`请选择${label}}`"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-date-picker 
      v-if="type === 'date'"
      v-model="childValue" 
      type="date" 
      size="small"
      :value-format="valueForamt"
      :placeholder="`请选择${label}}`"
    ></el-date-picker>
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
      type: {
        type: String,
        default: 'text'
      },
      options: {
        type: Array,
        default: () => []
      },
      labelWidth: {
        type: Number | String
      },
      valueWidth: {
        type: Number | String,
        default: 200
      },
      align: {
        type: String,
        default: 'right'
      },
      clearable: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      valueForamt: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      // 是否在label后添加冒号
      colon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        date: ''
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