<template>
  <div class="inline-form">
    <!-- 多行的键值对 -->
    <el-row>
      <el-col :class="['line',  inline ? 'inline' : 'line-box' ]" :span="item.colSpan || colSpan" v-for="(item, index) in showData" :key="index">
        <span class="label" :style="{ width: labelWidth + 'px', 'text-align': align }">
          {{ item.label }}：  
        </span>

        <template v-if="updateName !== item.label && !editAll">
          <!-- 正常文本显示 -->
          <span v-if="item.type !== 'slot'" :class="['value', { 'link': item.type === 'link' }]" :style="item.valueStyle">
            {{ item.value || params[item.prop] }}
            <i :class="['el-icon', showIcon(item)]" @click="edit(item)"></i>
          </span>
          <!-- slot显示 -->
          <span v-if="item.type === 'slot'" class="value" :style="item.valueStyle">
            <slot :name="item.value"></slot>
          </span>
        </template>
        <template v-if="updateName === item.label || editAll">
          <template>
            <el-input v-model="params[item.prop]" v-if="item.type === 'text' || !item.type" size="small" style="width: 260px;" @keyup.enter="enter"></el-input>

            <el-input v-model="params[item.prop]" type="textarea" v-if="item.type === 'textarea'" size="small" @keyup.enter="enter(item)"></el-input>

            <el-input-number v-model="params[item.prop]" v-if="item.type === 'number'" size="small"></el-input-number>

            <el-select v-model="params[item.prop]" v-if="item.type === 'select'" size="small" filterable>
              <el-option v-for="list in item.options" :key="list.value" :value="list.value" :label="list.label"></el-option>
            </el-select>
          </template>

          <template v-if="!editAll">
            <div class="btn" @click="enter(item)"> <i class="el-icon el-icon-check"></i> </div>
            <div class="btn" @click="close"> <i class="el-icon el-icon-close"></i> </div>
          </template>
          
        </template>
      </el-col>
    </el-row>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {
    name: 'lineForm',
    props: {
      lineNumber: {
        type: Number,
        default: 1
      },
      // type: 'slot'/'link'
      // valueStyle:String value标签的样式
      // icon:String value后的icon
      // edit:Boolean 是否带编辑
      // key: 带edit的时候需要带上key
      data: {
        type: Array,
        default: () => {
          return [ { value: '', label: '', type: '' } ]
        }
      },
      labelWidth: {
        type: Number | String,
        default: 80
      },
      inline: {
        type: Boolean
      },
      align: {
        type: String,
        default: 'right'
      },
      editAll: {
        type: Boolean,
        default: false
      },
      // 携带数据的object
      info: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      colSpan() {
        return 24 / this.lineNumber
      },
      showData() {
        if(this.data && this.info) {
          this.params = {}
          this.data.forEach(item => {
            item.prop = item.prop || 'default'
            let value = this.info[item.prop]
            this.$set(this.params, item.prop, value)
          })
        }
        console.log(this.params)
        return this.data
      }
    },
    data() {
      return {
        value: '',
        updateName: '',
        params: {},
      }
    },
    methods: {
      edit(item) {
        if(item.edit === 'custom') {
          this.$emit("update:value", { key: item.prop, vlaue: item.value }, true)
        } else if(item.edit) {
          this.updateName = item.label
          this.value = item.value
        }
      },
      enter(item) {
        console.log(item)
        this.$emit("update:value", { key: item.prop, value: this.value })
        this.close()
      },
      close() {
        this.updateName = ''
        this.value = ''
      },
      showIcon(item) {
        if(item.icon) {
          return item.icon
        } else if(item.edit) {
          return 'el-icon-edit'
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.inline-form {
  padding: 10px;
  font-size: 14px;
  .line-box {
    // margin-bottom: 15px;
    height: 32px;
    margin-bottom: 5px;
  }
  .inline {
    margin-bottom: 5px;
  }
  .line {
    display: flex;
    align-items: center;
    min-height: 20px;

    .value {
      .el-icon {
        cursor: pointer;
        margin-left: 5px;
        position: relative;
        top: 1px;
      }
    }

    .label {
      display: inline-block;
    }

    .link {
      color: #15469a;
      cursor: pointer;
    }
  }
  
  .el-icon-edit {
    color: #1890ff;
  }
  .btn {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>