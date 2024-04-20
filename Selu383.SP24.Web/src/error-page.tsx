import { useRouteError } from "react-router-dom";
import NavBar from './Components/Navbar.tsx';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <NavBar />
      <center>
        <h1>Oops! Something Went Wrong!</h1>
        <h2 style={{ color: 'white' }}>Please don't do that again!</h2>
        <p>
          <i style={{ color: 'white' }}>{error.statusText || error.message}</i>
        </p>
      </center>

    </div>
  );
}

