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
reset.css

# 路由传参
1. navigate('/home?id=1') useSearchParams() // 获取当前路由的信息
2. navigate('/home/1') 配置路由时声明 path: '/home/:id' useParams() // 获取当前路由的参数
3. navigate('/home/1', {         useLocation()  // 获取当前路由的信息 不会在url中显示参数
    state: {
        id: 1,
    }
   })

# 项目梳理
- 安装路由 react-router-dom
1. 集中式路由配置
- 将所有的路由配置在一个文件中, 方便管理
- 路由懒加载: 当每个路由组件都用 React.lazy 包裹起来, 这样当用户访问该路由组件时, 才会加载该组件, 而不是一进入页面就加载所有的路由组件(为了提高首页加载速度)

2. 开发登录页面
 - css 样式隔离 xxx.module.less
 - 发登录请求 axios  (XMLHttpRequest, fetch)
 axios.post('/login')

3. 因为react-vant Toast 组件不兼容react19, 所以采用了第三方的 react-hot-toast 组件

4. 登录鉴权
 - 当用户未登录, 就访问首页时, 且首页在加载时会向后端发送请求
 - 后端在登录接口中生成一个令牌, 将令牌一起返回给前端, 前端将令牌进行浏览器本地保存
 - 前端必须在后续所有的请求中都必须携带该令牌供后端校验, 如果后端校验不通过, 则返回 401 状态码, 前端收到 401 状态码后, 就知道用户未登录, 就跳转到登录页面

 - 以上功能实现了鉴权, 但是token在规定时间后会过期, 过期后就需要重新登录, 体验很差。 实现一个无感刷新 token 的效果
 - 后端在登录接口返回一个 长token 和 一个 短token, 短token 用来做权限的校验, 长token 用来在 短token 失效后重新获取 新的短token 和 新的长token替代长token

5. 首页 noteClass 

6. 列表页  noteList
 - 手动封装下拉刷新操作, 下拉组件中监听手指的 touch 事件, 根据手指在 Y 轴的移动距离来控制容器向下平移的距离, 从而展示出头部的 下拉刷新 字样。 放开手指后, 帮父组件触发重新请求的函数