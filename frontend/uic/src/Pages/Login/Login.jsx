import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "testUser" && password === "testPassword") {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className='empty'>
        <div className='loginwrapper'>
          <div className='formwrapper'>
            <div className='box'>
              <form onSubmit={handleLogin}>
                <h1>Login</h1>
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="input-box">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                  <FaUser className='icon' />
                </div>

                <div className="input-box">
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                  <MdPassword className='icon' />
                </div>

                <div className="remember-forgot">
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Log in</button>

                <div className="register">
                  <p>Don't have an account? <Link to="/signup" className='edit'>Create an account</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>      
      </div>
    </>
  );
}

export default Login;
