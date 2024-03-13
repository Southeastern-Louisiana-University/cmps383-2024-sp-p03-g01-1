import '../App.css'

import logo from "../images/logo.png";


function Navbar() {
  
  const handleClick = () => {

  };

  return(
    <nav className="navbar rounded-pill navbar-expand-sm navbar-dark navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logo} className="float-start rounded-5" alt="Logo" width="25%" height="25%" style={{marginLeft: '20px', marginRight: '0'}} />
          <span style={{ fontSize: '4.0rem', marginLeft: '0', color: '#00171F' }}>EnStay</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Travel</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Offers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">About Us</a>
            </li>
          </ul>
          <div>
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-phone icon-custom icon-rotate"></i>
            </button>
            <button className="icon-button" onClick={handleClick}>
              <i className="far fa-envelope icon-custom"></i>
            </button>
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-map-marker-alt icon-custom"></i>
            </button>
            <button className="icon-button" onClick={handleClick}>
              <i className="fas fa-user-alt icon-custom"></i>
            </button>         
          </div>
          
          <button className="btn rounded-pill btn-custom" type="button">Login</button>
          <button className="btn rounded-pill btn-custom" type="button">Register</button>
        </div>
      </div>
    </nav>
  
  );
}
export default Navbar;