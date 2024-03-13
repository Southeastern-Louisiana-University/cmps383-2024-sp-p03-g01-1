import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0)

    return (
      <>     
        <Navbar />
      </>
    )
}

export default App
