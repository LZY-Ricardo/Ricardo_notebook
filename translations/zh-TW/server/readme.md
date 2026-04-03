# 服務端邏輯分層
1. 路由層: 處理當前端請求不同的路徑時, 執行對應的回應邏輯
2. 控制層: 執行回應邏輯時, 呼叫服務層的方法, 處理業務邏輯
3. 服務層
4. 資料層

# 框架
koa

# 專案梳理
- http請求體, http回應體

- 路由: 處理當前端請求不同的路徑時, 執行對應的回應邏輯

- 使用路由, 要將路由中所有回調都 use

- 跨域: 
    1. https://   198.168.1.100    :3000        /home
        協議          網域            埠口        路徑
    2. 瀏覽器自帶同源策略: 協議, 網域, 埠口都必須一致  (為了保障服務端的安全)
    3. cors: 跨域資源共享
    4. 建立 mysql 的配置檔
1. 打造登入介面
 - 路由: /user/login
 - 方法: post
 - 請求體: username, password
 - 回應體: { code: 1, msg: '登入成功', data: { xxx } }

2. 打造註冊介面
 - 路由: /user/register
 - 方法: post
 - 請求體: username, password, nickname
 - 回應體: { code: 1, msg: '註冊成功', data: { xxx } }

 - 防 sql 注入: username = '%script%alert{username}%/script%'