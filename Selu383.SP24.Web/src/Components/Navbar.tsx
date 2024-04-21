/*import '../App.css'

import logo from "../images/logo.png";


function Navbar() {
  
  const handleClick = () => {

  };

  return(
    <nav className="navbar-container">
      <div className="navbar rounded-pill navbar-custom">
        <div className="row row-custom">
          <div className="col col-custom">
            <img src={logo} className="image-custom rounded-pill" alt="Logo"/>
          </div>
          <div className="col nav-p-custom">
          </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Travel</a>
          </div>
          <div className="nav-col-link-custom">
         
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Offers</a>
          
           </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">About</a>
          </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Contact</a>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-phone icon-custom icon-rotate"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="far fa-envelope icon-custom"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-map-marker-alt icon-custom"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-user-alt icon-custom"></i>
            </button>         
          </div>
          <button className="btn rounded-pill nav-btn-custom" type="button">Login</button>
          <button className="btn rounded-pill nav-btn-custom " style={{marginRight: '12px'}} type="button">Register</button>
        </div>
      </div>
    </nav>
  
  );
}
export default Navbar;*/

import React, { useContext } from "react";
import AuthContext from "../features/authentication/AuthContext";
import logo from "../images/logo.png";
import LogoutButton from "../features/authentication/logout";

function Navbar() {
  const authContext = useContext(AuthContext);
  console.log("AuthContext:", authContext);
  console.log("User:", authContext?.user);
  
  const handleClick = () => {
  };

  return (
    <nav className="navbar-container">
      <div className="navbar rounded-pill navbar-custom">
        <div className="row row-custom">
          <div className="col col-custom">
            <img src={logo} className="image-custom rounded-pill" alt="Logo"/>
          </div>
          <div className="col nav-p-custom"></div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Travel</a>
          </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Offers</a>
          </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">About</a>
          </div>
          <div className="nav-col-link-custom">
            <a className="nav-link nav-link-custom" href="javascript:void(0)">Contact</a>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-phone icon-custom icon-rotate"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="far fa-envelope icon-custom"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-map-marker-alt icon-custom"></i>
            </button>
          </div>
          <div className="nav-col-custom">
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-user-alt icon-custom"></i>
            </button>
          </div>
          {authContext && authContext.user ? (
            <LogoutButton>Logout</LogoutButton>
          ) : (
            <button className="btn rounded-pill nav-btn-custom" type="button" onClick={handleClick}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
    
  );
}

export default Navbar;
