export function formateDate(time) {
    const date = new Date(+time) // 时间戳转时间对象 注意要转换成数字类型
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
}
