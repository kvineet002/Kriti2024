import axios from "axios";
import React, { useState } from "react";

function GeminiChat({ SERVER_URL }) {
  const [prompt, setPrompt] = useState("");

  const [chatResponse, setChatResponse] = useState([
    "Hello! I am Gemini, your personal assistant. How can I help you today?",
  ]);
  const [loading,SetLoading]= useState(false);
  const GeminiAPI = async () => {
    try {
        SetLoading(true)
        setChatResponse([...chatResponse, prompt])
      setPrompt("")
        const response = await axios.post(`${SERVER_URL}/ai/gemini/chat`, {
          prompt: prompt+"please provide me the answer in brief",
        });
        SetLoading(false)
      setChatResponse([...chatResponse, prompt, response.data])
    } catch {
        console.error("Error in fetching data");
    }
  };
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(!isChatOpen);
  };
  const processText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/).filter(Boolean);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part.replace(/\*/g, ''); // Remove any extra * characters
    });
  };
  return (
    <div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <button
          className="h-16 p-3 w-16 bg-white rounded-lg"
          onClick={handleChatOpen}
        >
          <div>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                fill="url(#prefix__paint0_radial_980_20147)"
              />
              <defs>
                <radialGradient
                  id="prefix__paint0_radial_980_20147"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                >
                  <stop offset=".067" stop-color="#9168C0" />
                  <stop offset=".343" stop-color="#5684D1" />
                  <stop offset=".672" stop-color="#1BA1E3" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </button>
      </div>
      {isChatOpen && (
        <div style={{ position: "fixed", bottom: "100px", right: "25px" }}>
          {/* Chat box content */}
          <div className="close-button h-[500px] md:w-[400px] w-[325px] overflow-scroll  no-scrollbar flex flex-col justify-between rounded-md p- bg-white">
            <div>
              <div className=" flex justify-center text-black fixed md:w-[400px] w-[325px]  bg-gradient-to-r from-green-400 to-blue-500 order-2 border-black  rounded-t-md py-4 rounded-xl ">
                Google Gemini
              </div>
              <div className=" flex flex-col my-20 gap-1 px-2">
                {chatResponse.map((response) => {
                  return (
                    <div className=" flex gap-">
                      <div className=" text-black rounded-full "></div>
                      <div className=" bg-gray-300 rounded-md text-black text-sm p-2 px-6 justify-self-start">
                        {processText(response)}
                      </div>
                      
                    
                    </div>
                  );
                })}
               { loading&&<div className=" bg-gray-300 rounded-md text-black text-sm p-2 px-6 justify-self-start">
                        Typing.....
                      </div>}
              </div>
            </div>
            <div className=" w-full flex fixe justify-between p-2 px-4 ">
              <input
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
                placeholder="Enter the prompt"
                className="  border-black border text-black p-3 outline-none w-4/5"
              />
              <button
                onClick={GeminiAPI}
                disabled={loading}
                className=" mr- p-2 bg-black justify-center flex items-center"
              >
                Send
              </button>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default GeminiChat;
