const Koa = require('koa')
const app = new Koa()
const userRouter = require('./router/user.js')
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');

app.use(cors()); // 告诉浏览器 允许前端跨域请求我
app.use(bodyParser()); // 辅助 koa 解析请求体中的数据

// app.use(async (ctx) => {
//     console.log(ctx);
//     if (ctx.request.url === '/home') {
//         ctx.body = 'hello koa'
//     } else {
//         ctx.body = '404 not found'
//     }
// })

app.use(userRouter.routes(), userRouter.allowedMethods())

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})