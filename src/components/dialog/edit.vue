<template>
  <theme-edit
    :show="show"
    :title="title"
    :column="column"
    :showFooter="showFooter"
    :appendToBody="appendToBody"
    @close="close"
    @submit="submit"
    @reset="reset"
    @cancle="close"
  >
  <div class="edit_form_com">
    <el-form ref="form" :model="params" :label-width="labelWidth + 'px'" label-position="right" inline size="small">
      <el-form-item 
        v-for="item in showOptions" 
        :key="item.prop" 
        :label="`${item.label}：`"
        :prop="item.prop"
        :rules="rules(item)"
        :class="[ item.type === 'colorPick' ? 'colorPick' : '' ]"
      >

        <el-input
          v-if="!item.type || item.type === 'text'" 
          v-model="params[item.prop]" 
          :disabled="isDisabled(item)"
          :placeholder="`请输入${item.label}`"
          clearable
        ></el-input>

        <el-input-number 
          v-if="item.type === 'number'" 
          v-model="params[item.prop]" 
          :disabled="isDisabled(item)"
          :placeholder="`请输入${item.label}`" 
          :min="0.1"
        ></el-input-number>

        <el-input 
          v-if="item.type === 'textarea'" 
          type="textarea" 
          :disabled="isDisabled(item)"
          v-model="params[item.prop]" 
          :placeholder="`请输入${item.label}`" 
          :rows="3"
        ></el-input>

        <el-select 
          v-if="item.type === 'select'" 
          v-model="params[item.prop]" 
          :disabled="isDisabled(item)"
          @change="val => changeSelect(val, item)" 
          :clearable="!item.default" 
          :multiple="item.multiple"
          filterable
        >
          <el-option 
            v-for="list in item.options" 
            :key="list.value"
            :value="list.value"
            :label="list.label"
          ></el-option>
        </el-select>

        <el-checkbox-group v-if="item.type === 'checkbox'" v-model="params[item.prop]" :disabled="isDisabled(item)">
          <el-checkbox v-for="list in item.options" :key="list.value" 
            :label="list.value"> {{ list.label }} </el-checkbox>
        </el-checkbox-group>

        <el-cascader 
          v-if="item.type === 'cascader'" 
          v-model="params[item.prop]" 
          :options="item.options" 
          clearable 
          filterable
          :show-all-levels="false"
          :disabled="isDisabled(item)"
          :props="{ checkStrictly: true }"> </el-cascader>
<!-- @change="(value) => handlerCascaderChange(value, params[item.prop])" -->

        <el-color-picker
          v-if="item.type === 'colorPick'"
          v-model="params[item.prop]"
          size="small"
          show-alpha
          :predefine="predefineColors"
          color-format="hex"
          @change="(value) => changeColor(value, item.prop)"
        >
        </el-color-picker>

        <select-icon 
          v-if="item.type === 'icon'" 
          :value.sync="params[item.prop]" 
          @change="value => params[item.prop] = value"
        ></select-icon>

        <upload-file 
          v-if="item.type === 'upload'"
          ref="uploadFile"
          listType="picture-card"
          :isShowTip="false"
          @change:list="(list) => changeFileList(list, item.prop)"
        ></upload-file>

      </el-form-item>
    </el-form>
  </div>
    
  </theme-edit>
</template>

<script>
  import { deepClone } from '@/utils'
  import { getTokenValue } from "@/utils/auth"
  import selectIcon from './selectIcon'
  import uploadFile from '@/components/uploadFile/uploadFile.vue' 
  export default {
    components: {
      selectIcon, uploadFile
    },
    props: {
      formData: {
        type: Array,
        default: () => [
          { label: '', prop: '', default: '', type: ''  }
        ]
      },
      // 用来区别调用的组件, submit时会返回该name
      name: {
        type: String
      },
      title: {
        type: String
      },
      labelWidth: {
        type: Number,
        default: 100
      },
      column: {
        type: Number,
        default: 1
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      appendToBody: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      showOptions() {
        return this.formData.filter(item => {
          if(!item.show) {
            return true
          } else if(typeof this.params[item.prop] !== 'undefined') {
            return item.show(this.params)
          } else {
            return true
          }
        })
      }
    },
    data() {
      return {
        uploadUrl: process.env.VUE_APP_BASE_API + 'file/upload',
        uploadHeader: { token: getTokenValue() },
        fileType: '',
        show: false,
        isUpdate: false,
        params: {},
        row: {},
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
        ]
      }
    },
    created() {
      console.log('uploadHeader', this.uploadHeader)
    },
    watch: {
      formData(data) {
        if(data && data.length) {
          this.setDefaultParams()
        }
      }
    },
    methods: {
      getTokenValue() {

      },
      open(row = {}) {
        if(Object.keys(row).length) {
          this.isUpdate = true
          this.row = row
          this.setDefaultParams()
        } else {
          this.setDefaultParams()
        }
        this.show = true
      },
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let copyParams = deepClone(this.params)
            if(this.isUpdate) {
              copyParams.id = this.row.id
            }
            console.log(this.params)
            this.$emit("submit", this.name, [copyParams, this.isUpdate])
            this.close()
          }
          return false;
        });
      },
      reset() {
        this.setDefaultParams()
      },
      close() {
        this.setDefaultParams()
        this.isUpdate = false
        this.show = false
      },
      rules(item) {
        if(item.require) {
          return [ { required: item.require, message: `请输入${item.label}`, trigger: ['blur', 'change'] } ]
        } else {
          return []
        }
      },
      changeSelect(val, item) {
        if(item.handler) {
          item.handler(this.params)
        }
      },
      handlerCascaderChange(value, data) {
        // let idx = value.length ? value.length - 1 : 0
        // data = value[idx]
      },
      changeFileList(list, key) {
        let urls = list.map(item => item.url)
        let value = urls.join(",")
        this.params[key] = value
        console.log(this.params)
      },

      isDisabled(item) {
        if(item.disabled) {
          return item.disabled(this.params)
        } else if(item.noUpdate) {
          return this.isUpdate
        } else {
          return false
        }
      },
      setDefaultParams() {
        this.params = {}
        this.formData.forEach(item => {
          let defaultValue = this.handlerDefaultValue(item)
          if(this.isUpdate) {
            defaultValue = this.row[item.prop] || defaultValue
          }
          this.$set(this.params, item.prop, defaultValue)
        })
      },
      handlerDefaultValue(item) {
        let value = '';
        if(item.type === 'checkbox' || item.type === 'cascader') {
          value = []
        }
        return !item.default && item.default !== 0 ? value : item.default
      },
      changeColor(value, key) {
        const reg = /[0-9]\d+/g
        const getArr = value.match(reg)
        let hexStr = '#'+((getArr[0] << 16) | (getArr[1]  << 8) | getArr[2] ).toString(16);
        this.params[key] = hexStr
        console.log(this.params, hexStr)
      },
    }
  }
</script>

<style lang="scss" scoped>
.edit_form_com {
  .el-form-item {
    margin-bottom: 18px;
  }
  .colorPick {
    height: 33px;
  }
  // .el-input {
  //   width: 260px;
  // }
}
</style>