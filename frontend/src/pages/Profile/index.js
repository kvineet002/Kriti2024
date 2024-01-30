import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { firebaseConfig } from '../Login/authConfig';

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
function Profile({isAuthenticated}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [serverURL, setServerURL] = useState('');
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile ) {
      try {
        const storageRef = ref(storage, `${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadUrl = await getDownloadURL(storageRef);
        setServerURL(downloadUrl);
        console.log('File available at', downloadUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (

    <div>
        <Navbar/>
        {isAuthenticated&&<div>isAuthenticated true user</div>}
        your profile page
        <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button className=' border border-black  rounded-full p-2 text-xs hover:bg-gray-500' onClick={handleUpload}>Upload Profile Picture</button>
      <img src={serverURL}/>
      <object className=' h-screen w-screen' data={serverURL}/>
    </div>
      
    </div>
  )
}

export default Profile
