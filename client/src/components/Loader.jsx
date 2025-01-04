import React from 'react'

function Loader() {
  return (
    <div class="w-full h-full flex justify-center items-center  cursor-pointer absolute top-0 left-0 backdrop-blur-md z-20  " >
    <div className="logo-container relative w-48 h-48 mx-auto mb-4 cursor-pointer  " >
      <div className="logo-circle absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF574] to-[#1A1F2E] opacity-20 animate-pulse"></div>
      <div className="logo-inner absolute inset-4 rounded-full bg-[#0A0E17] flex items-center justify-center border-2 border-[#FFF574]">
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#FFF574" strokeWidth="2"/>
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="#FFF574" strokeWidth="2"/>
          <circle cx="50" cy="50" r="10" fill="#FFF574"/>
        </svg>
      </div>
      <div className="logo-orbit absolute inset-[-10px] rounded-full border-2 border-[#FFF574] border-dashed animate-spin-slow opacity-30"></div>
    <h1 className="text-1xl font-bold text-[#FFF574] ">wait....</h1>
    </div>
</div>
  )
}

export default Loader