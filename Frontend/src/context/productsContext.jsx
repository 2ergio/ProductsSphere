import { createContext, useContext, useState } from "react"; // importamos diferentes hooks de react
import {createProduct, getProducts, deleteProduct, updateProduct} from '../api/product' // importamos las rutas para crear, actualizar, y eliminar producto

const ProductContext = createContext();// creamos un contexto, un contexto
// es como una forma de compartir datos entre varios componentes sin tener que pasarlos uno por uno.

// Este hook permite usar el contexto de autenticación
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("error");  // Si no hay contexto, muestra un error
  }
  // Devuelve el contexto para usarlo en otros componentes
  return context;
};

// creamos esta funcion en donde incluimos las diferentes peticiones y funciones para pasarlas a los componentes

export const ProductsProvider = ({ children }) => {
    const [products, setproduct] = useState([]) // estado para manejar los productos que trae el servidor

    // Funcion para crear productos, esta recibiria un parametro que seria el producto que enviamos
    // desde la otra pagina
    const CreateProduct =  async (product)  =>{
       try{
       const res = await createProduct(product) // creamos el producto haciendo la peticion a la ruta
       console.log(res)
       }catch(error){
        console.log(error)
       }
    }
    // obtener productos, aca obtenemos todos los productos
    const GetProducts = async () =>{
        try{
            const res = await getProducts(); // obtenemos los productos haciendo la peticion a la ruta
            setproduct(res.data)
            console.log(res)

        }catch(error){
            console.log(error)

        }

    }
    
    // funcion para borrar productos, esta recibe un parametro id, que lo sacamos en la pagina
    // main dandole click al producto retornado en una fila de una tabla
    const deleteProducts = async (id) =>{
      try {
        const res = await deleteProduct(id); // aca pasamos la id haciendo la peticion a la ruta
      console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }

    // funcion para actualizar productos, esta recibe dos parametros id y producto o los values, la id y los values los sacamos
    // main dandole click al producto retornado en una fila de una tabla
    const editProduct = async (id, product) =>{
      try {
        const res = await updateProduct(id, product)
      } catch (error) {
        
      }

    }
  return <ProductContext.Provider 
  value={{ // pasamos las siguientes funciones y estados para utilizarlos en otras partes de la aplicacion
    CreateProduct,
    GetProducts,
    deleteProducts,
    setproduct,
    products,
    editProduct
}}
>{children}</ProductContext.Provider>;
};
