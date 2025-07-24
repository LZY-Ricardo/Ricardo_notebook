// 数据库相关操作
const mysql = require('mysql2/promise')
const config = require('../config/index.js')

// 创建线程池 (连接池)
const pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

// 执行 sql 的方法
const allServices = {
    async query(sql, values) {
        try {
            // 通过连接池连接mysql
            const conn = await pool.getConnection()
            // 执行各种增删改查的 sql 的语句
            const [rows, fields] = await conn.query(sql, values)
            // 释放连接
            pool.releaseConnection(conn)
            // 返回结果
            return Promise.resolve(rows)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

// 登录要执行的函数
const userLogin = async (username, password) => {
    const _sql = `select * from user where username='${username}' and password='${password}';`
    return allServices.query(_sql)
}

module.exports = {
    userLogin
}
