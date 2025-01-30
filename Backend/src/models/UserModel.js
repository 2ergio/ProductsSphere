import mongoose from "mongoose"; // con la libreria moongose, podemos establecer los modelos(campos) de las colecciones

// de esta manera creamos los modelos, se les pone su formato, string, number, lo que se necesite
const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // unique seria similar a lo que es una llave primaria en sql, solo puede haber
      //  una cuenta con un solo email
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // la fecha en la que fue creado
  }
);

export default mongoose.model("Users", UserModel); // exportamos la coleccion(table) con el nombre "Users"
