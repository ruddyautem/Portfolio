import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMHr-VlqUIbEz1O46f0lTOFhazOOlFdfQ",
  authDomain: "portfolioruddy.firebaseapp.com",
  projectId: "portfolioruddy",
  storageBucket: "portfolioruddy.appspot.com",
  messagingSenderId: "697222054872",
  appId: "1:697222054872:web:951cad664cf8b3963068ad"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };