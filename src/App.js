// App.js
import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import AuthLayout from './components/AuthLayout/AuthLayout';
import HotelListPage from './components/HotelListPage/HotelListPage';
import RoomDetailsPage from './components/HotelDetailsPage/RoomDetailsPage';  // Обновленный импорт
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/rooms" element={<MainLayout />}>
        <Route index element={<HotelListPage />} />
        <Route path=":id" element={<RoomDetailsPage />} />
      </Route>
      <Route path="/" element={<AuthLayout />} />
    </Routes>
  );
};

export default App;
