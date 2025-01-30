import jwt from "jsonwebtoken"; // importamos la libreria jsonwebtoken para la autenticacion

// a continuacion mostramos la funcion que validaria los tokens, este es un middlware que verifica si el token
// del usuario es valido, ya que con este se pueden hacer las peticiones,
// si el token no es valido o el usuario no tiene token, entonces devuelve un error, si es valido, sigue a la
// siguiente funcion

export const auth = (req, res, next) => {
  const { token } = req.cookies; // accedemos al token por medio de las cookies

  if (!token) return res.status(401).json({ message: "No tienes token" }); // no hay token, devuelve json con el error
  console.log(token);

  // aca continuamos y verificamos si las propiedades del token cumplen con la palabra secreta que tenemos
  // en el archivo .env, si cumplen significa que el token es valido y cumple las condiciones

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "token invalido" }); // devuelve json diciendo que el token no es valido

    req.decoded = decoded; //  Si el token es válido, guardamos la información decodificada en la petición el token
    next(); // continuamos a la siguiente funcion
  });
};
