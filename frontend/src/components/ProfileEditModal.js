import React, { useState } from "react";

function ProfileEditModal({ onClose, profileEditData, setProfileEditData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, index) => currentYear - 20 + index);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file),
      });

      setProfileEditData((prev) => ({
        ...prev,
        profileUrl: URL.createObjectURL(file),
      }));
    }
  };
  



  return (
    <div className="justify-center items-center flex overflow-x-hidden inset-0 z-50 outline-none focus:outline-none fixed no-scrollbar">
      <div className="relative w-[95%] sm:w-[80%] md:w-[70%] mx-auto text-white bg-[#1e1d1d] rounded-lg pt-10 pb-7 border-[#565656] border-2 mb-10 h-[75vh] overflow-y-scroll md:no-scrollbar mt-14">
        <div className="flex flex-col justify-center items-center ">
          <div className="self-start text-[30px] sm:text-[48px] font-medium mx-8 sm:mx-14">
            Edit Profile
          </div>
          <form
            className="flex flex-col flex-wrap justify-between w-full mt-5 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(profileEditData);
              onClose();
            }}
          >
            {/* Profile and Profile Urls */}
            <div className="flex flex-wrap items-center w-full justify-between">
              <div className="flex flex-col mx-auto">
                {/* Circular Image Preview and Add image button goes here */}
                <div className="rounded-[50%] border-2 border-white w-[200px] h-[200px] md:w-[250px] md:h-[250px] mx-5 mt-6 sm:items-center flex flex-col justify-center shadow-lg shadow-[#ffffff2c]">
                  <img
                    src={
                      selectedImage
                        ? selectedImage.preview
                        : "/profile-icon.jpg"
                    }
                    alt={`Selected Image`}
                    className="w-full h-full object-cover rounded-full"
                  
                  />
                </div>
                <label
                  htmlFor="imageInput"
                  className="bg-white text-black text-sm font-bold w-40 h-7 pt-1 mt-6 mx-auto text-center rounded-lg cursor-pointer hover:bg-[#3a3a3a] "
                >
                  Choose Profile Image
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {/* Socials */}
              <div className="flex flex-col mx-auto md:w-[50%]">
                <div className="py-4 text-[24px] font-semibold">Socials</div>
                <div className="flex flex-col border-2 border-[#565656] py-4 rounded-lg mx-auto w-full">
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/github.svg" alt="" className="px-[2px]" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full "
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            github: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/instagram.svg" alt="" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full"
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            instagram: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/linkedin.svg" alt="" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full"
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            linkedin: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/twitter.svg" alt="" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full"
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            twitter: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/facebook.svg" alt="" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full"
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            facebook: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="display flex mx-4 gap-4 my-2">
                    <img src="/youtube.svg" alt="" />
                    <input
                      type="text"
                      className="bg-transparent border-b-2 
                   outline-none w-full"
                      placeholder="URL Here"
                      onChange={(e) => {
                        const inp = e.target.value;
                        setProfileEditData((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            youtube: inp,
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm font-medium px-10 mt-5">Name</div>
            <input
              type="text"
              className="mx-10 bg-transparent outline-none border-b-2 pb-2 w-[80%] sm:w-[90%] text-lg"
              placeholder="Enter Name"
              onChange={(e) => {
                const inp = e.target.value;
                setProfileEditData((prev) => ({
                  ...prev,
                  Name: inp,
                }));
              }}
            />
            <div className="text-sm font-medium px-10">Designation</div>
            <input
              type="text"
              className="mx-10 bg-transparent outline-none border-b-2 pb-2 w-[80%] sm:w-[90%] text-lg"
              placeholder="Enter Designation"
              onChange={(e) => {
                const inp = e.target.value;
                setProfileEditData((prev) => ({
                  ...prev,
                  designation: inp,
                }));
              }}
              required
            />
            <div className="text-sm font-medium px-10">Email</div>
            <input
              type="text"
              className="mx-10 bg-transparent outline-none border-b-2 pb-2 w-[80%] sm:w-[90%] text-lg"
              placeholder="Enter Email"
              onChange={(e) => {
                const inp = e.target.value;
                setProfileEditData((prev) => ({
                  ...prev,
                  Email: inp,
                }));
              }}
            />
            <div className="text-sm font-medium px-10">About</div>
            <input
              type="text"
              className="mx-10 bg-transparent outline-none border-b-2 pb-2 w-[80%] sm:w-[90%] text-lg h-16"
              placeholder="Enter About"
              onChange={(e) => {
                const inp = e.target.value;
                setProfileEditData((prev) => ({
                  ...prev,
                  about: inp,
                }));
              }}
              required
            />
            <div className="flex mt-4 flex-wrap mx-10 gap-4 justify-between">
              <div className="flex justify-between gap-4">
                <label htmlFor="Joiningyear" className="text-sm font-bold">Joining Year:</label>
                <select
                  id="Joiningyear"
                  value={profileEditData.joiningYear}
                  onChange={(e)=>{
                    setProfileEditData((prev)=>({
                      ...prev,
                      joiningYear: parseInt(e.target.value,10)
                    }))
                  }}
                  className="bg-transparent outline-none border-b-2"
                >
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-black">
                      {year}
                    </option>
                  ))}
                </select>
                
              </div>
              <div className="flex justify-between gap-4 flex-wrap">
                <label htmlFor="endingyear" className="text-sm font-bold">Graduating Year:</label>
                <select
                  id="endingyear"
                  value={profileEditData.graduatingYear}
                  onChange={(e)=>{
                    setProfileEditData((prev)=>({
                      ...prev,
                      graduatingYear: parseInt(e.target.value,10)
                    }))
                  }}
                  className="bg-transparent outline-none border-b-2"
                >
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-black">
                      {year}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>

            <div className="flex gap-4 justify-center mt-6 sm:justify-end sm:mr-10">
              <div
                onClick={onClose}
                className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black hover:opacity-80 "
              >
                Cancel
              </div>
              <button
                type="submit"
                className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor text-black hover:opacity-80"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditModal;
