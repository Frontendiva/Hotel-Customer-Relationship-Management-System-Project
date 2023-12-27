// src/components/RoomComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RoomComponent = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_DATA' });
  }, [dispatch]);

  return (
    // ваш компонент с данными пользователя
  );
};

export default RoomComponent;
