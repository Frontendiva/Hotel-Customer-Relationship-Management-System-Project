// RoomDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get, child } from 'firebase/database';
import { database } from '../../firebase/firebase';
import styles from './RoomDetailsPage.module.css';

const RoomDetailsPage = () => {
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const dbRef = ref(database, 'Rooms');
        const snapshot = await get(child(dbRef, String(id)));
        const data = snapshot.val();
        setRoomDetails(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? roomDetails.gallery.length - 1 : prevImage - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage === roomDetails.gallery.length - 1 ? 0 : prevImage + 1));
  };

  return (
    <div className={styles.roomDetailsContainer}>
      <div className={styles.roomImages}>
        {roomDetails && (
          <div className={styles.imageSlider}>
            <img src={roomDetails.gallery[currentImage]} alt={`Room ${id} - Image ${currentImage + 1}`} />
            <div className={styles.prevNextButtons}>
              <button onClick={handlePrevImage} disabled={roomDetails.gallery.length === 1}>
                &#8249;
              </button>
              <button onClick={handleNextImage} disabled={roomDetails.gallery.length === 1}>
                &#8250;
              </button>
            </div>
          </div>
        )}
      </div>
      {roomDetails && (
        <div className={styles.roomInfo}>
          <h1>Room Details</h1>
          <div>
            <p>Number: {roomDetails.number}</p>
            <p>Type: {roomDetails.type}</p>
            <p>Occupancy: {roomDetails.occupancy}</p>
            <p>Price: {roomDetails.price}</p>
            <p>Guest: {roomDetails.guest}</p>
            <h2>Features:</h2>
            <ul>
              {roomDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {roomDetails && (
        <div className={styles.roomDetailsDescription}>
          <h2>Description:</h2>
          <p >{roomDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;
