import { Router } from "express"; // importamos router para el manejo de las rutas
import { register, login, logout,  verify } from "../controllers/RegisterController.js"; // importamos los controllers
import { validateSchema } from "../middlewares/ValidateMiddlewaree.js"; // importamos validateSchema que valida los campos
import { registerSchema, loginSchema, } from "../schemas/authSchema.js"; // importamos los schemas de zod para validar

const router = Router()

router.post('/api/register', validateSchema(registerSchema),register) // primero ponemos la ruta a la que se hara la peticion
//, luego ponemos un middleware que es una funcion que se ejecuta antes de pasar a otra
// con validateSchema, le pasamos el schema de zod, asi confirmamos si los datos que se envian son correctos
// luego de pasar ese midleware, para al controller para enviar los datos

router.post('/api/login',validateSchema(loginSchema),login) // aca pasa lo mismo que arriba

router.post("/api/logout",logout) // ruta para deslogearse, osea borrar el token

router.get('/api/verify',verify) // ruta para verificar si estamos autenticados

export default router