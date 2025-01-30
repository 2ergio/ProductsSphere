import axios from "./axios";  // importamos la libreria axios para poder hacer peticiones al servidor,
// aca importmos axios desde una ruta porque ahi axios tiene otra configuracion

export const getProducts = () => axios.get('/products') // ruta para obtener todos los productos
export const createProduct = (product) => axios.post('/products',product); // ruta para crear un producto, recibe un parametro
export const updateProduct = (id,product) => axios.put(`/products/${id}`,product) // ruta para actualizar, recibe dos parametros
export const deleteProduct = (id) => axios.delete(`/products/${id}`) // ruta para eliminar, recibe un parametro