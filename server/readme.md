# 服务端逻辑分层
1. 路由层: 处理当前端请求不同的路径时, 执行对应的响应逻辑
2. 控制层: 执行响应逻辑时, 调用服务层的方法, 处理业务逻辑
3. 服务层
4. 数据层

# 框架
koa

# 项目梳理
- http请求体, http响应体

- 路由: 处理当前端请求不同的路径时, 执行对应的响应逻辑

- 使用路由, 要将路由中所有回调都 use

- 跨域: 
    1. https://   198.168.1.100    :3000        /home
        协议          域名            端口        路径
    2. 浏览器自带同源策略: 协议, 域名, 端口都必须一致  (为了保障服务端的安全)
    3. cors: 跨域资源共享
    4. 创建 mysql 的配置文件
1. 打造登录接口
 - 路由: /user/login
 - 方法: post
 - 请求体: username, password
 - 响应体: { code: 1, msg: '登录成功', data: { xxx } }

2. 打造注册接口
 - 路由: /user/register
 - 方法: post
 - 请求体: username, password, nickname
 - 响应体: { code: 1, msg: '注册成功', data: { xxx } }

 - 防 sql 注入: username = '%script%alert{username}%/script%'
