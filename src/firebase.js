// Firebase Firestore 연동 예제 (Vite + 바닐라 JS)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTqVU1advrniQEF7C85jSmowgvRt1on88",
  authDomain: "awoe-9be4f.firebaseapp.com",
  projectId: "awoe-9be4f",
  storageBucket: "awoe-9be4f.firebasestorage.app",
  messagingSenderId: "669654639362",
  appId: "1:669654639362:web:d3f79fa06aadcf742b981b",
  measurementId: "G-4PXNGP643J",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore에 값 추가
export async function addData(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// Firestore에서 값 읽기
export async function getData(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}
