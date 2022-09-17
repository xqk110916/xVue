<template>
  <div class="edit_form_com">
    <el-form ref="form" :model="params" :label-width="labelWidth + 'px'" label-position="right" inline size="small">
      <el-row>
        <el-col :span="column" v-for="item in showOptions" :key="item.prop" >
          <el-form-item 
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

            <el-checkbox-group 
              v-if="item.type === 'checkbox'" 
              v-model="params[item.prop]" 
              :disabled="isDisabled(item)"
              @change="val => changeSelect(val, item)" 
            >
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
              :props="{ checkStrictly: true }"
              @change="val => changeSelect(val, item)" 
            > </el-cascader>

            <el-color-picker
              v-if="item.type === 'colorPick'"
              v-model="params[item.prop]"
              size="small"
              show-alpha
              :predefine="predefineColors"
              color-format="hex"
              @change="(value) => changeColor(value, item)"
            >
            </el-color-picker>

            <select-icon 
              v-if="item.type === 'icon'" 
              :value.sync="params[item.prop]" 
              @change="value => params[item.prop] = value"
            ></select-icon>

          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
  import { clone } from '../utils'
  import selectIcon from '../selectIcon'
  export default {
    components: {
      selectIcon
    },
    props: {
      formData: {
        type: Array,
        default: () => [
          { label: '', prop: '', default: '', type: ''  }
        ]
      },
      labelWidth: {
        type: Number,
        default: 100
      },
      column: {
        type: Number | String,
        default: 24
      },
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
      
    },
    watch: {
      formData(data) {
        if(data && data.length) {
          this.setDefaultParams()
        }
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let copyParams = clone(this.params)
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
      changeColor(value, item) {
        let key = item.prop
        const reg = /[0-9]\d+/g
        const getArr = value.match(reg)
        let hexStr = '#'+((getArr[0] << 16) | (getArr[1]  << 8) | getArr[2] ).toString(16);
        this.params[key] = hexStr
        console.log(this.params, hexStr)
        this.changeSelect(value, item)
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