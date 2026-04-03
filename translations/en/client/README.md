# Mobile Adaptation
rem is relative to the root font size of the page.  
For example: if the root font size is 10px, then 1rem = 10px. A container set to 10rem width will need the root font size to be increased when users use larger phone screens.

```
10px        11.04px     37.5px     41.1px 
37.5rem     37.5rem     10rem       10rem
375px       414px       375px       414px
```

# UI Library
react-vant

# CSS Preprocessor
Less

# HTML Tag Style Reset
reset.css

# Routing Parameters
1. `navigate('/home?id=1')` `useSearchParams()` // Get current route information  
2. `navigate('/home/1')` (declare route with `path: '/home/:id'`) `useParams()` // Get current route parameters  
3. 
```js
navigate('/home/1', {
    state: {
        id: 1,
    }
})
```
`useLocation()` // Get current route information; parameters won’t appear in the URL

# Project Overview
- Install routing: `react-router-dom`

1. **Centralized routing configuration**
   - Put all route definitions in a single file for easy management.
   - **Route lazy loading**: wrap each route component with `React.lazy` so that the component loads only when the user navigates to it, instead of loading all route components on page entry (to improve the home page load speed).

2. **Develop the login page**
   - CSS style isolation: `xxx.module.less`
   - Send login request with `axios` (or `XMLHttpRequest`, `fetch`):  
     ```js
     axios.post('/login')
     ```

3. Because `react-vant`'s Toast component is not compatible with React 19, we use the third‑party `react-hot-toast` component.

4. **Login authentication**
   - When an unauthenticated user accesses the home page, the home page will send a request to the backend during loading.
   - The backend generates a token at the login endpoint and returns it to the client, which stores the token locally in the browser.
   - The front‑end must include this token in all subsequent requests for backend verification. If verification fails, the backend returns a `401` status code; upon receiving `401`, the client knows the user is not logged in and redirects to the login page.
   - The above implements authentication, but the token expires after a set period, requiring the user to log in again, which is a poor experience. Implement a seamless token refresh.
   - The backend returns a long‑lived token and a short‑lived token at login. The short token is used for permission checks, while the long token is used to obtain a new short token (and a new long token) when the short token expires.

5. Home page `noteClass`

6. List page `noteList`
   - Manually encapsulate pull‑to‑refresh: the pull component listens for touch events; based on the finger’s movement along the Y‑axis, it controls the container’s downward translation to reveal the “pull to refresh” header. When the finger is released, it triggers a function in the parent component to re‑