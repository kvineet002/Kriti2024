import React from "react";
import Navbar from "../../components/Navbar";
import "./Home.css";
function Home() {
  return (
    <div className="w-full">
      <div className="hero__page w-full">
        <Navbar />
        <div className="pt-[200px] flex flex-col items-center justify-center gap-7">
          <div>
            <input
              className="bg-[#FFF] h-10 rounded-2xl w-[40vw] max-w-[400px] text-center"
              type="text"
              placeholder="Endless collaboration possibilities!"
            />
          </div>
          <div className=" flex flex-col items-center text-white">
            <img className=" w-[70vw]" src="/herotext.svg" />
            <p className=" text-slate-400  lg:text-xl font-medium mt-4">
              Empoise, Lorem ipsum dolor sit amet. Transform
            </p>
            <h3 className="mt-12 font-thin font-sans text-center">
              Fostering innovation through collaborative design, development,
              and diverse expertise.
            </h3>
            <button className="border-2 border-black rounded-[25px]  w-44 h-12 text-xl my-5 bg-black text-white text-normal mb-[80px]">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-[#d9d9d9] about-us">
        <h1 className="text-center text-6xl  my-6 ">About Us</h1>
        <div className="flex text-[16px] px-auto mt-5 w-5/9 mx-auto text-xl">
          <p className="w-2/5 text-[16px] mx-auto my-8 md:text-xl sm:text-base ">
            Lorem ipsum do Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Numquam molestiae exercitationem volaerat. Voluptas doloribus
            aspernatur temporibus in fugiat eveniet nostrum ipsum?
          </p>
          <p className="w-2/5 text-[16px] mx-auto my-8 md:text-xl sm:text-base ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            quisquam unde consequatur sunt, inventore corporis qui repellat
            natus, repudiandae similique nihil culpa neque eligendi quo,
            voluptates ullam ratione dignissimos! Id.
          </p>
        </div>
      </div>
      {/*Showcase Suite */}
      <div className=" h-{511px} m-5 bg-[#2d2c2c] shadow-xl flex-col rounded-[5px] ">
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
        <div className="flex-col sm:flex sm:flex-row-reverse sm:flex-gap-[10px] sm:justify-between sm:items-center ">
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
            Access the top 1% of talent on Collampus, and a full suite of hybrid profile management tools. This is how collaboration works now.
            </div>
            <div className="flex-col px-2 font_urbanist text-white sm:px-[80px] py-5 text-[12px] gap-2">
              <div className="flex items-center gap-2">
                <img src="/pencil.svg" alt="pencil"  
                 className="w-[20px] h-[20px]"/>
                <div>Access expert talent to fill your skill gaps</div>
              </div>
              <div className="flex items-center gap-2 py-1">
              <img src="/iconbag.svg" alt="pencil"  
                 className="w-[20px] h-[20px]"/>
                <div>Control your workflow: hire, classify and pay your talent</div>
              </div>
              <div className="flex items-center gap-2">
              <img src="/iconheadset.svg" alt="pencil"  
                 className="w-[20px] h-[20px]"/>
                <div>
                Partner with Upwork for end-to-end support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
