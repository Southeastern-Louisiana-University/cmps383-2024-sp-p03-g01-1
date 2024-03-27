
import './App.css'
import Navbar from './Components/Navbar';
import SearchBar from './Components/Search';
import image1 from './images/Baton Rouge.jpg';
import image2 from './images/FQNOLA.jpg';
import image3 from './images/SLCNOLA.jpg';

function App() {
  return (
    <>     
      <Navbar />
      <div>
        <p className="landing-p-custom">Where Convenience Checks In</p>
      </div>
      <SearchBar />
      <div className="row">
        <div className="card card-custom">
          <div className="card-body">
            <img className="card-img-top" src={image1} alt="Baton Rouge" />
            <h4 className="card-title">Baton Rouge</h4>
            <p className="card-text card-text-custom">200 Convention St.</p>
            <p className="card-text card-text-custom">Baton Rouge, LA 70801</p>
            <a href="#" className="btn btn-custom rounded-5">Availability</a>
          </div> 
        </div>
        <div className="card card-custom">
          <div className="card-body">
            <img className="card-img-top" src={image2} alt="FQ NOLA" />
            <h4 className="card-title">French Quarter</h4>
            <p className="card-text card-text-custom">225 Barrone St.</p>
            <p className="card-text card-text-custom">New Orleans, LA 70112</p>
            <a href="#" className="btn btn-custom rounded-5">Availability</a>
          </div> 
        </div>
        <div className="card card-custom">
          <div className="card-body">
            <img className="card-img-top" src={image3} alt="SCL NOLA" />
            <h4 className="card-title">Jackson Square</h4>
            <p className="card-text card-text-custom">405 Esplanade Ave.</p>
            <p className="card-text card-text-custom">New Orleans, LA 70116</p>
            <a href="#" className="btn btn-custom rounded-5">Availability</a>
          </div> 
        </div>
      </div>
    </>
   
  )
}

export default App
