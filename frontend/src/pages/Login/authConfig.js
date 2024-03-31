import { initializeApp } from "firebase/app";
import {getAuth, OAuthProvider,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDECq8D3Va4P0rmBVJJYwmJDyz1UdcVQq8",
  authDomain: "auth0-17635.firebaseapp.com",
  projectId: "auth0-17635",
  storageBucket: "auth0-17635.appspot.com",
  messagingSenderId: "449133453534",
  appId: "1:449133453534:web:89c1fccc7a32a69c3d224f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);



const microsoftProvider=new OAuthProvider('microsoft.com');

const googleProvider=new GoogleAuthProvider();

const githubProvider=new GithubAuthProvider();

export {auth,microsoftProvider,firebaseConfig,googleProvider,githubProvider};