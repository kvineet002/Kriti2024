import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

function ProfileEditModal({ onClose, onSubmit }) {
  const { handleSubmit, control, register } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmitHandler = (data) => {
    console.log(data);
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    //full page as a flex container
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm max-h-screen flex justify-center items-center">
      {/*Close button and form container as a flex-column*/}
      <div className="flex-col mt-5">
        {/* Close button*/}
        <img
          src="/closeicon.svg"
          alt="close"
          className="cursor-pointer flex justify-end pb-2 ml-auto mr-6 sm:mr-36 md:mr-60"
          onClick={onClose}
        />
        {/* Form Container starts from here as a flex-col container */}
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="hero__page text-white flex-col gap-6 justify-center items-center w-[90%] sm:w-[60%] px-5 rounded-lg my_shadow mx-auto border-[#282828] border-2"
        >
          {imagePreview ? (
            <div className="h-[140px] mx-auto w-[140px] overflow-hidden border-white border-2 rounded-[50%] flex justify-center items-center">
              <img
                src={imagePreview}
                alt="profile"
                className="inline mx-auto my-0 w-auto object-cover"
              />
            </div>
          ) : (
            <div className="h-[140px] mx-auto w-[140px] overflow-hidden border-white border-2 rounded-[50%] flex justify-center items-center">
              <img
                src="/profile.svg"
                alt="profile"
                className="inline mx-auto my-0 w-auto object-cover"
              />
            </div>
          )}

          <label
            htmlFor="image"
            className="cursor-pointer flex justify-center items-center py-4 pl-6"
          >
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  id="image"
                  {...field}
                  accept="image/png, image/jpeg"
                  className="text-sm text-white-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-bold
   file:bg-stone-50 file:text-black-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-white-700 file:rounded-lg file:uppercase"
                  onChange={(e) => {
                    handleImageChange(e);
                    field.onChange(e);
                  }}
                />
              )}
            />
          </label>

          <div className="flex justify-center">
            <input
              type="text"
              id="designation"
              {...register("designation")}
              placeholder="Enter Designation"
              className=" block w-[80%] px-2 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none h-8 placeholder:text-black"
            />
          </div>

          <div className="flex justify-center mt-4">
            <textarea
              id="about"
              {...register("about", { maxLength: 200 })}
              rows={4}
              maxLength={200}
              placeholder="About (max-200 words)"
              className=" block w-[90%] px-2 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none h-10 placeholder:text-black leading-5"
            />
          </div>

          <div className="flex justify-center mt-4 gap-5">
            <input
              type="text"
              id="passingYear"
              {...register("startingYear")}
              maxLength={4}
              className="block px-2 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none h-8 placeholder:text-black leading-5 w-[40%]"
              placeholder="Starting Year"
            />
            <input
              type="text"
              id="passingYear"
              {...register("passingYear")}
              maxLength={4}
              className="block px-2 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none h-8 placeholder:text-black leading-5 w-[40%]"
              placeholder="Graduating Year"
            />
          </div>
          <div className="uppercase text-lg px-5 font-extrabold mt-4">
            Socials
          </div>
          <div className=" justify-center flex gap-[4px] sm:gap-3 items-center flex-wrap my-4">
            <div className="flex bg-white rounded-xl  w-[45%] overflow-hidden">
              <img src="/facebook.png" alt="" className="h-8" />
              <input
                type="text"
                id="facebook"
                {...register("facebook")}
                placeholder="Facebook URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>

            <div className="flex bg-white rounded-xl w-[45%] overflow-hidden">
              <img src="/instagram.png" alt="" className="h-8" />
              <input
                type="text"
                id="instagram"
                {...register("instagram")}
                placeholder="Instagram URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>

            <div className="flex bg-white rounded-xl  w-[45%] overflow-hidden">
              <img src="/youtube.png" alt="" className="h-8" />
              <input
                type="text"
                id="youtube"
                {...register("youtube")}
                placeholder="Youtube URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>
            <div className="flex bg-white rounded-xl  w-[45%] overflow-hidden">
              <img src="/twitter.png" alt="" className="h-8" />
              <input
                type="text"
                id="twitter"
                {...register("twitter")}
                placeholder="Twitter URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>
            <div className="flex bg-white rounded-xl  w-[45%] overflow-hidden">
              <img src="/linkedin.png" alt="" className="h-8" />
              <input
                type="text"
                id="linkedin"
                {...register("linkedin")}
                placeholder="Linkedin URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>
            <div className="flex bg-white rounded-xl  w-[45%] overflow-hidden">
              <img src="/github.png" alt="" className="h-8" />
              <input
                type="text"
                id="github"
                {...register("github")}
                placeholder="Github URL"
                className="bg-[#b4b4b4] outline-none placeholder:text-black placeholder:text-sm sm:placeholder:text-base text-black w-[90%] pl-2"
              />
            </div>
          </div>

          <button type="submit" className="bg-white rounded-[33.5px]  border-white border-2 w-[120px] text-center uppercase text-xs h-8 flex justify-center items-center font-bold cursor-pointer text-black mx-auto my-2 hover:bg-[#454545] hover:border-none">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
