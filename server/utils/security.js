// 转译标签 防止sql 注入
function escape(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

module.exports = {
    escape,
}