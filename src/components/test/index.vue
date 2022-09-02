<template>
  <div class="container">
    <div class="test"> test </div>
    <div class="table" >
        <el-table height="100%" :data="datas" style="width: 100%" >
          <el-table-column 
            v-for="item in config" 
            :key="item.prop" 
            :prop="item.prop" 
            :label="item.label"
          ></el-table-column>
        </el-table>
    </div>
    <div class="pagination"> 分页器 </div>
  </div>
</template>

<script>
  export default {
    props: {
      datas: {
        type: Array
      },
      config: {
        type: Array
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .test {
    height: 30px;
  }
  .table {
    flex: 1;
    position: relative;
    ::v-deep .el-table {
      position: absolute;
    }
  }
  .pagination {
    height: 50px;
  }
}
</style>