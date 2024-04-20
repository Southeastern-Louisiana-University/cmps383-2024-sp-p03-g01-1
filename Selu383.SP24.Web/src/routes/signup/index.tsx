import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    if (username.length < 4) {
      alert('Username must be at least 4 characters long.');
      return;
    }

    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacters.test(password)) {
      alert('Please include a specialized character.');
      return;
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        setRegistrationSuccess(true);
      } else {
        alert('Something with the registration failed.');
      }
    } catch (error) {
        console.error('Error:', error);
        alert('Something else wrong happened.');
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      history('/home');
    }
  }, [history, registrationSuccess]);

  return (
    <div className="register">
      <table>
        <thead className="registerTHead">
          <tr>
            <th>Register</th>
          </tr>
        </thead>
        <tbody className="registerTBody">
          <tr>
            <td>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={passwordMismatch ? 'password-mismatch' : ''}
                  />
                  {passwordMismatch && <p className="text-danger">Your passwords do not match.</p>}
                </div>
                <div>
                  <button className="registerButton" type="submit">Register</button>
                </div>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Register;
