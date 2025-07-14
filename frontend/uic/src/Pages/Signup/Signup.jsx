import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Signup.css';
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Clear error if validation passes
    setError(null);

  };

  return (
    <>
      <Navbar />
      <div>
        <div className="loginwrapper">
          <div className="formwrapper">
            <div className="box">
              <form onSubmit={handleSignup}>
                <h1>Create Account</h1>

                {error && <p className="error-message">{error}</p>}

                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <FaUser className="icon" />
                </div>

                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <MdEmail className="icon" />
                </div>

                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <MdPassword className="icon" />
                </div>

                <button type="submit">Sign up</button>

                <div className="register">
                  <p>
                    Have an account?
                    <Link to="/login" className="read">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
