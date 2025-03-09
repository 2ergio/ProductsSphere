# Products Sphere 

## CRUD para gestionar productos

### Nodejs || React || MongoDB

# Funcionalidades
Login,  Registro,  Agregar Productos,  Ver Productos,  Actualizar Productos,  Eliminar Productos.


# Paquetes utilizadas
## Backend
-express

-zod

-bcryptjs

-jsonwebtoken

-mongoose

-dotenv

-cookie-parser

-cors

-morgan

# Frontend
- axios

- bootstrap

- bootstrap-icons

- js-cookie

- react-bootstrap

- react-hook-form

- react-router-dom

  
# Guía de instalación

## Requisitos previos

Antes de comenzar con la instalación, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Para ejecutar el backend y el frontend.
- **MongoDB**: Para gestionar la base de datos.
- **Git**: Para clonar el repositorio.

**Nota:**
Asegurate de tener MongoDB corriendo en local o en la nube




- **Clona el repositorio**

    ```bash
    git clone https://github.com/2ergio/ProductsSphere
    ```
    

### Backend

1. **Instala las dependencias del backend:**

    Abre una terminal y Entra a la carpeta del backend e instala las dependencias:

    ```bash
    cd Backend
    npm install
    ```

2. **Crea el archivo `.env`:**

    Dentro de la carpeta del backend, crea un archivo `.env` con la siguiente estructura:

    ```plaintext
    MONGO_URI=<tu_conexion_mongodb> 
    TOKEN_SECRET=<tu_clave_secreta>
    ```

    - Reemplaza `<tu_conexion_mongodb>` con la URI de tu base de datos en MongoDB.
    - Reemplaza `<tu_clave_secreta>` con una clave secreta que utilizarás para la autenticación (puedes generar una al azar).

3. **Inicia el servidor:**

    Una vez configurado el archivo `.env`, corre el siguiente comando para iniciar el servidor:

    ```bash
    npm run dev
    ```

    El servidor de backend debería iniciarse en el puerto predeterminado (3000), puede ser modificado en el index.js.

---

### Frontend

1. **Instala las dependencias del frontend:**

    Abre otra terminal y entra a la carpeta del frontend e instala las dependencias:

    ```bash
    cd Frontend
    npm install
    ```

2. **Inicia la aplicación frontend:**

    Una vez que las dependencias estén instaladas, corre el siguiente comando para iniciar el servidor de desarrollo de React:

    ```bash
    npm run dev
    ```

    La aplicación frontend debería abrirse automáticamente en tu navegador en el puerto 3000 o el puerto configurado.

---

## Notas importantes

- Asegúrate de tener configurado MongoDB si es una base de datos local o un servicio en la nube (como MongoDB Atlas).
- El backend y el frontend deben correr en puertos diferentes, por lo que revisa que no haya conflictos.


