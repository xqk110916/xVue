<template>
  <div class="table_wrapper">
    <!-- <div class="xTable-auto">
      <search-bar class="search_bar" :datas="config" :params.sync="params" @query="getData"></search-bar>
      <div>
        <el-button type="primary" size="small" @click="fun"> 新增 </el-button>
        <el-button type="primary" size="small" @click="fun"> 删除 </el-button>
      </div>
      <x-table class="x-table" :datas="datas" :config="config">
        <template #sex="slotProps">
          <el-switch v-model="slotProps.value" :active-value="0" :inactive-value="1" @change="(val) => changeSex(val, slotProps)"></el-switch>
        </template>
      </x-table>
      <x-pagination :params="params" :query="getData"></x-pagination>
    </div> -->
    
    <!-- <test :datas="datas" :config="config"></test> -->

    <crud :datas="datas"></crud>
  </div>
</template>

<script>
  import searchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  import xPagination from '@/components/pagination'
  import test from '@/components/test'
  import { getData } from '@/api/index'
  import crud from '@/components/crud'
  export default {
    components: {
      searchBar, xTable, xPagination, test, crud
    },
    data() {
      return {
        dateValue: '',
        value: '',
        params: {
          currentPage: 1,
          pageSize: 20,
          total: 0
        },
        config: [
          { prop: 'name', type: 'text', label: '姓名', class: 'primary', click: (row) => { console.log(row) }},
          { prop: 'age', type: 'text', label: '年龄' },
          { prop: 'sex', type: 'slot', label: '性别', width: 100 },
          { type: 'btnlist', label: '操作', fixed: 'right', width: 200, option: [
            { label: '查看', handle: (row) => { console.log("查看", row) }, disabled: (row) => { return row.sex === 1 } },
            { label: '编辑', handle: (row) => { console.log("编辑", row) }, type: 'primary' },
            { label: '删除', handle: (row) => { console.log("删除", row) }, type: 'danger' },
            { label: '删除', handle: (row) => { console.log("删除", row) }, type: 'danger' },
          ] }
        ],
        datas: [],
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
    created() {
      this.getData()
    },
    methods: {
      fun(val) {
        return val + '132'
      },
      getData() {
        getData(this.params).then(res => {
          this.datas = res.data.list
          this.params.total = res.data.pagination.total
        })
      },
      changeSex(val, slotProps) {
        slotProps.row[slotProps.prop] = val
        this.$forceUpdate()
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