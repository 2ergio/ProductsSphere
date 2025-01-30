// esto seria un controlador, en donde estan las funciones requeridas para poder hacer las peticiones al sistema

import Users from "../models/UserModel.js"; // importamos la coleccion Users

import bcrypt from "bcryptjs"; // importamos esta libreria para encriptar las contraseñas

import jwt from "jsonwebtoken"; // importamos jsonwebtoken para la autenticacion y tokens

// controller de registro: con esta funcion podemosos registrarnos al sistema
// en esta funcion tambien encontramos algunas validaciones, si todo sale bien, la funcion nos dara
// un token con el que nos podemos autenticar y poder realizar las peticiones que lo requieren

export const register = async (req, res) => {
  const { email, password, username } = req.body; // estos 3 parametros, deben ser el cuerpo de la peticion

  // si al momento de la peticion todo sale bien:
  try {

    //  buscamos en la coleccion Users, un usuario que tiene el email que pusimos en
    // el cuerpo de la peticion, si userFind es true, osea encontro un usuario con ese mismo email,
    // entonces retornamos
    // un error, un json diciendo que el email ya esta en uso
    const UserFind = await Users.findOne({ email });

    if (UserFind)
      return res.status(400).json({ message: ["el email ya esta en uso"] });

    // si no encontro email, entonces encriptamos la contraseña

    const passwordcrypt = await bcrypt.hash(password, 10);

  // creamos el objeto de nuevo usuario, con los campos de el cuerpo de la peticion
  //ademas decimos que la contraseña, es la contraseña encriptada
    const newUser = new Users({
      username,
      email,
      password: passwordcrypt,
    });

    // esta constante, guardaria los datos que declaramos arriba en la coleccion de mongodb
    const UserSaved = await newUser.save();

    // se procede a generar el token que contendria la informacion de userSaved
    jwt.sign(
      { id: UserSaved._id }, // aca solo enviamos el id del usuario
      process.env.TOKEN, // firmamos el token con la palabra secreta que esta en .env
      {
        expiresIn: "1d", // el token expiraria en un dia
      },
      // verificamos si hay errires, si todo sale bien, envia el token a las cookies
      (error, token) => {
        if (error) console.log(error);
        else {
          res.cookie("token", token);
        }
        // enviamos un json al cliente con los datos del usuario,
        res.json({
          id: UserSaved._id,
          username: UserSaved.username,
          email: UserSaved.email,
        });
      }
    );
    console.log(req.body);
  } catch (error) {
    // si hay errores, devolvemos el json con los errores
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
// controller de login: esta funcion tambien nos generaria un token, pero antes de eso
// pasara por una serie de procesos que validan si el usuario esta registrado o se encuentra en 
// la base de datos, tambien validaria su contraseña, si todo esto es correcto
// entonces el usuario podra tener su token y podra realizar otras peticiones

export const login = async (req, res) => {
  const { email, password } = req.body; // estos 2 parametros, deben ser el cuerpo de la peticion

  // si todo sale bien:
  try {
    const userFound = await Users.findOne({ email }); // aca buscamos la informacion del usuario por medio 
    // del email
    

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" }); // si no se encontro, devolvemos el error

    // aca mirariamos si la contraseña ingresada en el cuerpo coincide con la que encontramos
    // en la base de datos por medio del email, todo esto con la libreria bcrypt
    const ismatch = await bcrypt.compare(password, userFound.password);

    // si no coinciden devuelve el error
    if (!ismatch)
      return res.status(400).json({ message: "Contraseña Incorrecta" });
    
    // si todo salio bien,  entonces creamos el token
    jwt.sign(
      { id: userFound._id }, // aca solo enviamos el id del usuario
      process.env.TOKEN, // firmamos el token con la palabra secreta que esta en .env
      {
        expiresIn: "1d", // el token expiraria en un dia
      },
      (error, token) => { // verificamos si hay errires, si todo sale bien, envia el token a las cookies
        if (error) console.log(error);

        res.cookie("token", token);
        
        // enviamos un json con los datos del usuario al cliente
        res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    );
    console.log(req.body);
    // si hay errores, devolvemos el json con los errores
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

// esta funcion lo que hace es quitar el contenido de las cookies, es decir
// que nos quitaria el token, y sin el token basicamente no podriamos hacer las otras peticiones 
// de los productos
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  // retornamos un status200
  return res.sendStatus(200);
};

// La función verify se encarga de verificar que el usuario esté autenticado
// y de devolver los datos del usuario si el token es válido.

export const verify = async (req, res) => {

  //Se extrae el token de las cookies que es el token
  const { token } = req.cookies;

  // si no tiene token retorna un mensaje con el error
  if (!token) return res.status(401).json({ message: "no estas autorizado" });

  // aca validamos y comparamos el token con la palabra secreta del archivo .env
  jwt.verify(token, process.env.TOKEN, async (err, user) => {

    // si el token no  es valido retornamos el error de que no estamos autorizados
    if (err) return res.status(401).json({ message: "no estas autorizado" });

    // buscamos el usuario por medio de su id
    const userFound = await Users.findById(user.id);

    // si no lo encontramos retornamos el error
    if (!userFound)
      return res.status(401).json({ message: "no estas autorizado" });

    // si todo sale bien devolvemos un json al cliente con la informacion del usuario
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
