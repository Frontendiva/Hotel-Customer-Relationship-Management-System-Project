// api.js

const API_URL = 'hhttp://localhost:3000/';

export const loginUserAPI = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Обработка ошибок на стороне сервера
      throw new Error('Authentication failed');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // Обработка ошибок сети и других ошибок
    console.error('API Error:', error.message);
    throw new Error('API Error');
  }
};
