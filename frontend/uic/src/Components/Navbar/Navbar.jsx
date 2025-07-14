import React from 'react';
import './Navbar.css';
import Account from '../Card/Account';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate;
  const onLogout=()=>{
    navigate("/login");
  }
  return (
    <div className="whole">
      <h2>Chatbot</h2>
      <Account />
    </div>
  );
};

export default Navbar;
