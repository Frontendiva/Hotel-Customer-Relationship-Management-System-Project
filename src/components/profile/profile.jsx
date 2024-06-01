import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action/usersActions'; 
import classes from './ProfilePage.module.css';
import Header from '../Header/Header';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    photoURL: '',
    birthDate: '',
    location: '',
    data: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();
  
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Теперь состояние аутентификации будет сохраняться между обновлениями страницы
      })
      .catch((error) => {
        // Обработка ошибок
        console.error('Ошибка при настройке сохранения состояния аутентификации:', error);
      });

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
      } else {
        setUser(null);
        setUserData({});
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.log('Документ не найден!');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  };

  const saveUserData = async () => {
    if (user) {
      try {
        await firestore.collection('users').doc(user.uid).update(userData);
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка при сохранении данных пользователя:', error);
      }
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Проверка, существуют ли данные пользователя в Firestore, если нет - создать их
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      if (!userDoc.exists()) {
        await firestore.collection('users').doc(user.uid).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          birthDate: '',
          location: '',
          data: ''
        });
      }

      dispatch(login({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: user.accessToken
      }));

      navigate('/profile');
      await fetchUserData(user.uid);
    } catch (error) {
      console.error('Ошибка авторизации через Google:', error);
      alert('Ошибка аутентификации. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <>
      <Header />
      <div className={classes.profileContainer}>
        {user ? (
          <div>
            <h2>Ласкаво просимо, {userData.displayName}</h2>
            <div className={classes.profileInfo}>
              <div className={classes.profileImageContainer}>
                <img src={userData.photoURL} alt="Фото профілю" className={classes.profileImage} />
              </div>
              <div className={classes.profileDetails}>
                <p><strong>Ім`я:</strong> {userData.displayName}</p>
                <p><strong>Електронна пошта:</strong> {userData.email}</p>
                <p><strong>Дата народження:</strong> {userData.birthDate}</p>
                <p><strong>Місце проживання:</strong> {userData.location}</p>
              </div>
            </div>
            {isEditing ? (
              <div className={classes.editProfile}>
                <input
                  type="text"
                  value={userData.displayName}
                  onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                  placeholder="Ваше ім'я"
                  className={classes.input}
                />
                <input
                  type="text"
                  value={userData.birthDate}
                  onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                  placeholder="Дата народження"
                  className={classes.input}
                />
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  placeholder="Місце проживання"
                  className={classes.input}
                />
                <textarea
                  value={userData.data}
                  onChange={(e) => setUserData({ ...userData, data: e.target.value })}
                  placeholder="Ваші дані"
                  className={classes.textArea}
                />
                <button onClick={saveUserData} className={classes.saveButton}>Зберегти</button>
              </div>
            ) : (
              <div className={classes.viewProfile}>
                <p className={classes.userData}>{userData.data}</p>
                <button onClick={() => setIsEditing(true)} className={classes.editButton}>Редагувати</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Будь ласка, увійдіть у свій обліковий запис.</p>
            <button onClick={googleSignIn} className={classes.googleSignInButton}>Войти через Google</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
