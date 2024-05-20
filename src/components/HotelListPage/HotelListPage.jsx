import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ref, get, child } from 'firebase/database';
import { database } from '../../firebase/firebase';
import styles from './HotelListPage.module.css';

const HotelListPage = () => {
  const [rooms, setRooms] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6); 
  const [freeRoomsOnly, setFreeRoomsOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const dbRef = ref(database, 'Rooms');
      const snapshot = await get(child(dbRef, '/'));
      const data = snapshot.val();
      const roomsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setRooms(roomsArray);
    };
    fetchRooms();
  }, []);

  const handleCheckboxChange = (e) => {
    setFreeRoomsOnly(e.target.checked);
  };

  const handleClearAll = () => {
    setFreeRoomsOnly(false); 
  };

  const filteredRooms = rooms.filter(room => freeRoomsOnly ? !room.isCheckedIn : true);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <Checkbox onChange={handleCheckboxChange} checked={freeRoomsOnly}>Вільні номера</Checkbox>
        <Button onClick={handleClearAll}>Очистити все</Button>
      </div>
      <div className={styles.roomsContainer}>
        {currentRooms.map(room => (
          <div key={room.id} className={styles.roomCard}>
            {room.gallery && room.gallery.length ? (
              <img src={room.gallery[0]} alt="Room" className={styles.roomImage} />
            ) : (
              <div className={styles.noImage}>No Image Available</div>
            )}
            <div className={styles.roomDetails}>
              <h3 className={styles.roomTitle}>{room.type}</h3>
              <p className={styles.roomDescription}>{room.description}</p>
              <p className={styles.roomPrice}>Ціна: {`$${room.price}`}</p>
              <Button className={styles.roomButton} type="primary" onClick={() => navigate(`/rooms/${room.id}`)}>Детальніше</Button>
            </div>
          </div>
        ))}
        <Pagination
          current={currentPage}
          onChange={page => setCurrentPage(page)}
          total={filteredRooms.length}
          pageSize={roomsPerPage}
          showSizeChanger={false}
          className={styles.pagination}
        />
      </div>
    </div>
  );
};

export default HotelListPage;
