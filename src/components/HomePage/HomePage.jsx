import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../Header';

const HomePage = () => {
    let navigate = useNavigate();

    useEffect(() => {
      const handleScroll = () => {
          console.log(window.scrollY);  
          if (window.scrollY > 10) {
              navigate('/hotel-info');
          }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [navigate]);

    const goToHotelInfoPage = () => {
        navigate('/hotel-info'); 
    };

    return (
        <>
            <Header />
            <div className="video-background">
                <div className="content">
                    <h1 className="main_title">Ласкаво просимо до нашого готелю!</h1>
                    <p className="main_descript">Відкрийте для себе ідеальне місце для відпочинку та релаксації.</p>
                </div>
                <div className="scroll-indicator" onClick={goToHotelInfoPage}></div>
            </div>
        </>
    );
};

export default HomePage;
