# 移动端适配
rem 相对于页面根字体的大小
例如: 根字体是 10px, 1rem = 10px, 一个容器设置为 10rem 宽 当用户用更大的手机屏幕时, 我们需要将根字体调大

10px        11.04px     37.5px     41.1px 
37.5rem     37.5rem     10rem       10rem
375px       414px       375px       414px

# UI库
react-vant

# css 预处理器
less

# html 标签样式重置
react.

# 项目梳理
- 安装路由 react-router-dom
1. 集中式路由配置
- 将所有的路由配置在一个文件中, 方便管理
- 路由懒加载: 当每个路由组件都用 React.lazy 包裹起来, 这样当用户访问该路由组件时, 才会加载该组件, 而不是一进入页面就加载所有的路由组件(为了提高首页加载速度)

2. 开发登录页面
 - css 样式隔离 xxx.module.less
 - 发登录请求 axios  (XMLHttpRequest, fetch)

 axios.post('/login')