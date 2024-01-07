// LoginPage.jsx

import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/usersActions'; // Убедитесь, что это правильный путь
import classes from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onFinish = async (values) => {
    try {
      const { username, password } = values;
      const responce = await dispatch(login({ username, password }));
      console.log(responce)
      console.log('Login successful!');
      navigation('/home') ;
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
