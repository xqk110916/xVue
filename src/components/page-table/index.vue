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
  import xSearchBar from '@/components/searchBar/index'
  import xTable from '@/components/table'
  export default {
    components: {
      xSearchBar, xTable
    }
  }
</script>

<style lang="scss" scoped>

</style>