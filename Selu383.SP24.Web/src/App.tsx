import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0)

    return (
      <>     
        <div>
          <Navbar />
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
           <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card card-custom">
            <div className="col-auto">
              <button className="btn btn-lg btn-custom" onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
            </div>
            <div className="col">
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
          </div>
          <p className="read-the-docs" style={{color: '#ffffff' }}>
            Click on the Vite and React logos to learn more
          </p>
        </div>
          
        </>
      )
    }

export default App
