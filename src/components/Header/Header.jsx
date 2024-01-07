// Header.jsx

import React from 'react';
import Logo from '../../assets/FE-2-design_favicon.png'; // Укажите правильный путь к вашему логотипу
import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.headerContainer}>
      <img src={Logo} alt="Logo" className={classes.logo} />
      <h1 className= {classes.headerTitle}></h1>
    </div>
  );
};

export default Header;