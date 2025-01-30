import axios from './axios' // importamos la libreria axios para poder hacer peticiones al servidor,
// aca importmos axios desde una ruta porque ahi axios tiene otra configuracion

export const Register = (user) => axios.post(`/register`,user) // creamos y exportamos la ruta register
// que recibe un parametro usuario y se envia a esa ruta

export const Login = (user) => axios.post(`/login`,user) // creamos y exportamos la ruta Login
// que recibe un parametro usuario y se envia a esa ruta

export const verifyToken = () => axios.get('/verify')   // creamos y exportamos la ruta verifytoken
// que servira para que el cliente sepa si estamos autenticados

export const Logout = () => axios.post('/logout')
