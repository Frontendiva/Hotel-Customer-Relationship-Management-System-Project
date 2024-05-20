import React, { useState } from 'react';
import classes from './HotelInfoPage.module.css'; 
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const images = [
  { src: "/Японский сад_ Краснодар.jpeg", alt: "Сад Hotel Sakura" },
  { src: "/садй.jpeg", alt: "Ресторан Hotel Sakura" },
  { src: "/Orient Decor.jpeg", alt: "Басейн Hotel Sakura" },
  { src: "/_ (1).jpeg", alt: "Басейн Hotel Sakura" },
  { src: "/_ (2).jpeg", alt: "Басейн Hotel Sakura" },
  { src: "/_ (3).jpeg", alt: "Басейн Hotel Sakura" },
  { src: "/_ (4).jpeg", alt: "Басейн Hotel Sakura" },
  { src: "/Indochine.jpeg", alt: "Басейн Hotel Sakura" }
];

const HotelInfoPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToHomePage = () => {
    navigate('/'); 
  };

  return (
    <>
      <Header />
      <div className={classes.bodypage}>
        
        <div className={classes.container}>
        <button onClick={goToHomePage} className={classes.backButton}>Вернутися на головну</button> 
          <h1 className={classes.title}>Ласкаво просимо до Hotel Sakura!</h1>
          <div className={classes.imageContainer}>
            <img src="/Cherry Blossom at Osaka Castle in Japan.jpeg" alt="Основна будівля Hotel Sakura" className={classes.mainImage}/>
          </div>
          <p className={classes.description}>
            Заснований у 1998 році, наш готельний комплекс Hotel Sakura знаходиться у одному з наймальовничіших місць міста.
            Оточений чудовими садами, він пропонує відвідувачам спокій та комфорт у поєднанні з бездоганним сервісом.
          </p>
          <div className={classes.features}>
            <h2>Зручності:</h2>
            <ul>
              <li>Безкоштовний Wi-Fi</li>
              <li>Спа-центр</li>
              <li>Три ресторани та два бари</li>
              <li>Конференц-зали</li>
              <li>Зовнішній басейн з підігрівом</li>
            </ul>
          </div>
          <div className={classes.gallery}>
            <h2 className={classes.galleryTitle}>Галерея</h2>
            <div className={classes.imageContainer}>
              <button onClick={prevImage} className={classes.controlButton}>&lt;</button>
              <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} className={classes.galleryImage}/>
              <button onClick={nextImage} className={classes.controlButton}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelInfoPage;
