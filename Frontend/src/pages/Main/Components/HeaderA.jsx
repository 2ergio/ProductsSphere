import logo from "../../../assets/Images/Designer-transformed.png";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../../../context/authContext";

import { useNavigate } from "react-router-dom";

const HeaderA = () => {
  const { user, cerrarSesion } = useAuth(); // importamos el usuario para ponerlo en el header y la funcion cerrar sesion
  // del contexto,
  //const navigate = useNavigate()
  //console.log(user);

  const Logout = () =>{ // con esta funcion cerramos sesion
    cerrarSesion()
    
  }

  return (
    <div>
      <div className="Login">
        <div
          className="container fluid "
          style={{
            backgroundColor: "#468189",
            minWidth: "100%",
            minHeight: "70px",
          }}
        >
          <div className="row">
            <div
              className="col-6  "
              
            >
              <div className="my-2 d-flex text-center align-items-center fs-5 ">
                <i className="bi bi-shop fs-3"
                ></i>
                {user && (
                  <p style={{  wordWrap: "break-word", overflow:"hidden" }} className="text-center my-2 mx-2">{user.data.username}</p>
                )}
              </div>
            </div>
            <div className="col-6 text-end fs-4 p-2 my-auto">
              <Dropdown>
                <Dropdown.Toggle
                  variant="black"
                  id="dropdown-basic"
                  className="fs-4"
                  style={{ border: "1px solid black" }}
                >
                  <i className="bi bi-person-circle mx-2"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className="fs-5"
                  style={{ backgroundColor: "#9DBEBB" }}
                >
                  <Dropdown.Item  onClick={Logout}>
                    <i class="bi bi-person-fill-slash mx-2" style={{cursor:"pointer"}} ></i> Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderA;
