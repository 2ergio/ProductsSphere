import axios from "axios"; // importamos la libreria axios para las peticiones al servidor

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
}) // configuramos axios de esta manera y lo exportamos

export default instance;