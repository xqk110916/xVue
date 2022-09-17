<template>
  <div class="x-crud_warpper">
    <search-bar class="search_bar" :datas="searchConfig" :params.sync="searchParams" @query="getData">
      <slot name="search"></slot>
    </search-bar>
    <btn-list class="btns" :option="option.btns" size="small"></btn-list>
    <slot>
      <x-table class="x-table" :datas="datas" :option="option" @selectionChange="handleSelectionChange"></x-table>
    </slot>
    <x-pagination v-if="option.page" :pages.sync="pages" @query="getData" :total="pages?.total"></x-pagination>

    <x-dialog :visible.sync="dialogVisible" :before-close="() => { this.dialogVisible = false }">
      <edit-form :formData="formData" :column="12"></edit-form>
    </x-dialog>
  </div>
</template>

<script>
  import searchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  import xPagination from '@/components/pagination'
  import btnList from '@/components/btnList'
  import { clone } from '../utils'
  import { editExcludeType } from '../utils/config'
  export default {
    props: {
      option: {
        type: Object
      },
      searchParams: {
        type: Object,
        default: () => { return {} }
      },
      pages: {
        type: Object,
        default: () => { return {} }
      },
      datas: {
        type: Array
      },
    },
    components: {
      searchBar, xTable, xPagination, btnList
    },
    data() {
      return {
        dialogVisible: false,
      }
    },
    computed: {
      searchConfig() {
        console.log(this.option.column.filter(item => item.search))
        return this.option.column.filter(item => item.search)
      },
      editConfig() {
        return this.option.column.filter(item => {
          let flag = editExcludeType.find( type => item.type)   // 看type类型是否是需要过滤的类型

        })
      }
    },
    methods: {
      getData() {
        let search = clone(this.searchParams)
        let pages = clone(this.pages)
        let payload = { ...search, ...pages }
        delete payload.total
        this.$emit("onLoad", payload)
      },
      handleSelectionChange(val) {
        console.log("val", val)
        this.$emit("selectionChange", val)
        this.$emit("update:checkedRows", val)
      }
    }
  }
</script>

<style lang="scss" scoped>
.x-crud_warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .x-table {
    flex: 1;
    position: relative;
    ::v-deep .el-table {
      position: absolute;
    }
  } 
  .btns {
    margin: 0 10px 10px;
  } 
}
</style>