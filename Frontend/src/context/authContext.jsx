import { useState, createContext, useContext, useEffect } from "react"; // importamos diferentes hooks de react

import { Register, Login, Logout } from "../api/auth"; // importamos las rutas para registrarse y logearse

import Cookies from "js-cookie"; // importamos la libreria cookies para leer las cookies

import { verifyToken } from "../api/auth"; // importamos la ruta verifytoken para validar si estamos autenticados desde el cliente

export const AuthContext = createContext(); // creamos un contexto, un contexto
// es como una forma de compartir datos entre varios componentes sin tener que pasarlos uno por uno.

// Este hook permite usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Si no hay contexto, muestra un error
  if (!context) {
    throw new Error("error");
  }

  // Devuelve el contexto para usarlo en otros componentes
  return context;
};

// creamos esta funcion en donde incluimos las diferentes peticiones y funciones para pasarlas a los componentes

export const AuthProvider = ({ children }) => {
  const [error, seterror] = useState(""); // estado que maneja los errores para mostrarle al cliente

  const [user, setUser] = useState(null); // estado que maneja el usuario que este autenticado

  const [Autenticado, setAutenticado] = useState(false); // estado que verifica si el usuario esta autenticado o no
  // esto le permite al usuario realizar acciones si esta autenticado, de lo contrario realizara otra accion

  const [loading, setLoading] = useState(true); // estado Se usa para mostrar un indicador de carga mientras se obtiene o procesa información.
  // empieza en true indicando que al principio esta esperando que llegue la informacion

  // funcion para iniciar sesion, esta funcion la llamamos en la pagina de registro 
  // y basicamente con esta realizamos la peticion al servidor

  const signup = async (user) => { // esperamos el parametro de usuario que se envia desde el formulario
    try {
      const datos = await Register(user); // aca enviamos los datos
      //console.log(datos.data); // los mostramos en consola

      setUser(datos); // los metemos a al estado user para poderlo manejar en otras partes de la aplicacion

      setAutenticado(true); // como el proceso fue exitoso, entonces ponemos el estado en true, indicando
      // que el usuario ya puede acceder a las rutas protegidas

    } catch (error) { // si hay un error lo capturamos y lo imprimimos
      seterror(error.response.data.message); // aca guardamos el error en un estado para mostrarlo 
      // en la pagina de registro, indicandole al cliente cual fue el error
      console.log(error);
    }
  };

  // con esta funcion cerramos sesion
  const cerrarSesion = () => { 
    Logout() // ejecutamos la ruta para borrar la cookie
    
    setAutenticado(false); // como no hay token, entonces ya no es autenticado
    setUser(null); // si no hay token, entonces no hay datos
  };

  // funcion para iniciar sesion, esta funcion la llamamos en la pagina de login 
  // y basicamente con esta realizamos la peticion al servidor
  const SignIn = async (user) => { // esperamos el parametro de usuario que se envia desde el formulario
    try {
      const datos = await Login(user); // aca enviamos los datos
      //console.log(datos); // imprimimos los datos en consola

      setUser(datos); // como fue exitosa la peticion, entonces metemos los datos del usuario en el estado
      // asi lo usamos en otras partes de la aplicacion

      setAutenticado(true);// como el proceso fue exitoso, entonces ponemos el estado en true, indicando
      // que el usuario ya puede acceder a las rutas protegidas

    } catch (error) {
      
      seterror(error.response.data.message); // aca guardamos el error en un estado para mostrarlo 
      // en la pagina de registro, indicandole al cliente cual fue el error
      console.log("error", error);
    }
  };
  // con useEffect permite ejecutar código después de que el componente se ha renderizado
  useEffect(() => {
    // creamos la siguiente funcion para verificar si el usuario esta autenticado
    const verifyTok = async () => {

      const cookie = Cookies.get(); // acedemos a las cookies

      if (!cookie.token) { // si no hay cookies, significa que no esta autenticado, y no hay usuario
        setAutenticado(false);
        setUser(null);
        setLoading(false); //como no hay nada, Termina el proceso de verificación
        return;
      }
      // si hay token
      //  entonces verificamos
      try {
        const res = await verifyToken(cookie.token); // hacemos la peticion con el token

        // si no trae la info entonces no hay usuario y no esta autenticado
        if (!res.data) {
          setAutenticado(false);
          setUser(null);
        } else { // si todo salio bien, entonces hay un usuario y esta autenticado
          setAutenticado(true);
          setUser(res);
          
        }
      } catch (error) { // si hubo error entonces
        console.log(error); // lo imprimmos
        setAutenticado(false); // lo ponemos en false porque hubo error al verificar si esta autenticado
        setUser(null); // no hay usuario
      } finally {
        setLoading(false); // Siempre que termina el proceso, el loading pasa a falso porque
        // ya se debieron haber cargado los datos
      }
    };
    verifyTok(); // la ejecutamos 
  }, []); // con [] se ejecuta una vez, despues de que se renderiza el componente

  // este AuthContext sirve para poder pasar la informacion en los diferentes componentes que este englobe
  // en values pasamos los datos que queramos enviar a los otros componentes o paginas del sistema que auth
  //context englobe, en el main, las rutas se ponen dentro de este authcontext
  return (
    <AuthContext.Provider
      value={{ // pasamos las siguientes funciones y estados para utilizarlos en otras partes de la aplicacion
        signup,
        user,
        Autenticado,
        error,
        SignIn,
        loading,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
