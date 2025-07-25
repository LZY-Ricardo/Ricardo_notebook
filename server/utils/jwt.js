const jwt = require('jsonwebtoken')

function sign(options, time) {
    return jwt.sign(options, '666', {
        expiresIn: time || '24h', // 一天过期
    })
}

function verify() {
    return async (ctx, next) => {
        const token = ctx.headers.authorization
        if (token) {
            try {
                const decoded = jwt.verify(token, '666')
                // console.log(decoded);
                if (decoded.id) { // 合法
                    await next()
                }
            } catch (error) {
                ctx.status = 401
                ctx.body = {
                    code: '0',
                    msg: '登录失效',
                }
            }
        } else {
            ctx.status = 401
            ctx.body = {
                code: '0',
                msg: '请先登录',
            }
        }
    }
}

function refreshVerify(token) {
    try{
        const decoded = jwt.verify(token, '666')
        if (decoded.id) {
            return decoded
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    sign,
    verify,
    refreshVerify,
}