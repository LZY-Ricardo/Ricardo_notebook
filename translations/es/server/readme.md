# Capa de lógica del lado del servidor
1. Capa de enrutamiento: procesar diferentes rutas de la solicitud del cliente y ejecutar la lógica de respuesta correspondiente  
2. Capa de control: al ejecutar la lógica de respuesta, llamar a los métodos de la capa de servicio y manejar la lógica de negocio  
3. Capa de servicio  
4. Capa de datos  

# Framework
koa  

# Revisión del proyecto
- Cuerpo de la solicitud HTTP, cuerpo de la respuesta HTTP  

- Enrutamiento: procesar diferentes rutas de la solicitud del cliente y ejecutar la lógica de respuesta correspondiente  

- Al usar enrutamiento, es necesario registrar **todos** los callbacks del enrutador con `use`  

- CORS (Cross-Origin Resource Sharing):  
    1. https://   198.168.1.100    :3000        /home  
        Protocolo          Dominio            Puerto        Ruta  
    2. Política de mismo origen del navegador: protocolo, dominio y puerto deben coincidir (para garantizar la seguridad del servidor)  
    3. cors: Compartir recursos entre orígenes  
    4. Crear archivo de configuración de MySQL  

1. Implementar endpoint de inicio de sesión  
   - Ruta: `/user/login`  
   - Método: `post`  
   - Cuerpo de la solicitud: `username`, `password`  
   - Cuerpo de la respuesta: `{ code: 1, msg: '登录成功', data: { xxx } }`  

2. Implementar endpoint de registro  
   - Ruta: `/user/register`  
   - Método: `post`  
   - Cuerpo de la solicitud: `username`, `password`, `nickname`  
   - Cuerpo de la respuesta: `{ code: 1, msg: '注册成功', data: { xxx } }`  

   - Protección contra inyección SQL: `username = '%script%alert{username}%/script%'