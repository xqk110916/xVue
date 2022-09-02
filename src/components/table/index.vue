<template>
  <div class="x-table_wrapper">
    <el-table :data="datas" border highlight-current-row style="width: 100%;" height="100%">
      <el-table-column 
        v-for="item in config" 
        :key="item.prop" 
        :prop="item.prop" 
        :label="item.label"
      ></el-table-column>
    </el-table>
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
    },
    data() {
      return {
        height: 500,
      }
    }
  }
</script>

<style lang="scss" scoped>
// .xTable-auto {
//   .x-table_wrapper {
//     flex: 1;
//     position: relative;
//     ::v-deep .el-table {
//       position: absolute;
//     }
//   }
// }
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