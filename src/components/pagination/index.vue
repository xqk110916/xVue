<template>
  <div class="pagination_warpper" :style="{ textAlign: align }">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="params.currentPage"
      :page-size="params.pageSize"
      layout="total, prev, pager, next"
      :total="params.total"
      :hide-on-single-page="hideOnSinglePage"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      params: {
        type: Object,
        default: () => {
          return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
          }
        }
      },
      // 挂载的请求函数, 翻页时会去调用
      query: {
        type: Function
      },
      hideOnSinglePage: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'right'
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val, this.params, this.query)
        this.query()
        this.$emit("current-change", ...arguments)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>