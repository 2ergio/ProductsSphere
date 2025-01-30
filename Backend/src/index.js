// Proyecto ProductSphere, ejercicio de practica

/* Este es el archivo principal del backend en donde iniciamos el servidor
y le damos uso a diferentes librerias que nos ayudan con este proyecto
*/
import express from "express";

import "dotenv/config"; // importamos el archivo .env que tiene las variables de entorno en donde guardamos la base de datos y la palabra secreta del token

import cors from "cors"; // esto serviria para manejar las peticiones en diferentes puertos

import morgan from "morgan"; // con morgan observamos las peticiones en la consola

import cookieParser from "cookie-parser"; // con esta podemos acceder a las cookies facilmente, que es en donde se guardara el token de autenticacion

import RegisterRoutes from "./routes/RegisterRoutes.js"; // importamos las rutas para poder hacer las peticiones(usuario)

import { Connect } from "./db.js"; // importamos la funcion con la que se conecta la base de datos

import productsRoute from "./routes/productsRoute.js"; // importamos las rutas para poder hacer las peticiones(productos)

const app = express(); // usamos express

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // usamos cors

app.use(morgan("dev")); // usamos morgan

app.use(express.json()); //para  procesar datos en formato JSON enviados en el cuerpo de una petición.

app.use(cookieParser()); // usamos cookieParser para acceder a las cookies

app.use(RegisterRoutes); // usamos las rutas necesarias para poder realizar las peticiones
app.use(productsRoute);
Connect();

app.listen(3000); // iniciamos el servidor
console.log("Server en", 3000);
