<template>
  <div class="pagination_warpper" :style="{ textAlign: align }">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageParams.currentPage"
      :page-size="pageParams.pageSize"
      layout="total, prev, pager, next"
      :total="total"
      :hide-on-single-page="hideOnSinglePage"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      pages: {
        type: Object
      },
      total: {
        type: Number | String,
        default: 0
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
    computed: {
      pageParams() {
        let { currentPage, pageSize } = this.pages
        if(!currentPage) this.$set(this.pages, "currentPage", 1 )
        if(!pageSize) this.$set(this.pages, "pageSize", 20 )
        return this.pages
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit("query", this.pages)
        this.$emit("current-change", ...arguments)
      }
    }
  }
</script>

<style lang="scss" scoped>
.pagination_warpper {
  padding: 10px 0;
}
</style>