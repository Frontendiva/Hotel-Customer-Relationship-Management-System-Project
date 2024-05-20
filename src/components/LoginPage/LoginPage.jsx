import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import classes from './LoginPage.module.css';
import { login } from '../../store/action/usersActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const auth = getAuth();  

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      dispatch(login({ uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL, accessToken: token }));
      setStatus('success');
      navigate('/rooms');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Authentication failed. Please try again.');
      setStatus('error');
    }
  };

  const onFinish = async (values) => {
    try {
      setStatus('loading');
      await dispatch(login({ ...values }));  
      setStatus('success');
      navigate('/rooms');
    } catch (error) {
      setStatus('error');
      console.error('Login failed:', error.message);
    }
  };

  useEffect(() => {
    if (status === 'success') {
      // Дополнительные действия после успешного входа
    } else if (status === 'error') {
      // Дополнительные действия при ошибке входа
    }
  }, [status]);

  return (
    <div className={classes.pageBackground}>
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
        <Form.Item>
          <Button type="default" onClick={googleSignIn} disabled={status === 'loading'}>
            Sign in with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default LoginForm;
