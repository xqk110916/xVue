<template>
  <div>
    <el-popover
      placement="bottom"
      width="400"
      trigger="manual"
      v-model="visible"
    >
      <div class="ui-fas">
        <el-input class="inputIcon" v-model="searchValue" suffix-icon="el-icon-search" placeholder="请输入图标名称"></el-input>
        <ul class="fas-icon-list">
          <li v-for="(item, index) in filterIcons" :key="index" @click="selectedIcon(item)">
            <i class="fas" :class="[item]" />
          </li>
        </ul>
      </div>
      <div slot="reference" class="inner" @click="visible = true">
        <span>
          <span class="hint" v-show="!value"> 请选择图标 </span>
          <span> <i :class="[value]"></i> {{ value }} </span>
        </span>

        <i v-show="value" class="right-icon el-icon-circle-close" @click.stop="clearValue"></i>
      </div>
    </el-popover>
    
  </div>
  
</template>
<script>
  import { iconList } from './icon'
  export default {
    name: 'compIcons',
    props: {
      value: {
        type: String,
      }
    },
    data() {
      return {
        searchValue: '',
        iconList: iconList,

        visible: false,
      }
    },
    computed: {
      filterIcons() {
        return this.iconList.filter(item => item.includes(this.searchValue))
      },
    },
    methods: {
      selectedIcon(name) {
        console.log("change", name)
        this.$emit('change', name)
        this.visible = false
      },
      clearValue() {
        this.$emit("update:value", '')
      },

    }
  }

</script>
<style scoped lang="scss">
  .inputIcon {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
  }

  .ui-fas {
    height: 300px;
    overflow: hidden;
    margin-top: 20px;
  }

  .fas-icon-list {
    height: 100%;
    overflow: scroll;
  }

  .fas-icon-list li {
    float: left;
    margin: 10px 10px;
  }

  .fas {
    font-size: 20px;
    color: #1989fa;
    cursor: pointer;
  }

  .inner {
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #dcdfe6;
    color: #606266;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hint {
      color: #C0C4CC;
    }

    .el-icon-circle-close {
      color: #C0C4CC;
      display: none;
      cursor: pointer;
      &:hover {
        color: #606266;
      }
    }

    &:hover {
      .el-icon-circle-close {
        display: inline-block;
      }
    }
  }
</style>
