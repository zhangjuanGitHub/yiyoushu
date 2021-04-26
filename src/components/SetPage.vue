<!--
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-04 11:11:09
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-03-15 11:53:45
-->
<template>
  <div class="pagination-wrap flex-all-center">
    <el-pagination @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                   background
                   :pager-count="5"
                   layout="total, prev, pager, next, jumper"
                   :page-size="query.size"
                   :current-page.sync="query.page"
                   :hide-on-single-page="total<=query.size"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total'],
  data () {
    return {
      query: {
        size: 10,
        page: 1
      }
    }
  },
  methods: {
    // 改变页数
    handleCurrentChange (change) {
      this.query.page = change
      this.$emit('pagingChange', this.query)
    },
    // 改变条数
    handleSizeChange (change) {
      if (!change > this.total) {
        this.query.size = change
        this.$emit('pagingChange', this.query)
      } else {
        this.query.size = 10
        return this.$message.error('当前页数小于总条数！')
      }
    }
  },
  created () {
    this.query.page = parseFloat(this.$route.query.page) || 1
  },
  components: {},
  watch: {
    '$route' () {
      this.query.page = parseFloat(this.$route.query.page)
    }
  }
}
</script>
<style lang="css">
.pagination-wrap {
  padding: 20px 0;
  /* background: palegreen; */
}
</style>
