import '../App.css'
import logo from "../images/logo.png";


function Navbar() {
  return(
    <nav className="navbar navbar-expand-sm navbar-dark navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="javascript:void(0)">
          <img src={logo} className="float-start" alt="Logo" width="25%" height="25%" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="javascript:void(0)">Link</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="text" placeholder="Search" />
            <button className="btn btn-primary btn-custom" type="button">Search</button>
          </form>
        </div>
      </div>
    </nav>
  
  );
}
export default Navbar;