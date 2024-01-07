// Header.jsx

import React from 'react';
import Logo from '../FE-2-design_favicon.png'; // Укажите правильный путь к вашему логотипу
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <img src={Logo} alt="Logo" className="logo" />
      <h1 style={{ display: 'inline', color: 'white' }}></h1>
    </div>
  );
};

export default Header;