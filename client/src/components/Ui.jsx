import { useState } from 'react';
import '../App.css'
import DailogueBox from './d-box';
import { useNavigate } from 'react-router-dom';

const Display = ({transcript,setIsListening,isListening,readOut,weather})=>{
const [show,setshow] = useState(false);
const [open,setopen] = useState(false);
const navigate = useNavigate()
  const hanleosstart = ()=>{
   setshow(true);
   setIsListening(!isListening);
  }

  const showdialogeubox = ()=>{
setopen(!open);
  }

  const onupdateclick = ()=>{
  localStorage.removeItem('JarvisData');
  readOut('please fill the details');
  navigate("/")
}
  return(
    <>
  <div class={`space-bg min-h-screen text-white font-sans  `}>
    <div class="container mx-auto p-4 flex flex-col h-screen">
        <header class="text-center mb-8 fade-in-top">
            <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
               J.A.R.V.I.S
            </h1>
        </header>
        
        <main class="flex-grow flex flex-col md:flex-row gap-8">
            <div class="w-full md:w-1/2 flex justify-center items-center relative cursor-pointer" onClick={hanleosstart}>
                <div class="robot w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full relative overflow-hidden glow">
                    <div class="absolute inset-2 bg-black rounded-full"></div>
                    <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full opacity-75"></div>
                    <div class="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div class="particle" style={{top: '10%', left: '20%'}}></div>
                <div class="particle" style={{top: '30%',right: '25%'}}></div>
                <div class="particle" style={{bottom: '15%', left: '30%'}}></div>
                <div class="particle" style={{bottom: '40%', right: '10%'}}></div>
            </div>
            
            <div class={`w-full md:w-1/2 space-y-6 ${show ? "show" : "hide"} ` } style={{ animationDelay: "0.2s" }} >
                <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 glow fade-in-right">
                    <h2 class="text-xl font-semibold mb-2 text-teal-400">Transcript</h2>
                    <div class="h-32 overflow-y-auto text-sm">
                        <p>User: { transcript || "say hello"}</p>
                        <p class="text-blue-400">Assistant: Let me check that for you...</p>
                    </div>
                </div>
                
                <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 glow fade-in-right" style={{ animationDelay: "0.2s" }} >
                    <h2 class="text-xl font-semibold mb-2 text-teal-400">Weather</h2>
                    <p class="text-sm">{weather ? weather?.current?.condition?.text :"searching..."},{weather ? weather?.current?.temp_c : "saerching..."}°C</p>
                    <p class="text-xs text-gray-400">{weather ? weather?.location?.name : "searching..."}, IN</p>
                </div>
                
                <button class="w-64 bg-gradient-to-r from-blue-600 to-teal-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 glow fade-in-bottom" onClick={onupdateclick} >
                    Update Commands
                </button>
            </div>
        </main>
        
        <footer class="mt-8 text-center text-sm text-gray-500 fade-in-bottom" style={{animationDelay: '0.4s'}}>
            <a href='https://ankush-kumar-gupta-portfolio.netlify.app/' >Created by Ankush</a>
        </footer>
    </div>
</div>
    </>
  )
}

export default Display;