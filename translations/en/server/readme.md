# Server-side Logic Layers
1. Routing layer: Handles different paths of client requests, executing the corresponding response logic.  
2. Controller layer: When executing response logic, calls service layer methods to handle business logic.  
3. Service layer  
4. Data layer  

# Framework
koa  

# Project Overview
- HTTP request body, HTTP response body  

- Routing: Handles different paths of client requests, executing the corresponding response logic  

- When using routing, you need to `use` all callbacks in the router  

- Cross-Origin:  
    1. `https://   198.168.1.100    :3000        /home`  
        Protocol Domain Port Path  
    2. Browser's same‑origin policy: protocol, domain, and port must be identical (to ensure server security)  
    3. **cors**: Cross‑Origin Resource Sharing  
    4. Create a MySQL configuration file  

1. Build login endpoint  
   - Route: `/user/login`  
   - Method: `post`  
   - Request body: `username`, `password`  
   - Response body: `{ code: 1, msg: 'Login successful', data: { xxx } }`  

2. Build registration endpoint  
   - Route: `/user/register`  
   - Method: `post`  
   - Request body: `username`, `password`, `nickname`  
   - Response body: `{ code: 1, msg: 'Registration successful', data: { xxx } }`  

   - Prevent SQL injection: `username = '%script%alert{username}%/script%'`