import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface UserDto {
  userName?: string;
  id?: number;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<UserDto | null>(null);
  const navigate = useNavigate();

  function handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user !== null) {
      navigate('/userinfo');
      return;
    }
    try {
      const response = await fetch("/api/authentication/login", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
          userName: username,
          password: password,
        })
      });

      if (response.ok) {
        const userResp = await response.json();
        setUser(userResp);
      } else {
        // Handle error case
      }
    } catch (error) {
        // Handle network error
    }
  }

  async function handleLogout() {
    try {
      // Clear user state
      setUser(null);

      // Make a request to logout endpoint
      const response = await fetch("/api/authentication/logout", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
          
      });

      if (response.ok) {
        // Redirect to the login page or any other desired route
        navigate('/login');
      } else {
          // Handle error response from logout endpoint
          // For example, if the server responds with an error status code
      }
    } catch (error) {
        // Handle network error
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/authentication/me");
        if (response.ok) {
          const userResp = await response.json();
          setUser(userResp);
        } else {
          setUser(null);
        }
      } catch (error) {
          // Handle network error
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      {user !== null ?
        <div>
          {/* Display message indicating user is logged in */}
          <table className="login"> 
          <p>{user.userName}, logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </table>
        </div>
        :


        <div className="login">
          <table>
            <thead className="loginTHead">
              <tr>
                <th>Login</th>
              </tr>
            </thead>
            <tbody className="loginTBody">
              <tr>
                <td>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input type="text" name="username" id="username" value={username} placeholder="Enter username" onChange={handleUserNameChange} />
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id="password" value={password} placeholder="Enter password" onChange={handlePasswordChange} />
                    <br />
                    <div className="loginpageButton">
                      <button className="buttonLogin" type="submit">Log In</button>
                      <button className="buttonSignUp" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </>
  );
}
