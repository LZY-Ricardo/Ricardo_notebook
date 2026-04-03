# Server-side Logic Layers
1. Routing layer: handle different request paths from the client, executing corresponding response logic
2. Controller layer: when executing response logic, call methods from the service layer to handle business logic
3. Service layer
4. Data layer

# Framework
koa

# Project Overview
- HTTP request body, HTTP response body

- Routing: handle different request paths from the client, executing corresponding response logic

- When using routes, all callbacks in the router should be applied with `use`

- Cross-origin:
    1. https://   198.168.1.100    :3000        /home  
       Protocol   Domain            Port        Path
    2. Browser's built-in same-origin policy: protocol, domain, and port must all match (to ensure server security)
    3. cors: Cross-Origin Resource Sharing
    4. Create MySQL configuration file

1. Build login API  
   - Route: /user/login  
   - Method: POST  
   - Request body: username, password  
   - Response body: `{ code: 1, msg: 'Login successful', data: { xxx } }`

2. Build registration API  
   - Route: /user/register  
   - Method: POST  
   - Request body: username, password, nickname  
   - Response body: `{ code: 1, msg: 'Registration successful', data: { xxx } }`

- Prevent SQL injection: `username = '%script%alert{username}%/script%'`