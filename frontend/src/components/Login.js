// Example Login component
import axios from 'axios';
import React, {useEffect, useRef, useState } from 'react';


function Login() {
  const [ProfileUrl, setProfileURL] = useState("");
  const fileInputRef = useRef(null);
  const [loading,setLoading]=useState("")
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        setLoading("Uploading...")
        const response= await axios.post('http://localhost:3002/api/users/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const serverURL = response.data.url; // Assuming the server responds with the file URL
        const responce2=await axios.post('http://localhost:3002/api/users', {
          profileUrl: serverURL
        });
        setProfileURL(serverURL)
        // const responce3=await axios.post('http://localhost:3002/api/users/details', {
        //   id:responce2.data.id
        // });
        console.log(responce2.data)
        setLoading("Uploaded!!!")
      } catch (error) {
        setLoading("Failed u fucking bitch")
        console.error('Error uploading file:', error);
      }
    }
  };
  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };
  useEffect(()=>{
    console.log(ProfileUrl)
  },[ProfileUrl])

  return (
    <div>
      <h2 className='  font-bold'>Login Page</h2>
      <div className="flex flex-col items-center mx-10">
                    <label className="text-[#353B47] text-sm mb-3">
                      Your Id Photograph
                    </label>
                    <button
                      type="button"
                      onClick={handleCustomButtonClick}
                      className="cursor-pointer border flex bg-black  justify-center text-white p-4  rounded-full"
                    >
                      Upload here
                      {/* {(ProfileUrl && ProfileUrl.length > 0)||(user.profileUrl && user.profileUrl.length > 0) ? (
                        <div className="relative  w-40 object-cover">
                          <img
                            src={(user.profileUrl && user.profileUrl.length > 0)?user.profileUrl:ProfileUrl}
                            alt="Profile"
                            className=""
                            style={{ width: "200px" }}
                          />
                          <div className="absolute  inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <img src="/edit_profile.svg" width="50px" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src="/camera-icon.svg"
                          alt="Camera"
                          className="w-8 h-8 m-10"
                        />
                      )} */}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileInputChange}
                      accept="image/*"
                    />
                  </div>
                { loading.length>0&& <div className=' text-center text-xl'>{loading}</div>}
                { (ProfileUrl&&ProfileUrl.length>0) &&<img src={ProfileUrl} width={'160px'}/>}
    </div>
  );
}

export default Login;
