import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../images/logo.png";


function Navbar() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/');
  }
  const handleTravel = () => {
    navigate('/home');
  };
  const handleAbout = () => {
    navigate('/about');
  };
  const handleContact = () => {
    navigate('/contact');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <nav className="navbar rounded navbar-expand-lg bg-body-tertiary navbar-custom">
      <div className="container-fluid">
        <div className="d-flex justify-content-start">
          <img src={logo} onClick={handleHome} className="rounded image-custom " alt="Logo"/>
        </div>
        <a href="/" className="navbar-brand nav-p-custom" onClick={handleHome}>EnStay</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar-col-custom" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-item-custom">
              <a onClick={handleTravel} aria-current="page" className="nav-link active">Travel</a>
            </li>
            <li className="nav-item nav-item-custom">
              <a onClick={handleAbout} aria-current="page" className="nav-link active">About</a>
            </li>
            <li className="nav-item nav-item-custom">
              <a onClick={handleContact} aria-current="page" className="nav-link active">Contact</a>
            </li>
            <li className="nav-item nav-item-custom">
              <a onClick={handleLogin} aria-current="page" className="nav-link active">Login</a>
            </li>
            <li className="nav-item nav-item-custom">
              <a onClick={handleRegister} aria-current="page" className="nav-link active">Register</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn rounded-pill nav-btn-custom" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
  
  
}
export default Navbar;