const Router = require('@koa/router')
const { userLogin } = require('../controllers')
const router = new Router()

router.prefix('/user') // 路由前缀 所有的路由都会添加这个前缀

router.post('/login', async (ctx) => {
    // 1. 获取请求体中的账号和密码
    // post 请求携带的参数都在请求体中
    const { username, password } = ctx.request.body
    // console.log(username, password);
    // 2. 检验账号密码是否合法
    // 去数据库查询账号密码是否正确
    try {
        const res = await userLogin(username, password)
        if (res.length) {
            let data = {
                id: res[0].id,
                username: res[0].username,
                nickname: res[0].nickname,
                createTime: res[0].create_time,
            }

            ctx.body = {
                code: '1111',
                msg: '登录成功',
                data
            }
        } else { // 逻辑性错误
            ctx.body = {
                code: '0000',
                msg: '账号或密码错误',
                data: {}
            }
        }
    } catch (error) { // 程序性错误
        ctx.body = {
            code: '-1',
            msg: '服务器异常',
            data: error
        }
    }
})

module.exports = router