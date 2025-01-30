// validaciones de schema, este seria un middleware que validaria el cuerpo de la peticion,
// si por alguna razon el cuerpo no cumple con las propiedades requeridas, entonces dara un error,
// si todo sale bien, entonces pasa a la siguiente funcion en la parte de las rutas

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next(); // continuamos a la siguiente funcion
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) }); // devolvemos un json con los errores
  }
};
