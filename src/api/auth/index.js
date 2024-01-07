import {API_URL} from '../index'

class Auth {
    constructor(){}

    async login (userData) {
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
    }
}
  
export default new Auth();