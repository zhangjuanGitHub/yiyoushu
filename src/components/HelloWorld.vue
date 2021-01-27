<template>
  <div class="hello">
    <span>11111</span>
    <div class="meiti">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info">标签三</el-tag>
      <el-tag type="warning">标签四</el-tag>
      <el-tag type="danger">标签五</el-tag>
      <el-tag size="mini">标签六六六六</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {}
}
</script>

<style scoped lang="scss">
.hello {
  color: $success-color;
}
.meiti {
  width: 600px;
  height: 60px;
  display: flex;
  background: #ff0000;
}
</style>
