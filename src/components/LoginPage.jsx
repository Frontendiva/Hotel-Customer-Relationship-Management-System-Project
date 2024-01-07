// LoginPage.jsx

import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../action/usersActions'; // Убедитесь, что это правильный путь
import '../styles/LoginPage.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const { username, password } = values;
      dispatch(login({ username, password }));
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-form-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="login-form"
      >
        <h2 className="login-form-title">Authentication</h2>

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
