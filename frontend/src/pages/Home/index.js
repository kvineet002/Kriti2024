import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import LoginModal from "../../components/LoginModal";
import Footer from "../../components/Footer";
import InfiniteScrollingGallery from "../../components/Home";
import Navbar2 from "../../components/navbar2";

function Home({SERVER_URL}) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="w-full">
      <div className="hero__page w-full">
        <Navbar2 SERVER_URL={SERVER_URL}/>
        <div className="pt-[200px]  sm:pt-44 sm:pb-[50px] flex flex-col items-center justify-center gap-7">
          <div>
            <div className="bg-[#FFF] py-3 rounded-full  text-[#474646] text-[15px]  md:text-base flex justify-center items-center font-bold">
              <h1 className=" px-12 md:px-16">Endless collaboration possibilities!</h1>
            </div>
          </div>
          <div className=" flex flex-col items-center text-white">
            <img className=" w-[70vw]" src="/herotext.svg" />
            <p className=" text-slate-400  lg:text-xl font-medium  text-center mt-4">
              Empoise, Lorem ipsum dolor sit amet. Transform
            </p>
            <h3 className="mt-12 font-thin font-sans text-center">
              Fostering innovation through collaborative design, development,
              and diverse expertise.
            </h3>
           
            <button
              className="border-2 border-black rounded-[25px] hover:text-black hover:bg-white  w-44 h-12 text-xl my-5 bg-black text-white text-normal mb-[80px]"
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Get Started
            </button>
            <div className="flex justify-center items-center mb-[3rem] cursor-pointer"  onClick={()=>window.scrollTo( {top:window. innerHeight, behavior: 'smooth'})}>
              <img
                src="/ScrollDown.svg"
                className="absolute rotate-infinite w-16 sm:w-20 "
              />
              <img src="/Arrow.svg" alt="" className="absolute" />
            </div>
          </div>
        </div>
      </div>
      {/*Login Modal */}
      {showLoginModal && (
        <LoginModal SERVER_URL={SERVER_URL} onClose={() => setShowLoginModal(false)} />
      )}
<div className=" relative">
<img src="/element2.svg" className=" absolute opacity-10"/>
</div>
      <div className="flex flex-col text-[#d9d9d9] about-us pt-8">
        <h1 className=" pl-[5%] text-4xl  my-6 ">About Us</h1>
        <div className="flex text-[14px] px-auto mt-5 w-5/9 mx-auto text-xl">
          <p className="w-2/5 text-[14px] mx-auto my-8 md:text-xl sm:text-base ">
            Lorem ipsum do Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Numquam molestiae exercitationem volaerat. Voluptas doloribus
            aspernatur temporibus in fugiat eveniet nostrum ipsum?
          </p>
          <p className="w-2/5 text-[14px] mx-auto my-8 md:text-xl sm:text-base ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            quisquam unde consequatur sunt, inventore corporis qui repellat
            natus, repudiandae similique nihil culpa neque eligendi quo,
            voluptates ullam ratione dignissimos! Id.
          </p>
        </div>
      </div>

      {/*Browse Talent*/}
   
      {/*User Cards*/}
<InfiniteScrollingGallery/>


      {/*Showcase Suite */}
      <div className=" h-{511px} m-5 bg-[#272727] my_shadow flex-col rounded-[5px] z-30 ">
        <div className="flex gap-3 pt-3 items-center pl-3">
          <div className="h-[45px] w-[45px] bg-[#262626] rounded-[50%] flex items-center justify-center">
            <img src="/flag.svg" height="30px" width="30px" />
          </div>
          <h1
            className="text-white font-['Bourrasque'] font-normal 
           text-xl"
          >
            Showcase Suite
          </h1>
        </div>
        <div className="flex-col sm:flex md:flex-row-reverse sm:flex-gap-[10px] sm:justify-between sm:items-center">
          <img
            src="/showcase.jpg"
            alt="architects"
            className=" pt-4 rounded-[5px] sm:w-[520px] "
          />
          <div>
            <div className=" pt-3 pl-[15px] sm:px-[80px] font_urbanist text-white  text-[30px] sm:text-[50px] font-extrabold">
              This is how
              <span className=" text-[#AAA] block">good companies </span>
              <span className="text-[#AAA] block">find good projects.</span>
            </div>
            <div className="font_urbanist text-white pt-6 px-3 sm:px-[80px] text-[16px]">
              Access the top 1% of talent on Collampus, and a full suite of
              hybrid profile management tools. This is how collaboration works
              now.
            </div>
            <div className="flex-col px-2 font_urbanist text-white sm:px-[80px] pt-5 text-[12px] gap-2 pb-8">
              <div className="flex items-center gap-2">
                <img
                  src="/pencil.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>Access expert talent to fill your skill gaps</div>
              </div>
              <div className="flex items-center gap-2 py-1">
                <img
                  src="/iconbag.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>
                  Control your workflow: hire, classify and pay your talent
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/iconheadset.svg"
                  alt="pencil"
                  className="w-[20px] h-[20px]"
                />
                <div>Partner with Upwork for end-to-end support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;