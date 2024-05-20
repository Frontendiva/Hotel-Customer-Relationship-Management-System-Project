// CheckOutButton.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, DatePicker } from 'antd';
import styles from '../HotelDetailsPage/RoomDetailsPage.module.css'; 
import { format } from "date-fns";
import moment from 'moment';


const CheckOutButton = ({ onCheckOut }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plannedCheckOutDateInternal, setPlannedCheckOutDateInternal] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const formatedDate = format(plannedCheckOutDateInternal.$d, "yyyy-MM-dd")
    onCheckOut(formatedDate);

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
      <Button type="primary" onClick={showModal} className={styles.checkOutButton}>
        Виписатися
      </Button>
      <Modal
        title="Виписка"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className={styles.modalText}>Ви впевнені, що хочете виписатися?</p>
        <DatePicker
          placeholder="Виберіть планову дату виписки"
          onChange={handleDateChange}
          style={{ marginTop: '10px', width: '100%' }}
          disabledDate={(current) => current && current < moment().endOf('day')}
        />
      </Modal>
    </>
  );
};

CheckOutButton.propTypes = {
  onCheckOut: PropTypes.func.isRequired,
};

export default CheckOutButton;
