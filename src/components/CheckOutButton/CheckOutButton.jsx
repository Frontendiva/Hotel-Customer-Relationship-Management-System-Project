// CheckOutButton.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, DatePicker } from 'antd';
import styles from '../HotelDetailsPage/RoomDetailsPage.module.css'; // Импорт стилей

const CheckOutButton = ({ onCheckOut, setPlannedCheckOutDate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plannedCheckOutDateInternal, setPlannedCheckOutDateInternal] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onCheckOut();
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
      <Button type="primary" onClick={showModal} className={styles.checkOutButton}>
        Check Out
      </Button>
      <Modal
        title="Check Out"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to check out?</p>
        <DatePicker
          placeholder="Select planned check-out date"
          onChange={handleDateChange}
          style={{ marginTop: '10px', width: '100%' }}
        />
      </Modal>
    </>
  );
};

CheckOutButton.propTypes = {
  onCheckOut: PropTypes.func.isRequired,
  setPlannedCheckOutDate: PropTypes.func.isRequired,
};

export default CheckOutButton;
