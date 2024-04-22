// Importing React Stuff //
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Importing Pages //
import ErrorPage from "./error-page";
import App from './App.tsx';
import './App.css'
import HotelDetails from './routes/hotel/details.tsx';
import Home from './Components/Home.tsx';
import Hotels from './routes/hotel/index.tsx';
import Login from './routes/login/index.tsx';
import Register from './routes/signup/index.tsx';
import Contact from './routes/contact/index.tsx';
import Booking from './routes/booking/index.tsx';
import Booking2 from './routes/booking/index2.tsx';
import Booking3 from './routes/booking/index3.tsx';
import About from './routes/about/index.tsx';

const router = createBrowserRouter([

    {
        path: "/",

        element: <App />,

        errorElement: <ErrorPage />,

        children: [

          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/hotels/details/:id",
            element: <HotelDetails />,
          },
          {
            path: "/hotels/index",
            element: <Hotels />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/contact",
            element: <Contact />
            },

            {
                path: "/booking/1",
                element: <Booking />
            },

            {
                path: "/booking/2",
                element: <Booking2 />
            },

            {
                path: "/booking/3",
                element: <Booking3 />
            },

            {
                path: "/about",
                element: <About />
            },  
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router} />
)