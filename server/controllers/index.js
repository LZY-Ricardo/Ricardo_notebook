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

// 查找账号是否存在
const findUser = async (username) => {
    const _sql = `select * from user where username='${username}';`
    return allServices.query(_sql)
}

// 注册要执行的函数
const userRegister = async (date) => {
    const {nickname, username, password, create_time} = date
    const _sql = `insert into user (nickname, username, password, create_time) values ('${nickname}', '${username}', '${password}', '${create_time}');`
    return allServices.query(_sql)
}

// 根据类型查找日记列表数据
const findNoteListByType = async (userId, note_type) => {
    const _sql = `select * from note where user_id='${userId}' and note_type='${note_type}';`
    return allServices.query(_sql)
}

// 根据id查找日记详情
const findNoteDetailById = async (id) => {
    const _sql = `select * from note where id='${id}';`
    return allServices.query(_sql)
}

// 根据id查找用户
const findUserById = async (id) => {
    const _sql = `select * from user where id='${id}';`
    return allServices.query(_sql)
}

// 发布日记
const publishNote = async (data) => {
    const {user_id, note_title, note_content, note_type, note_img, update_time, create_time} = data
    const _sql = `insert into note (user_id, note_title, note_content, note_type, note_img, update_time, create_time) values ('${user_id}', '${note_title}', '${note_content}', '${note_type}', '${note_img}', '${update_time}', '${create_time}');`
    return allServices.query(_sql)
}

// 根据标题查找日记
const findNoteByTitle = async (title) => {
    const _sql = `select * from note where note_title like '%${title}%';`
    return allServices.query(_sql)
}

// 收藏日记
const loveNote = async (id) => {
    const _sql = `update note set love = 1 where id = '${id}';`
    return allServices.query(_sql)
}

// 取消收藏日记
const unLoveNote = async (id) => {
    const _sql = `update note set love = 0 where id = '${id}';`
    return allServices.query(_sql)
}

// 更新日记
const updateNote = async (id, title, content, type, img) => {
    const _sql = `update note set note_title = '${title}', note_content = '${content}', note_type = '${type}', note_img = '${img}' where id = '${id}';`
    return allServices.query(_sql)
}

// 删除日记
const deleteNote = async (id) => {
    const _sql = `delete from note where id = '${id}';`
    return allServices.query(_sql)
}

// 查找用户收藏的日记
const findLikeNoteList = async (userId) => {
    const _sql = `select * from note where love = 1 and user_id = '${userId}';`
    return allServices.query(_sql)
}

// 查找用户的所有日记
const findAllNotes = async (userId) => {
    const _sql = `select * from note where user_id = '${userId}';`
    return allServices.query(_sql)
}

// 更新用户
const userUpdate = async (data) => {
    const {userId, nickname, username, password} = data
    const _sql = `update user set nickname = '${nickname}', username = '${username}', password = '${password}' where id = '${userId}';`
    return allServices.query(_sql)
}

module.exports = {
    userLogin,
    findUser,
    userRegister,
    findNoteListByType,
    findNoteDetailById,
    findUserById,
    publishNote,
    findNoteByTitle,
    loveNote,
    unLoveNote,
    updateNote,
    deleteNote,
    findLikeNoteList,
    findAllNotes,
    userUpdate
}
