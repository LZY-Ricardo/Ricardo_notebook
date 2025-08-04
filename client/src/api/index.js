import axios from 'axios'
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'http://120.55.48.68:3000'// 120.55.48.68
// 告诉浏览器，如果发送的是 post请求，那么后端一定会返回 json 格式的数据，让浏览器以解析 json 的方式来解析响应提体
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器 -- 所有的请求都会被这个函数拦截下来
axios.interceptors.request.use(request => {
  // 从 localStorage 中获取 token
  const token = localStorage.getItem('access_token')
  // 如果 token 存在，那么就将 token 放在请求头中
  if (token) {
    request.headers.Authorization = token
  }
  return request // 放行请求
})

// 响应拦截器
axios.interceptors.response.use(
  (response) => { // http 的状态码为 200 时才走进第一个回调
    if (response.status === 200) {
      if (response.data.code !== '1') { // 逻辑性错误
        toast.error(response.data.msg);
        return Promise.reject(response)
      }
      return Promise.resolve(response.data)
    }
  },
  (res) => { // 状态码不为 2xx
    if (res.response.status === 401) {
      // toast.error(res.response.data.msg);
      // // 跳转到登录页
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);

      const originalRequest = res.config

      // 重新请求新的短 token 和 长token
      const refresh_token = localStorage.getItem('refresh_token')
      if (refresh_token) {
        axios.post('./user/refresh', {
          refresh_token: refresh_token
        }).then(res => {
          if (res.code === '1') {
            // 刷新成功
            localStorage.setItem('access_token', res.access_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            // 将之前没有发送成功的请求再次成功发送
            // 更新原始请求的 Authorization 头
            originalRequest.headers.Authorization = res.access_token
            // 重新发送原始请求
            return axios(originalRequest)
          }
          return Promise.reject(res)
        })
      } else {
        toast.error('请先登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    }
    if (res.response.status === 416) { // 长 token 也过期了
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      toast.error(res.response.data.msg);
      // 跳转到登录页
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }
)



export default axios