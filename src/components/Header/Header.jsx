import React, { useState } from 'react';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa'; 
import Logo from '../../assets/Logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/action/usersActions';
import ContactModal from '../Contact/ContactModal';
import classes from './Header.module.css';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={classes.headerContainer}>
            <img src={Logo} alt="Hotel Logo" className={classes.logo} />
            <h1 className={classes.headerTitle}>Hotel SAKURA</h1>
            <div className={classes.navLinks}>
                <a href="/hotel-info" className={classes.navLink}>Про нас</a>
                <a href="/rooms" className={classes.navLink}>Кімнати</a>
                <a href="#contact" className={classes.navLink} onClick={openModal}>Зв`язатись з нами</a>
            </div>
            <div className={classes.socialIcons}>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebookSquare /></a>
            </div>
            {isAuthenticated ? (
                <div className={classes.userProfile}>
                    <button className={classes.logoutButton} onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <button className={classes.loginButton}><a href="/auth">Log In</a></button>
            )}
            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Header;
