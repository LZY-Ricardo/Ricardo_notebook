const Router = require('@koa/router')
const router = new Router()
const { verify } = require('../utils/jwt.js')
const { findNoteListByType, findNoteDetailById, findUserById } = require('../controllers/index.js')

router.get('/findNoteListByType', verify(), async (ctx) => {
    const { note_type } = ctx.request.query // 从 url 后面解析参数
    // console.log(note_type);
    try {
        const res = await findNoteListByType(ctx.userId, note_type)
        console.log(res);
        if (res.length > 0) {
            ctx.body = {
                code: '1',
                msg: '查询成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '1',
                msg: '暂无数据',
                data: ['暂无数据']
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '服务器异常',
            data: error
        }
    }
})

router.get('/findNoteDetailById', verify(), async (ctx) => {
    const { id } = ctx.request.query
    console.log(id);
    
    try {
        const Res = await findNoteDetailById(id)
        // console.log(Res);
        if (Res.length > 0) {
            let data = {
                ...Res[0],
            }
            ctx.body = {
                code: '1',
                msg: '查询成功',
                data
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '查询失败',
                data: {}
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '服务器异常',
            data: error
        }
    }
})

module.exports = router