/*
 * @Author: zhangjuan
 * @Description:
 * @Date: 2021-02-22 17:11:40
 * @LastEditors: MaiChao
 * @LastEditTime: 2021-05-13 16:37:04
 */
export const timeFormat = (date) => {
  var date = new Date(date)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  return YY + MM + DD
}
export const secondsFormat = (date) => {
  var date = new Date(date)
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return hh + mm + ss
}
/**
 * @desc 导出表格
 * @type
 * @params 插件名，插件名，html,文件名
 * @author weipeng
 * @date 2019-07-11 16:30:54
 */
export const exportTable = (XLSX, FileSaver, item, fileName, itemLength) => {
  // if (!itemLength) {
  //   tip('表格行数为0！')
  //   return false
  // }
  /* 从表生成工作簿对象 */
  /* 获取二进制字符串作为输出 */
  var wbout = XLSX.write(item, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      // 设置导出文件名称
      `${fileName}.xlsx`
    )
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
