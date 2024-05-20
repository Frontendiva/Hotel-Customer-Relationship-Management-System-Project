import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.css'; 

const ContactModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = `Ім'я: ${name}, Телефон: ${phone}, Дата: ${date}, Час: ${time}`;
        const TELEGRAM_BOT_TOKEN = '7043744579:AAGrWFxWurMg_LnU1fmb39tCGr8k8XSkz80';
        const TELEGRAM_CHAT_ID = '432230857';  

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        setName('');
        setPhone('');
        setDate('');
        setTime('');
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={onClose}>×</button>
                <h2>Зв`язатися з нами</h2>
                <form onSubmit={handleSubmit}>
                    <div className={classes.formGroup}>
                        <label htmlFor="name"> Ім`я</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="phone">Телефон</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="date">Дата</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="time">Час</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={classes.submitButton}>Зв`язатися зі мною</button>
                </form>
                {name && phone && date && time && (
                    <div className={classes.contactInfo}>
                        <p><strong>Ім`я:</strong> {name}</p>
                        <p><strong>Телефон:</strong> {phone}</p>
                        <p><strong>Дата:</strong> {date}</p>
                        <p><strong>Час:</strong> {time}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

ContactModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ContactModal;
