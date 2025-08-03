const Router = require('@koa/router')
const router = new Router()
const { verify } = require('../utils/jwt.js')
const { findNoteListByType, findNoteDetailById, findUserById, publishNote, findNoteByTitle, loveNote, unLoveNote, updateNote, deleteNote, findLikeNoteList, findAllNotes } = require('../controllers/index.js')

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
                code: '0',
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
                msg: '暂无数据',
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

router.post('/note-publish', verify(), async (ctx) => {
    const { note_title, note_content, note_type, note_img } = ctx.request.body
    const user_id = ctx.userId
    try {
        const res = await publishNote({
                user_id, 
                note_title, 
                note_content,
                note_type, 
                note_img,
                update_time: Date.now(),
                create_time: Date.now()
            })
        console.log(res);
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '1',
                msg: '发布成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '发布失败',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '发布失败',
            data: error
        }
    }
})

router.get('/findNoteByTitle', verify(), async (ctx) => {
    const { title } = ctx.request.query
    console.log(title);
    try {
        const res = await findNoteByTitle(title)
        console.log(res);
        if (res.length > 0) {
            ctx.body = {
                code: '1',
                msg: '查询成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '暂无数据',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '查询失败',
            data: error
        }
    }
})

router.post('/likeNote', verify(), async (ctx) => {
    const { id } = ctx.request.body
    console.log(id);
    
    try {
        console.log(ctx.userId);
        
        const res = await loveNote(id)
        console.log(res);
        
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '1',
                msg: '收藏成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '收藏失败',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '收藏失败',
            data: error
        }
    }
})

router.post('/unlikeNote', verify(), async (ctx) => {
    const { id } = ctx.request.body
    try {
        const res = await unLoveNote(id)
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '1',
                msg: '取消收藏成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '取消收藏失败',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '取消收藏失败',
            data: error
        }
    }
})

router.post('/updateNote', verify(), async (ctx) => {
    const {id, title, content, type, img} = ctx.request.body
    try {
        const res = await updateNote(id, title, content, type, img)
        console.log(res);
        
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '1',
                msg: '更新成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '更新失败',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '更新失败',
            data: error
        }
    }
})

router.post('/deleteNote', verify(), async (ctx) => {
    const {id} = ctx.request.body
    try {
        const res = await deleteNote(id)
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '1',
                msg: '删除成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '删除失败',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '删除失败',
            data: error
        }
    }
})

router.get('/noteLike', verify(), async (ctx) => {
    const userId = ctx.userId
    console.log(userId);
    
    try {
        console.log(userId);
        
        const res = await findLikeNoteList(userId)
        console.log(res);
        
        if (res.length > 0) {
            ctx.body = {
                code: '1',
                msg: '查询成功',
                data: res.map(item => ({
                    ...item,
                }))
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '暂无数据',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '查询失败',
            data: error
        }
    }
})

router.get('/findAllNotes', verify(), async (ctx) => {
    const userId = ctx.userId
    try {
        const res = await findAllNotes(userId)
        if (res.length > 0) {
            ctx.body = {
                code: '1',
                msg: '查询成功',
                data: res
            }
        } else {
            ctx.body = {
                code: '0',
                msg: '暂无数据',
                data: []
            }
        }
    } catch (error) {
        ctx.body = {
            code: '-1',
            msg: '查询失败',
            data: error
        }
    }
})

module.exports = router