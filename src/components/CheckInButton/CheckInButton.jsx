// CheckInButton.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, DatePicker } from 'antd';
import styles from '../HotelDetailsPage/RoomDetailsPage.module.css'; 
import { format } from "date-fns";
import moment from 'moment';


const CheckInButton = ({ onCheckIn }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plannedCheckOutDateInternal, setPlannedCheckOutDateInternal] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const formatedDate = format(plannedCheckOutDateInternal.$d, "yyyy-MM-dd")
    onCheckIn(formatedDate);
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date) => {
    setPlannedCheckOutDateInternal(date);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={styles.checkInButton}>
        Заселитися
      </Button>
      <Modal
        title="Заселення"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className={styles.modalTextUkr}>Ви впевнені, що хочете заселитися?</p>
        <DatePicker
          placeholder="Виберіть планову дату заселення"
          onChange={handleDateChange}
          style={{ marginTop: '10px', width: '100%' }}
          disabledDate={(current) => current && current < moment().endOf('day')}

        />
      </Modal>
    </>
  );
};

CheckInButton.propTypes = {
  onCheckIn: PropTypes.func.isRequired,
};

export default CheckInButton;
