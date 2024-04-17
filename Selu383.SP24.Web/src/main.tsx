// Importing React Stuff //

import ReactDOM from 'react-dom/client'

import {

    createBrowserRouter,

    RouterProvider,

} from "react-router-dom";

// Importing Pages //

import ErrorPage from "./error-page";

import App from './App.tsx';

import './App.css'

import HotelDetails from './routes/hotel/details.tsx';

import Home from './Components/Home.tsx';

import Hotels from './routes/hotel/index.tsx';

import Login from './routes/login/index.tsx';

import Register from './routes/signup/index.tsx';



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

            
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router} />
)