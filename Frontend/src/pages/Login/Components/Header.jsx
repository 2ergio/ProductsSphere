import React from "react";

import logo from '../../../assets/Images/Designer-transformed.png';
const Header = () =>{
    return(
    <div >
    <div className="container fluid " style={{backgroundColor:"#468189", minWidth:"100%", minHeight:"70px"}}>
        <div className="row">
            <div className="col-6 "><img src={logo} alt="logo" style={{maxWidth: "70px", maxHeight:"70px"}} /></div>
            <div className="col-6 text-end fs-4 p-3"><i className="bi bi-twitter mx-2"></i>
            <i className="bi bi-linkedin mx-2"></i>
            <i className="bi bi-discord mx-2"></i>
            <i className="bi bi-github mx-2"></i></div>
        </div>
    </div>
    </div>
    );
}

export default Header