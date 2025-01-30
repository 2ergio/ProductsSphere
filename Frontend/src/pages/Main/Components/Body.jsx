
import { useAuth } from "../../../context/authContext" // importamos el contexto de autenticacion

import { useEffect, useState } from "react"; // importamos los diferentes hooks

import { useNavigate } from "react-router-dom" // importamos useNavigate para navegar entre paginas

import { useForm } from "react-hook-form"; // importamos useform para el manejo de formularios

import Button from 'react-bootstrap/Button';// importamos un componente de la libreria bootstrap react

import Form from 'react-bootstrap/Form';// importamos un componente de la libreria bootstrap react

import Modal from 'react-bootstrap/Modal'; // importamos un componente de la libreria bootstrap react

import { useProducts } from "../../../context/productsContext"; // importamos el contexto de productos
// para acceder a sus estados

export const Body = () => {

  // Estado necesarias para el formulario modal de agregar productos
  const [show, setShow] = useState(false);


  // estado para obtener la id cuando el usuario abra la modal del producto que quiera editar
  const[id, setId] = useState("") 

  const [filteredproduct, setFilteredproduct] = useState([]); // estado para filtrar productos

  const [showE, setShowE] = useState(false); // estado para la modal de editar productos


  const handleClose = () => setShow(false); // funcion para cerrar la modal de agregar productos


  const handleCloses = () => {setShowE(false) // funcion para cerrar la modal de editar

    setValue('nombre', ""); // aca accedemos a otro metodo de react-form, que captura los valores 
    setValue('descripcion', ""); // de los input, cuando se cierre la modal de editar productos
    setValue('precio',"" ); // todos los valores pasan a ser nulos
    setValue('categoria', "");
    setValue('cantidad', "");
    setId("") // y cuando se cierre, tambien limpia la id del estado del producto al que se accedio
  };

  // estado para el manejo de la modal de aviso de eliminar productos
  const [showD, setshowD] = useState(false)

  // estado para el manejo de la modal de aviso Actualizar productos
  const [showA, setshowA] = useState(false)

  // funcion para activar la modal de agregar productos
  const handleShow = () => {
    setShow(true)
    clearErrors() // cada vez que se abra, limpia los errores de los input
   }
  
  // manejo de formularios con react form traemos errors para validaciones, setvalue para obtener los valores
  // y cleanErrors para limpiar los errores
  const { register, handleSubmit, formState:{errors}, setValue, clearErrors  } = useForm();

  const {CreateProduct, deleteProducts, editProduct} = useProducts() // traemos del contexto las funciones
  // para realizar las peticiones

  // Estados para el manejo de modal de exito de agregar producto
  const [smShow, setSmShow] = useState(false);

  // funcion para activar la modal de exito de agregar producto
  const success = () =>{
    setSmShow(true)
  }
  
  // funcion para activar la modal de exito al eliminar producto
  const successD = () =>{
    setshowD(true)
  }

  // funcion para activar la modal de exito de actualizar producto
  const succesA = () =>{
    setshowA(true)
  }

  // funcion para cerrar la modal de exito al agregar producto
  const close = () =>{
    setSmShow(false)
    window.location.reload()
  }
 
  // funcion para activar la modal de editar producto
  const handleshowE =  () =>{
    setShowE(true)
  }

  // funcion para activar la modal de editar producto
  const edit = (product) =>{ // recibimos un parametro que se obtiene al dar click sobre el producto en la tabla
    handleshowE() // activamos la modal
    clearErrors() // limpiamos los errores
    const id = product._id // accedemos al id del producto
    
    setId(id) // el id del producto lo agregamos al estado de id

    setValue('nombre', product.nombre); // en los inputs, con el metodo setValue, ponemos la info de aca producto
    // primero poniendo el nombre del input, y luego el valor que tiene el producto
    setValue('descripcion', product.descripcion);
    setValue('precio', product.precio);
    setValue('categoria', product.categoria);
    setValue('cantidad', product.cantidad);
  }

  // funcion para agregar productos, lo asociamos con el metodo handlesubmit de react form
  const onSubmit = handleSubmit(async(product) =>{ // la funcion pide un parametro que serian los valores 
    // que capturamos cuando vayamos a agregar un producto 
    try{
      await CreateProduct(product) // realizamos la peticion llamando la funcion del contexto, productsContext
      setShow(false) // cerramos la modal de agregar productos
      success() // y activamos la modal de exito
      
    } catch(error){
      console.log(error);
    }
  })

  // funcion para borrar producto
  const borrar = async(id) =>{ // recibimos un parametro id que lo obtenemos al dar click sobre el producto en 
    // la tabla
    try{
      await deleteProducts(id) // realizamos la peticion llamando la funcion del contexto, productsContext
      setShowE(false) // cerramos la modal de editar
      successD() // activamos la modal de exito al eliminar producto

    }catch(error){
      console.log(error)
    }
    

  }

  // funcion para actualizar productos
  const actualizar = handleSubmit(async(data) =>{ // recibimos un parametro que serian los datos que obtenemos en la modal de editar productos
    try {
      await editProduct(id,data) // realizamos la peticion llamando la funcion del contexto, productsContext
      // le pasamos los dos parametros que esta funcion requiere, en este caso la id, que la sacamos
      // de un estado que capturamos al presionar un producto en la tabla, y los datos
      // que se capturan en el formulario

      setShowE(false) // cerramos la modal de editar productos
      succesA() // activamos la modal de exito al actualizar productos

    } catch (error) {
      console.log(error)
    }
    
  })

 // Funcion para buscar y filtrar productos
const handleSearch = (e) => {
  const searchValue = e.target.value.toLowerCase(); // Obtenemos el texto que el usuario escribió en el input

  // Si el input esta vacio, mostramos todos los productos sin filtro.
  if (searchValue === "") {
    setFilteredproduct(products); // Restauramos la lista original de productos.
    return; // Salimos de la función.
  }

  // Filtramos los productos comparando el texto ingresado con diferentes propiedades de cada producto.
  const filteredData = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchValue) || // Compara el nombre del producto
      product.categoria.toLowerCase().includes(searchValue) || // Compara la categoría
      product.descripcion.toLowerCase().includes(searchValue) || // Compara la descripción
      product.precio.toString().toLowerCase().includes(searchValue) || // Compara el precio (convertido a texto)
      product.cantidad.toString().toLowerCase().includes(searchValue) // Compara la cantidad (convertida a texto)
  );

  // Guardamos en el estado solo los productos que coinciden con la búsqueda.
  setFilteredproduct(filteredData);
};

  const navigate = useNavigate()
  const { Autenticado, loading} = useAuth() // traemos del contexto de autenticacion, el loading, y si esta autenticado
  
  const {GetProducts, products} = useProducts() // traemos la funcion get product y product de el contexto de productos


    useEffect(() =>{
      if (!loading && !Autenticado) { // en el authcontext, loading siempre termina en false,
        // si loading es falso, y si autenticado es falso, significa que no estamos
        // autenticados y nos redirecciona al login
        navigate("/Login");
        console.log("No estás autorizado");
      }
    }, [loading, Autenticado, navigate]);
    
    useEffect(() =>{
      GetProducts() // aqui llamamos la funcion del contexto, esta se debe ejecutar primero
      // para que el estado de producto en el contexto, traiga los productos
    },[])

    useEffect(() =>{
      setFilteredproduct(products); // guardamos los productos en filteredproducts porque
      // con ese estad veremos los productos
    },[products])

    if (loading) {
      return <h1>Cargando...</h1>; // Muestra un indicador de carga mientras verifica
    }

    // si no tenemos productos, retorna ese mensaje en pantalla
    let Mensaje = false
    if(products.length === 0){
      Mensaje = "No hay Productos"
    }
    //console.log(Mensaje)
  return (
    <div className="text-white" style={{backgroundColor:"#031926", minHeight:"100vh"}}>
      {/*Modal para agregar productos*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header   className="text-white" style={{backgroundColor:"#031926"}}>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" >
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                maxLength={50}
                {...register('nombre', {required: true})}
              />
              {errors.nombre && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                maxLength={200}
                {...register('descripcion', {required: true})}
              />
              {errors.descripcion && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Precio</Form.Label>
              <Form.Control
                onInput={(e) => {
                  if (e.target.value.length > 8) {
                    e.target.value = e.target.value.slice(0, 8);
                  }}}
                type="number"
                {...register('precio', {required: true,valueAsNumber: true,})}
                
              />
              {errors.precio && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Categoría:</Form.Label>
              <Form.Control
                type="text"
                
                maxLength={50}
                {...register('categoria', {required: true})}
              />
              {errors.categoria && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }}}
                {...register('cantidad', {required: true,valueAsNumber: true})}
               
              />
              
              {errors.cantidad && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose} style={{backgroundColor:"#031926"}}>
            Cerrar
          </Button>
          <Button style={{backgroundColor:"#468189"}} type="submit" onClick={onSubmit}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal para actualizar productos*/ }
      <Modal show={showE} onHide={handleCloses}>
        <Modal.Header   className="text-white" style={{backgroundColor:"#031926"}}>
          <Modal.Title>Actualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" >
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                maxLength={50}
                {...register('nombre', {required: true})}
              />
              {errors.nombre && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                maxLength={200}
                {...register('descripcion', {required: true})}
              />
              {errors.descripcion && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Precio</Form.Label>
              <Form.Control
                onInput={(e) => {
                  if (e.target.value.length > 8) {
                    e.target.value = e.target.value.slice(0, 8);
                  }}}
                type="number"
                {...register('precio', {required: true,valueAsNumber: true,})}
                
              />
              {errors.precio && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Categoría:</Form.Label>
              <Form.Control
                type="text"
                
                maxLength={50}
                {...register('categoria', {required: true})}
              />
              {errors.categoria && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }}}
                {...register('cantidad', {required: true,valueAsNumber: true})}
               
              />
              
              {errors.cantidad && <p className="text-danger">Este Campo es requerido</p>}
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button  onClick={() =>{
            handleCloses()
          }} style={{backgroundColor:"#031926"}}>
            Cerrar
          </Button>
          <Button  onClick={() =>{
            borrar(id)
          }} style={{backgroundColor:"red"}}>
            Eliminar
          </Button>
          <Button style={{backgroundColor:"#468189"}} type="submit" onClick={() =>{
            actualizar()
          }}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>



      {/*Modal que indicaria si la peticion fue exitosa*/}
      <Modal
        size="sm"
        show={smShow}
        onHide={close}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton className="bg-success">
          
        </Modal.Header>
        <Modal.Body className="fw-bold fs-4">Producto Agregado Con Éxito</Modal.Body>
      </Modal>

      {/*Modal que indicaria si la actualizacion fue exitosa*/}
      <Modal
        size="sm"
        show={showA}
        onHide={() =>{
          window.location.reload()
          setShowE(false)
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton className="bg-success">
          
        </Modal.Header>
        <Modal.Body className="fw-bold fs-4">Producto Actualizado Con Éxito</Modal.Body>
      </Modal>

      {/*Modal que indicaria si el producto eliminado fue exitoso*/}
      <Modal
        size="sm"
        show={showD}
        onHide={() =>{
          window.location.reload()
          setShowE(false)
        }}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton className="bg-success">
          
        </Modal.Header>
        <Modal.Body className="fw-bold fs-4">Producto Eliminado Con Éxito</Modal.Body>
      </Modal>
      <div className="container-fluid mx-auto">
        <br />
        <br />
        <div className="container fluid">
          <div className="row">
            <div className="col-lg-6  text-center"><h1>Lista de Productos</h1><br />
            <Button  className="my-3"  style={{backgroundColor: "#468189", border:"none"}} onClick={handleShow}> Agregar productos</Button></div>
            <div className="col-lg-6  ">
              <div className="text-center mx-auto">
          <p className="" >Buscar por filtros</p>
          < input type="search" className="form-control mx-auto" onChange={handleSearch}  style={{width:"220px"}}/> <br /> 
          </div>
          </div>
          </div>
          <br />
        </div>
        <div className="table-responsive-sm">
          <table class="text-black text-center " style={{backgroundColor:"#77ACA2", minWidth:"100%",}}>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoría</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody  >
              
              {filteredproduct && filteredproduct.map(product =>{
                return(
                <tr onClick={() =>{edit(product)}} key={product._id} >
                <td >{product.nombre}</td>
                <td >{product.descripcion}</td>
                <td>{product.precio}</td>
                <td>{product.categoria}</td>
                <td>{product.cantidad}</td>
              </tr>
                )
               })
              
}
            </tbody>
          </table>
          <div className="text-center my-5">
              {<h3>{Mensaje}</h3>}
              </div>
        </div>
        <br />
        <br />
        
      </div>
    </div>
  );
};
