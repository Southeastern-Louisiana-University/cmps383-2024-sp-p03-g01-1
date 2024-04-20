import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import SearchBar from './Components/Search';


function App() {
  return (
    <>
      <Navbar />
      <div>
        <p className="landing-p-custom">Where Convenience Checks In</p>
      </div>
      <SearchBar />
      
      <Outlet />
    </>
  );
}

export default App;