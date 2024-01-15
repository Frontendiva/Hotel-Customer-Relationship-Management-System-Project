import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/usersActions';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const onFinish = async (values) => {
    try {
      setStatus('loading');
      const response = await dispatch(login({ ...values }));
      console.log(response);
      setStatus('success');
      console.log('Login successful!');
      
      // Перенаправление на страницу HotelListPage после успешного входа
      navigate('/rooms'); // Убедитесь, что у вас есть маршрут для HotelListPage по пути '/rooms'
    } catch (error) {
      setStatus('error');
      console.error('Login failed:', error.message);
    }
  };

  useEffect(() => {
    // Вы можете выполнить дополнительные действия при изменении статуса, если это необходимо
    if (status === 'success') {
      // Дополнительные действия после успешного входа
    } else if (status === 'error') {
      // Дополнительные действия при ошибке входа
    }
  }, [status]);

  return (
    <div className={classes.loginFormContainer}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className={classes.loginForm}
      >
        <h2 className={classes.loginFormTitle}>Authentication</h2>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
