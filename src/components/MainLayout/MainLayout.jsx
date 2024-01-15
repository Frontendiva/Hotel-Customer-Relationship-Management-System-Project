// MainLayout.jsx
import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
//import HotelDetailsPage from '../HotelDetailsPage/HotelDetailsPage'

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
     

    </div>
  );
};

export default MainLayout;
