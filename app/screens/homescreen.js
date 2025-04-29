import db from '../../db'; // Adjust path based on where you place db.js
import { collection, getDocs } from 'firebase/firestore';

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};