<template>
  <div class="table_wrapper">
    <div class="xTable-auto">
      <search-bar class="search_bar" :datas="config" :params.sync="params" :query="getData"></search-bar>
      <x-table class="x-table" :datas="datas" :config="config"></x-table>
    </div>
    
    <!-- <test :datas="datas" :config="config"></test> -->
  </div>
</template>

<script>
  import searchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  import test from '@/components/test'
  export default {
    components: {
      searchBar, xTable, test
    },
    data() {
      return {
        value: '123',
        params: {
          name: 'zs'
        },
        config: [
          { prop: 'name', type: 'text', label: '姓名' },
          { prop: 'age', type: 'text', label: '年龄' },
          { prop: 'sex', type: 'text', label: '性别' },
        ],
        datas: [
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
          { name: 'zs', age: '18', sex: 1 },
        ]
      }
    },
    methods: {
      fun() {
        console.log(this.params)
      },
      getData() {
        console.log("getData")
      }
    }
  }
</script>

<style lang="scss" scoped>
.table_wrapper {
  height: 100vh;
  .xTable-auto {
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
}
</style>