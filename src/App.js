import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import AuthLayout from './components/AuthLayout/AuthLayout';
import HotelListPage from './components/HotelListPage/HotelListPage';
import RoomDetailsPage from './components/HotelDetailsPage/RoomDetailsPage';
import HomePage from './components/HomePage/HomePage';
import HotelInfoPage from './components/HomePage/HotelInfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hotel-info" element={<HotelInfoPage />} />
      <Route path="/auth" element={<AuthLayout />} />
      <Route path="/rooms" element={<MainLayout />}>
        <Route index element={<HotelListPage />} />
        <Route path=":id" element={<RoomDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
