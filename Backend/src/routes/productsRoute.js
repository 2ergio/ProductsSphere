import { Router } from "express"; // importamos router para el manejo de las rutas
import { auth } from "../middlewares/ValidateToken.js"; // importamos auth para verificar si estamos autenticados
// para poder realizar la peticion
import { getProducts, createProducts, deleteProduct, updateProduct } from "../controllers/productsController.js"; //
// importamos los controladores para hacer las peticiones

import { CreateProduct } from "../schemas/productsSchema.js"; // importamos el schema de zod para validar los campos

import { validateSchema } from "../middlewares/ValidateMiddlewaree.js"; // importamos validateSchema
// para validr que los campos del cuerpo de la peticion sean los que se piden

const router = Router()

router.get('/api/products', auth,getProducts) // ruta para obtener productos, primero se valida si el token es valido
// luego, sigue al controlador para obtener los productos

router.post('/api/products', auth, validateSchema(CreateProduct), createProducts) // ruta para crear productos, primero
// se valida el token, luego si los campos cumplen el esquema, y finalmente pasa al controlador

router.delete('/api/products/:id', auth, deleteProduct)// ruta para eliminar productos, primero validamos el token
// luego eliminamos con el controlador, aca ya se requiere una id del producto para eliminar, eso lo vemos en el cliente

router.put('/api/products/:id', auth, updateProduct)// ruta para actualzar productos, primero validamos el token
// luego actualizamos con el controlador, aca ya se requiere una id del producto para actualzar, eso lo vemos en el cliente


export default router