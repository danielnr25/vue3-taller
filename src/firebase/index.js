
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3-AgQjuEV7cgCkrtLV4utNPOLlGjOHW4",
  authDomain: "appvue-taller.firebaseapp.com",
  projectId: "appvue-taller",
  storageBucket: "appvue-taller.appspot.com",
  messagingSenderId: "934314237664",
  appId: "1:934314237664:web:ec1d76cf9ce899702bfa85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };