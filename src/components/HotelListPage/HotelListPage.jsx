// HotelListPage.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from 'firebase/database';
import { database } from '../../firebase/firebase';
import styles from './HotelListPage.module.css'; // Импортируйте стили

const HotelListPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [freeRoomsOnly, setFreeRoomsOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const dbRef = ref(database, 'Rooms');
        const snapshot = await get(child(dbRef, '/'));
        const data = snapshot.val();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    // Фильтрация по свободным номерам
    if (freeRoomsOnly) {
      const freeRooms = rooms.filter((room) => !room.occupied);
      setFilteredRooms(freeRooms);
    } else {
      setFilteredRooms(rooms);
    }
  }, [freeRoomsOnly, rooms]);

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Occupancy', dataIndex: 'occupancy', key: 'occupancy' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Guest', dataIndex: 'guest', key: 'guest' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleMoreInfo(record.id)}>
          More Info
        </Button>
      ),
    },
  ];

  const handleMoreInfo = (id) => {
    navigate(`/rooms/${id}`);
  };

  const handleClearAll = () => {
    setFilteredRooms(rooms);
    setFreeRoomsOnly(false); // Добавляем сброс чекбокса при очистке
  };

  const handleCheckboxChange = (e) => {
    setFreeRoomsOnly(e.target.checked);
  };

  const dataSource = filteredRooms.map((room) => ({ ...room, key: room.id }));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hotel Rooms</h1>
      <div className={styles.buttonContainer}>
        <Button type="primary" className={styles.clearButton} onClick={handleClearAll}>
          Clear All
        </Button>
        <Checkbox onChange={handleCheckboxChange}>Free rooms only</Checkbox>
      </div>
      <div className={styles.tableContainer}>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};

export default HotelListPage;
