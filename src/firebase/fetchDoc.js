import { firestore } from './firebase'; 
import { doc, getDoc } from 'firebase/firestore'; 

export const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(firestore, 'users', uid); // Use doc function from Firebase
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log(userDoc.data());
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
