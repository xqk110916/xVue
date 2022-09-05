<template>
  <div class="x-crud_warpper">
    <search-bar class="search_bar" :datas="searchConfig" :params.sync="params" @query="getData"></search-bar>
    <x-table class="x-table" :datas="datas" :config="option.column"></x-table>
    <!-- <x-pagination :params="params" :query="getData"></x-pagination> -->
  </div>
</template>

<script>
  import searchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  import xPagination from '@/components/pagination'
  import btnList from '@/components/btnList'
  export default {
    props: {
      option: {
        type: Object,
        default: () => {
          return {
            column: [
              { prop: 'name', type: 'text', label: '姓名', class: 'primary', click: (row) => { console.log(row) }, search: true },
              { prop: 'age', type: 'text', label: '年龄' },
              { prop: 'sex', type: 'slot', label: '性别', width: 100 },
              { type: 'btnlist', label: '操作', fixed: 'right', width: 200, option: [
                { label: '查看', handle: (row) => { console.log("查看", row) }, disabled: (row) => { return row.sex === 1 } },
                { label: '编辑', handle: (row) => { console.log("编辑", row) }, type: 'primary' },
                { label: '删除', handle: (row) => { console.log("删除", row) }, type: 'danger' },
                { label: '删除', handle: (row) => { console.log("删除", row) }, type: 'danger' },
              ] }
            ]
          }
        }
      },
      datas: {
        type: Array
      }
    },
    components: {
      searchBar, xTable, xPagination, btnList
    },
    data() {
      return {
        params: {}
      }
    },
    computed: {
      searchConfig() {
        return this.option.column.filter(item => item.search)
      }
    },
    methods: {
      getData() {

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
}
</style>