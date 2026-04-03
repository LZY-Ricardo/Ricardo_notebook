# Adaptación para dispositivos móviles
rem está relativo al tamaño de la fuente raíz de la página  
Por ejemplo: la fuente raíz es 10px, 1rem = 10px, un contenedor se establece con un ancho de 10rem. Cuando el usuario usa una pantalla de móvil más grande, necesitamos aumentar la fuente raíz.

10px        11.04px     37.5px     41.1px  
37.5rem     37.5rem     10rem       10rem  
375px       414px       375px       414px  

# Biblioteca UI
react-vant

# Preprocesador CSS
less

# Reset de estilos de etiquetas HTML
reset.css

# Paso de parámetros en rutas
1. `navigate('/home?id=1') useSearchParams()` // Obtener la información de la ruta actual  
2. `navigate('/home/1')` Declarar `path: '/home/:id'` al configurar la ruta `useParams()` // Obtener los parámetros de la ruta actual  
3. ```javascript
   navigate('/home/1', {
       // Obtener la información de la ruta actual, los parámetros no se muestran en la URL
       useLocation()
       state: {
           id: 1,
       }
   })
   ```

# Organización del proyecto
- Instalar enrutamiento `react-router-dom`

1. Configuración de enrutamiento centralizado
   - Colocar todas las configuraciones de rutas en un solo archivo para facilitar la gestión
   - Carga perezosa de rutas: envolver cada componente de ruta con `React.lazy`, de manera que el componente solo se cargue cuando el usuario lo visita, en lugar de cargar todos al iniciar la página (para mejorar la velocidad de carga de la página principal)

2. Desarrollar la página de inicio de sesión
   - Aislamiento de estilos CSS `xxx.module.less`
   - Enviar solicitud de inicio de sesión con **axios** (XMLHttpRequest, fetch)  
     ```javascript
     axios.post('/login')
     ```

3. Como el componente Toast de **react-vant** no es compatible con React 19, se utilizó el componente de terceros **react-hot-toast**

4. Autenticación de inicio de sesión
   - Cuando el usuario no ha iniciado sesión y accede a la página principal, ésta envía una solicitud al backend al cargar.
   - El backend genera un token en la interfaz de inicio de sesión y lo devuelve al frontend, que lo guarda localmente en el navegador.
   - El frontend debe incluir este token en todas las solicitudes posteriores para que el backend lo valide; si la validación falla, se devuelve el código de estado **401**. Al recibir **401**, el frontend reconoce que el usuario no está autenticado y redirige a la página de inicio de sesión.
   - Estas funcionalidades implementan la autenticación, pero el token expira después de un tiempo, lo que obliga al usuario a volver a iniciar sesión, ofreciendo una mala experiencia. Se busca implementar una renovación de token sin interrupciones.
   - El backend devuelve en la interfaz de inicio de sesión un token largo y un token corto; el token corto se usa para la validación de permisos, mientras que el token largo se utiliza para obtener nuevos token cortos y largos cuando el token corto expira, reemplazando al token largo.

5. Página principal `noteClass`

6. Página de lista `noteList`
   - Implementar manualmente la operación de *pull-to-refresh*, escuchando el evento **touch** del dedo en el componente de desplazamiento; según la distancia de movimiento en el eje **Y**, se controla la traslación vertical del contenedor para mostrar el texto de “pull-to-refresh” en la cabecera. Al liberar el dedo, se desencadena una función en el componente padre para volver a solicitar datos.