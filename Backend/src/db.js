import mongoose from "mongoose"; // importamos la libreria moongose para manejar la base de datos en mongodb

import "dotenv/config"; // importamos el archivo .env que tiene una variable que contiene la conexion con la base de datos

const database = process.env.DATABASEURL; // guardamos la base de datos en una constante

export const Connect = async () => {
  // conectamos la base de datos, si hay un error, lo captura y lo muestra en consola
  try {
    await mongoose.connect(database);
    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};
