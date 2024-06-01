import React, { useState } from 'react';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/action/usersActions';
import ContactModal from '../Contact/ContactModal';
import Logo from '../../assets/Logo.png';
import classes from './Header.module.css';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);
    const user = useSelector(state => state.users.user);
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
                <Link to="/hotel-info" className={classes.navLink}>Про нас</Link>
                <Link to="/rooms" className={classes.navLink}>Кімнати</Link>
                <a href="#contact" className={classes.navLink} onClick={openModal}>Зв`язатись з нами</a>
            </div>
            {isAuthenticated ? (
                <div className={classes.userProfile}>
                    {user && user.photoURL ? (
                        <div className={classes.roundImage}>
                            <img src={user.photoURL} alt="User Avatar" className={classes.userAvatar} />
                        </div>
                    ) : (
                        user && user.displayName ? (
                            <span className={classes.userInitials}>{user.displayName[0]}</span>
                        ) : null
                    )}
                    <Link to="/profile" className={classes.navLink}>Мій профіль</Link>
                    <button className={classes.logoutButton} onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <button className={classes.loginButton}><Link to="/auth">Log In</Link></button>
            )}
            <div className={classes.socialIcons}>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebookSquare /></a>
            </div>
            <ContactModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Header;
