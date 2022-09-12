<template>
  <div class="x-table_wrapper">
    <el-table 
      ref="table"
      :data="datas" 
      style="width: 100%;" height="100%"
      border highlight-current-row 
      @row-click="rowClick"
      @row-dblclick="rowDBClick"
      @cell-click="cellClick"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ 'textAlign': align }"
    >
      <el-table-column v-if="option.selection" type="selection" label="#"></el-table-column>
      <el-table-column v-if="!option.index" type="index" label="#"></el-table-column>
      <el-table-column 
        v-for="item in config" 
        :key="item.prop" 
        :prop="item.prop" 
        :label="item.label"
        :fixed="item.fixed"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div
            :style="{'text-align': item.align }"
            :class="['cell_text', item.class ]" 
            @click="clickText(item, scope.row)"
          >
            <template v-if="!item.type?.startsWith('slot:')">
              <slot :name="item.prop + 'Pre'" :row="scope.row" :prop="item.prop" :value="scope.row[item.prop]"></slot>
              <span :title="handleValue(item, scope.row)" > {{ handleValue(item, scope.row) }} </span>
              <btn-list :option="item.options" :row="scope.row" inner></btn-list>
            </template> 
            <slot :name="item.prop" :row="scope.row" :prop="item.prop" :value="scope.row[item.prop]"></slot>
          </div>
        </template>
      </el-table-column>
      <template slot="empty">
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
  </div>
  
</template>

<script>
  // config 配置项
  // String
  // prop, label,
  // type: text/slot
  // class: title/success/error/warn/info    // 默认内置的, 也可以自己设置

  // Function 
  // handle 参数为当前行数据
  // click  参数为当前行数据
  import btnList from '@/components/btnList/index'
  export default {
    props: {
      datas: {
        type: Array
      },
      option: {
        type: Object
      },
      align: {
        type: String
      }
    },
    components: {
      btnList
    },
    computed: {
      config() {
        return this.option.column
      }
    },
    data() {
      return {
        row: null,
        checkedRows: {}
      }
    },
    methods: {
      handleTableEvent(event, payload) {
        return this.$refs.table[event](...payload)
      },
      // 表格事件处理
      rowClick(row, column) {
        this.row = row
        this.$emit("rowClick", row, column)
      },
      rowDBClick(row, column) {
        this.row = row
        this.$emit("rowDBClick", row, column)
      },
      cellClick() {
        this.$emit("cellClick", arguments)
      },
      handleSelectionChange(val) {
        this.checkedRows = val
        this.$emit("selectionChange", val)
      },
      // 内容处理
      clickText(item, row) {
        if(item.click) {
          item.click(row)
        }
      },
      handleValue(item, row) {
        if(item.handle) {
          return item.handle(row)
        } else {
          return row[item.prop]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.cell_text {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
<style lang="scss">
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
</style>