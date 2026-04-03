# Mobile Adaptation
rem is relative to the page's root font size  
For example: root font is 10px, 1rem = 10px, a container is set to a width of 10rem. When the user uses a larger phone screen, we need to increase the root font size.

```
10px        11.04px     37.5px     41.1px 
37.5rem     37.5rem     10rem       10rem
375px       414px       375px       414px
```

# UI Library
react-vant

# CSS Preprocessor
less

# HTML Tag Style Reset
reset.css

# Route Parameter Passing
1. `navigate('/home?id=1')` `useSearchParams()` // Get the current route information  
2. `navigate('/home/1')` – declare `path: '/home/:id'` in route configuration `useParams()` // Get the current route parameters  
3. `navigate('/home/1', { state: { id: 1 } })` `useLocation()` // Get the current route information; parameters are not shown in the URL

# Project Overview
- Install routing library `react-router-dom`

1. Centralized route configuration  
   - Place all route definitions in a single file for easy management.  
   - Route lazy loading: wrap each route component with `React.lazy`. This loads the component only when the user navigates to that route, rather than loading all route components on page entry (to improve home page load speed).

2. Develop login page  
   - CSS style isolation `xxx.module.less`  
   - Send login request with axios (XMLHttpRequest, fetch)  
     ```js
     axios.post('/login')
     ```

3. Because `react-vant` Toast component is not compatible with React 19, we use the third‑party `react-hot-toast` component.

4. Login authentication  
   - When a user is not logged in and accesses the home page, the home page will send a request to the backend during loading.  
   - The backend generates a token in the login API, returns it to the frontend, which stores it locally in the browser.  
   - The frontend must include this token in all subsequent requests for backend validation. If validation fails, the backend returns a **401** status code; upon receiving **401**, the frontend knows the user is not logged in and redirects to the login page.  

   - The above implements authentication, but the token expires after a set period, requiring the user to log in again, which yields a poor experience. Implement a seamless token refresh.  
   - The backend returns a long token and a short token in the login API. The short token is used for permission validation, while the long token is used to obtain a new short token and a new long token after the short token expires, replacing the old long token.

5. Home page `noteClass`

6. List page `noteList`  
   - Manually encapsulate pull‑to‑refresh behavior: the pull component listens to touch events, using the finger's Y‑axis movement to control the container's downward translation, revealing the “pull to refresh” text at the top. When the finger is released, it triggers the parent component's function to re‑request data.