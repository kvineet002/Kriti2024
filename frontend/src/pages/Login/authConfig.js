import { initializeApp } from "firebase/app";
import {getAuth, OAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAhXVzyqs0a8tpEZe4CjxFAc7SSvu3VF-4",
  authDomain: "campus-collabrate.firebaseapp.com",
  projectId: "campus-collabrate",
  storageBucket: "campus-collabrate.appspot.com",
  messagingSenderId: "52318348243",
  appId: "1:52318348243:web:224b50bbec6edd3f954526",
  measurementId: "G-BQEN5ED3F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new OAuthProvider('microsoft.com');
export {auth,provider,firebaseConfig};