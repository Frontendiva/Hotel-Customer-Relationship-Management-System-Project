// CheckInButton.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, DatePicker } from 'antd';
import styles from '../HotelDetailsPage/RoomDetailsPage.module.css'; // Импорт стилей

const CheckInButton = ({ onCheckIn, setPlannedCheckOutDate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plannedCheckOutDateInternal, setPlannedCheckOutDateInternal] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onCheckIn();
    setPlannedCheckOutDate(plannedCheckOutDateInternal); // Установка планируемой даты выселения
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Обработчик изменения даты в DatePicker
  const handleDateChange = (date) => {
    setPlannedCheckOutDateInternal(date);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={styles.checkInButton}>
        Check In
      </Button>
      <Modal
        title="Check In"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to check in?</p>
        <DatePicker
          placeholder="Select planned check-out date"
          onChange={handleDateChange}
          style={{ marginTop: '10px', width: '100%' }}
        />
      </Modal>
    </>
  );
};

CheckInButton.propTypes = {
  onCheckIn: PropTypes.func.isRequired,
  setPlannedCheckOutDate: PropTypes.func.isRequired,
};

export default CheckInButton;
