<template>
  <div class="table_wrapper">
    <div class="xTable-auto">
      <search-bar class="search_bar" :datas="config" :params.sync="params" :query="getData"></search-bar>
      <x-table class="x-table" :datas="datas" :config="config">
        <template #sex="slotProps">
          <el-switch v-model="slotProps.value" :active-value="0" :inactive-value="1"></el-switch>
        </template>
      </x-table>
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
        value: '',
        params: {
          name: 'zs'
        },
        config: [
          { prop: 'name', type: 'text', label: '姓名', class: 'title', click: (row) => { console.log(row) }},
          { prop: 'age', type: 'text', label: '年龄' },
          { prop: 'sex', type: 'slot', label: '性别' },
        ],
        datas: [
          { name: '张三张三张三张三张三张三张三张三张三张三张三张三张三张三', age: '18', sex: 1 },
          { name: '', age: '18', sex: 0 },
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
        ],
        option: {
          column: [{
            label: '姓名',
            prop: 'name',
            headerslot:true,
          }, {
            label: '年龄',
            prop: 'sex'
          }]
        },
      }
    },
    methods: {
      fun(val) {
        return val + '132'
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