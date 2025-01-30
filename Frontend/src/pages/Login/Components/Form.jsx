import styles from "../Form.module.css"; // importamos estilos

import { useState } from 'react'; // importamos useState para el manejo de estados

import Button from 'react-bootstrap/Button'; // importamos un componente de la libreria bootstrap react

import Modal from 'react-bootstrap/Modal';// importamos un componente de la libreria bootstrap react

import { useForm } from "react-hook-form"; // importamos useForm de la libreria react-hook-form para mejor manejo de formularios
import { useEffect } from "react"; 
import logo from "../../../assets/Images/logo3.png"; // importamos una imagen para el ux

import { useNavigate } from "react-router-dom"; // importamos usenavigate para navegar entre paginas

import { useAuth } from "../../../context/authContext"; // importamos el contexto de autenticacion de donde traemos
// las values que exportamos desade alli, como estamos englobados  por el authprovider, podemos acceder a los datos de alli

const Form = () => {
  const navigate = useNavigate(); // con esta variable podemos navegar

  const {SignIn, error, Autenticado, cerrarSesion} = useAuth() // traemos de useAuth, la funcion para iniciar Sesion, los errores
  // y si estamos autenticados

  // Estados para el manejo del modal de errores
  const [show, setShow] = useState(false);

  // Estados para el manejo de modal de exito
  const [smShow, setSmShow] = useState(false);
  
  // estados que guardarian el mensaje del error que viene desde el contexto(authcontext)
  const [errorM, seteErrorm] = useState("")

  // traemos de react hook form unos metodos para el manejo de formularios
  const { register, handleSubmit, formState:{errors},  } = useForm();

  // funcion que indica que el proceso fue exitoso activando el modal
  const success = () =>{
    setSmShow(true)
  }
  
  // funcion para cerrar la modal de exito, al cerrarla nos redirige al main ya que estamos autenticados
  const succesEnd = () =>{ 
    navigate("/Main")
  }
  
  // utilizamos se ejecuta cada vez el error cambia
  useEffect(() => {

    if (error.length >= 1) { // si los errores traidos de useAuth son mayores a 1 entonces
      seteErrorm(error); // Establecer el mensaje de error
      setShow(true);     // Mostrar el modal si hay error
    }
  }, [error]); // cambia cada vez que el error cambia

  // utilizamos ussefect para validar si el usuario esta autenticado, si lo esta muestra 
  // su modal de exito
  useEffect(() =>{
    if(Autenticado){
      setShow(false)
      seteErrorm("")
      success()
      
    }
    
  })
  // utilizamos ussefect para validar si el usuario esta  no esta autenticado, esto
  // sirve para resolver algunos problemas con el tema de errores que se guardan
  useEffect(() =>{
    if(!Autenticado){
      setShow(false)
      seteErrorm("")
      
    }
  },[])
  
  // Funcion de subir datos, aca la unimos con el metodo de react-hook form, para subir los values
  // con facilidad
  const onSubmit = handleSubmit(async(values) =>{
    await SignIn(values) // aca enviamos los datos con la funcion del contexto, y le pasamos el parametro que son
    // los values
    
    // volvemos a validar los errores
    try{
      if(error.length > 0){ // si el error es mayor a 0 abrimos la modal de errores
        seteErrorm(error) // metemos los errores al estado
        handleShow() // abrimos la modal
      }
    }catch(error){
      handleShow() // si error, mostramos la modal
    }
  }) 
  const handleClose = () => {setShow(false) // funcion para cerrar la modal de errores
    };
  const handleShow = () => setShow(true) ; // funcion para abrir la modal de errores

  const handlenavigate = () =>{ // funcion para navegar a la pagina de registro
    
    navigate("/Register")
    
  }
  

  
  return (
    <div className={styles.body}>
      {/*Modal que indicaria los errores*/}
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-danger text-white">
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body><h4>{errorM}</h4></Modal.Body>
            <Modal.Footer>
              <Button className=""  onClick={handleClose} style={{backgroundColor:"#031926"}}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          
          {/*Modal que indicaria si la peticion fue exitosa*/}
          <Modal
        size="sm"
        show={smShow}
        onHide={succesEnd}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton className="bg-success">
          
        </Modal.Header>
        <Modal.Body className="fw-bold fs-4">Bienvenido</Modal.Body>
      </Modal>

      <div className="container fluid" style={{ minWidth: "100%" }}>
        <div className="row">
          <div
            className="col-sm-6  d-none d-sm-block "
            style={{ minHeight: "100%" }}
          >
            <div className="my-5 me-5">
              <img
                className=""
                src={logo}
                alt="logo2"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
          <div
            className="col-sm-6 col-12 "
            style={{
              backgroundColor: "#9DBEBB",
              minHeigh: "100",
              color: "#031926",
            }}
          >
            <form className="text-center" action="" onSubmit={onSubmit}>
              {" "}
              <br />
              <div className="fw-bold ">
                <h1>Inicio de Sesión</h1> <br />
              </div>
              <i class="bi bi-file-person fs-4"></i>
              <label className="mx-2" htmlFor="">
                <h2>Ingrese su correo electrónico</h2>
              </label>
              <input
              {...register("email",{required: "El email es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Debe ingresar un correo válido"
                }
              })}
                type="text"
                placeholder="correoelectronico@gmail.com"
                style={{
                  borderRadius: "30px",
                  outline: "none",
                  border: "none",
                  padding: "5px 30px",
                }}
                
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
              <br /> <br />
              <i class="bi bi-file-lock2 fs-4"></i>{" "}
              <label className="mx-2" htmlFor="">
                <h2>Ingrese su contraseña </h2>
              </label>{" "}
              <br />
              <input maxLength={50}
              {...register("password",{required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: " la contraseña debe tener al menos 8 caracteres"
                }
              })}
                type="password"
                placeholder="****************************"
                style={{
                  borderRadius: "30px",
                  outline: "none",
                  border: "none",
                  padding: "5px 30px",
                }}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
              <br /> <br />
              <a
                
                style={{
                  textDecoration: "true",
                  textDecorationColor: "#031926",
                  color: "#031926",
                  cursor:"pointer"
                }}
                onClick={handlenavigate}
              >
                ¿No tiene una cuenta? Cree una
              </a>{" "}
              <br /> <br /> <br />
              <button
                style={{
                  backgroundColor: "#031926",
                  border: "none",
                  borderRadius: "30px",
                  outline: "none",
                  color: "white",
                  padding: "5px 30px",
                }}
              >
                Ingresar
              </button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
