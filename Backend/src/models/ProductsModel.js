import mongoose from "mongoose"; // con la libreria moongose, podemos establecer los modelos de las colecciones

// de esta manera creamos los modelos, se les pone su formato, string, number, lo que se necesite

const productsSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // cada modelo de productos debe tener un usuario, entonces
      // con estas propiedades, hacemos que que la coleccion tenga un usuario que las creo, que con este posteriormente
      // podemos hacer unas consultas

      ref: "Users", // aca referimos a Users que es el modelo de los usuarios, de ahi traeriamos la info
      required: true,
    },
  },
  {
    timestamps: true,
    // la fecha en la que fue creado
  }
);

export default mongoose.model("products", productsSchema); // exportamos la coleccion(tabla) con el nombre "products"
