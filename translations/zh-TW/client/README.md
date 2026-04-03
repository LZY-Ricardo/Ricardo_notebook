# 移動端適配
rem 相對於頁面根字體的大小  
例如: 根字體是 10px, 1rem = 10px, 一個容器設定為 10rem 寬 當使用者用更大的手機螢幕時, 我們需要將根字體調大  

10px        11.04px     37.5px     41.1px  
37.5rem     37.5rem     10rem       10rem  
375px       414px       375px       414px  

# UI庫
react-vant

# css 預處理器
less

# html 標籤樣式重置
reset.css

# 路由傳參
1. navigate('/home?id=1') useSearchParams() // 取得當前路由的資訊  
2. navigate('/home/1') 配置路由時聲明 path: '/home/:id' useParams() // 取得當前路由的參數  
3. navigate('/home/1', {         useLocation()  // 取得當前路由的資訊 不會在url中顯示參數
    state: {
        id: 1,
    }
   })

# 專案梳理
- 安裝路由 react-router-dom
1. 集中式路由配置
- 將所有的路由配置在一個檔案中, 方便管理
- 路由懶載入: 當每個路由元件都使用 React.lazy 包裹起來, 這樣當使用者訪問該路由元件時, 才會載入該元件, 而不是一進入頁面就載入所有的路由元件(為了提高首頁載入速度)

2. 開發登入頁面
 - css 樣式隔離 xxx.module.less
 - 發送登入請求 axios  (XMLHttpRequest, fetch) axios.post('/login')

3. 因為 react-vant Toast 元件不相容 react19, 所以採用了第三方的 react-hot-toast 元件

4. 登入鑑權
 - 當使用者未登入, 就訪問首頁時, 且首頁在載入時會向後端發送請求
 - 後端在登入介面中產生一個令牌, 將令牌一起回傳給前端, 前端將令牌儲存在瀏覽器本地
 - 前端必須在後續所有的請求中都攜帶該令牌供後端驗證, 若後端驗證不通過, 則回傳 401 狀態碼, 前端收到 401 狀態碼後, 就知道使用者未登入, 便跳轉到登入頁面
 - 以上功能實現了鑑權, 但是 token 在規定時間後會過期, 過期後就需要重新登入, 體驗很差。 實作一個無感刷新 token 的效果
 - 後端在登入介面回傳一個 長 token 與一個 短 token, 短 token 用來做權限的驗證, 長 token 用於在 短 token 失效後重新取得新的短 token 與新的長 token 以取代長 token

5. 首頁 noteClass 

6. 列表頁  noteList
 - 手動封裝下拉刷新操作, 下拉元件中監聽手指的 touch 事件, 根據手指在 Y 軸的移動距離來控制容器向下平移的距離, 從而展示出頭部的 下拉刷新 字樣。 放開手指後, 幫父元件觸發重新請求的函式