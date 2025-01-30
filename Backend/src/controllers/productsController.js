// esto seria un controlador, en donde estan las funciones requeridas para poder hacer las peticiones al sistema

import products from "../models/ProductsModel.js"; // importamos la coleccion products

// esta funcion permite acceder a todos los productos que tenga el usuario
// si se recuerda, para cada producto se almacena un usuario, entonces con esta peticion
// accedemos a los productos que tengan ese usuario,
export const getProducts = async (req, res) => {
  try {
    const Getproducts = await products
      .find({
        user: req.decoded.id, // buscamos los productos que esten asociados a la id del decoded que pasamos desde el
        // middleware
      })
      .populate("user"); // aca tambien unimos la informacion del usuario, y hace referencia a los campos que hicimos en el productmodel

    res.json(Getproducts); // enviamos un json con el producto y tambien con la info del usuario que lo creo
  } catch (error) {
    console.log(error); // si hay errores los pone en consola
  }
};

// esta funcion permite crear productos
export const createProducts = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, cantidad } = req.body; // declaramos las constantes que son el cuerpo 
    // de la peticion
    console.log(req.decoded.id, "este es la id"); // req.decoded seria el payload del token, osea la id, que le asi
    //asignamos cuando creamos el token

    // creamos un nuevo producto con los campos necesarios, como necesitamos un usuario para cada producto
    // entonces lo incluimos con req.decoded.id
    const NewProduct = new products({
      nombre,
      descripcion,
      precio,
      categoria,
      cantidad,
      user: req.decoded.id,
    });

    const Product = await NewProduct.save(); // aca guardamos el producto en la base de datos

    res.json(Product); // y aca enviamos un json al cliente con todos sus productos

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "hubo un error" }); // si hay error, lo mostramos en consola
    // y enviamos un json con el error
  }
};

// funcion para eliminar productos
export const deleteProduct = async (req, res) => {
  const product = await products.findByIdAndDelete(req.params.id); // accedemos al producto mediante su id (en el cliente lo hacemos distinto)
  // si no hay producto, retornamos el error
  if (!product)
  return res.status(404).json({ message: "producto no encontrado" });

  // finalmente si se pudo borrar, no devolvemos nada
  return res.sendStatus(204);
};

// funcion para actualizar productos
export const updateProduct = async (req, res) => {
  try {
    const product = await products.findByIdAndUpdate(req.params.id, req.body, { // buscamos el producto por su id
        // pasamos dos parametros, la id, y el cuerpo de la peticion
      new: true,
    });
    // si no hay producto retornamos el error
    if (!product)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(product);
  } catch (error) {
    console.log(error); // si hay error lo mostramos en consola
  }
};
