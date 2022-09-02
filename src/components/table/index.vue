<template>
  <div class="x-table_wrapper">
    <el-table 
      :data="datas" 
      style="width: 100%;" height="100%"
      border highlight-current-row 
      @row-click="rowClick"
      @row-dblclick="rowDBClick"
      @cell-click="cellClick"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column 
        v-for="item in config" 
        :key="item.prop" 
        :prop="item.prop" 
        :label="item.label"
      >
        <template slot-scope="scope">
          <div
            :style="{'text-align': item.align }"
            :class="['cell_text', item.class ]" 
            :title="handleValue(item, scope.row)" 
            @click="clickText(item, scope.row)"
          >
            <template v-if="item.type !== 'slot'">
              <slot :name="item.prop + 'Pre'" :row="scope.row" :prop="item.prop" :value="scope.row[item.prop]"></slot>
              <span> {{ handleValue(item, scope.row) }} </span>
            </template>
            <slot :name="item.prop" :row="scope.row" :prop="item.prop" :value="scope.row[item.prop]"></slot>
          </div>
        </template>
      </el-table-column>
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
  export default {
    props: {
      datas: {
        type: Array
      },
      config: {
        type: Array
      }
    },
    data() {
      return {
        row: null,
      }
    },
    methods: {
      // 表格事件处理
      rowClick(row, column) {
        this.row = row
        this.$emit("rowClick", row, column)
      },
      rowDBClick(row, column) {
        this.row = row
        this.$emit("rowDBClick", row, column)
      },
      cellClick(row, column, cell) {
        this.$emit("cellClick", row, column, cell)
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
.operation_text {
  cursor: pointer;
}
.title {
  @extend .operation_text;
  color: #409EFF;
}
.success {
  @extend .operation_text;
  color: #67C23A;
}
.error {
  @extend .operation_text;
  color: #F56C6C;
}
.warn {
  @extend .operation_text;
  color: #E6A23C;
}
.info {
  @extend .operation_text;
  color: #909399;
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