<template>
  <div class="table_wrapper">
    <crud :datas="datas" :option="option" :pages="pages" :checkedRows.sync="checkedRows" @onLoad="getData">
      <x-table class="x-table" :datas="datas" :option="option">
        <template #sex="slotScope">
          <el-switch v-model="slotScope.row.sex" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" @change="(val) => changeSex(val, slotScope)"></el-switch>
        </template>
      </x-table>
    </crud>
  </div>
</template>

<script>
  import searchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  import xPagination from '@/components/pagination'
  import test from '@/components/test'
  import { getData } from '@/api/index'
  import crud from '@/components/crud'
  import xDialog from '@/components/dialog'
  import editForm from '@/components/dialog/edit'
  export default {
    components: {
      searchBar, xTable, xPagination, test, crud, xDialog, editForm
    },
    data() {
      return {
        dialogVisible: false,
        dateValue: '',
        value: '',
        pages: {
          currentPage: 1,
          pageSize: 20,
          total: 0
        },
        datas: [],
        option: {
          selection: true,
          page: true,
          btns: [
            { label: '新增', type: 'primary', handle: () => { console.log("新增") } },
            { label: '修改', type: 'normal', handle: () => { console.log("修改") } },
            { label: '删除', type: 'danger', disabled: () => true, handle: () => { console.log("删除") } },
          ],
          column: [
            { prop: 'id', label: 'id' },
            { prop: 'name', type: 'text', label: '姓名', class: 'primary', click: (row) => { console.log(row) }, search: true},
            { prop: 'age', type: 'text', label: '年龄', search: true },
            { prop: 'sex', type: 'slot:select', label: '性别', width: 100, search: true, default: 1, options: [
              { label: '男', value: 1 },
              { label: '女', value: 0 },
            ] },
            { type: 'btnlist', label: '操作', fixed: 'right', width: 200, options: [
              { label: '查看', handle: (row) => { this.dialogVisible = true }, disabled: (row) => { return row.sex === 1 } },
              { label: '编辑', handle: (row) => { console.log("编辑", row) }, type: 'primary' },
              { label: '删除', handle: (row) => { console.log("删除", row) }, type: 'danger' },
              { label: '删除', handle: (row) => { console.log("删除999", row) }, type: 'danger' },
            ] }
          ]
        },
        formData: [
          { label: '姓名', prop: 'name', type: 'text' },
          { label: '年龄', prop: 'age', type: 'text' },
          { label: '性别', prop: 'sex', type: 'select' },
        ],
        checkedRows: [],    // 当前选中的table行
      }
    },
    created() {
      this.getData()
    },
    methods: {
      fun(val) {
        return val + '132'
      },
      getData(payload) {
        getData(payload).then(res => {
          this.datas = res.data.list.map((item, index) => {
            item.id = index
            return item
          })
          this.pages.total = res.data.pagination.total
        })
      },
      changeSex(val, slotProps) {
        console.log(val, slotProps)
        console.log(this.datas)
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