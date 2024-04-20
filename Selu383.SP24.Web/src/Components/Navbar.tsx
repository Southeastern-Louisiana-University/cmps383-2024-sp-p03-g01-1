import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from "../images/logo.png";


function Navbar() {
  const navigate = useNavigate();
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

  return(
    <nav className="navbar-container">
      <div className="navbar rounded-pill navbar-custom">
        <div className="row row-custom">
          <div className="d-flex justify-content-start col container-sm image-shift">
            <img src={logo} className="image-custom rounded-pill" alt="Logo"/>
          </div>
          <div className="col nav-p-custom">
            <p>EnStay</p>
          </div>
          <div className="col col-custom nav-bar-custom">
            <button onClick={handleTravel} className="btn rounded-pill nav-btn-custom">
              Travel
            </button>
          </div>
          <div className="col col-custom nav-bar-custom">
            <button onClick={handleAbout} className="btn rounded-pill nav-btn-custom">
              About
            </button>
          </div>
          <div className="col col-custom nav-bar-custom">
            <button onClick={handleContact} className="btn rounded-pill nav-btn-custom">
              Contact
            </button>
          </div>
          <div className="col col-custom nav-bar-custom">
            <button onClick={handleLogin} className="btn rounded-pill nav-btn-custom">
              Login
            </button>
          </div>
          <div className="col col-custom nav-bar-custom">
            <button onClick={handleRegister} className="btn rounded-pill nav-btn-custom">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  
  );
}
export default Navbar;