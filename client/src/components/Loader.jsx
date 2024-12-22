import React from 'react'

function Loader() {
  return (
    <div class="w-full h-full flex justify-center items-center  cursor-pointer absolute top-0 left-0 backdrop-blur-md " >
    <div class="robot w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full relative overflow-hidden glow">
        <div class="absolute inset-2 bg-black rounded-full"></div>
        <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full opacity-75"></div>
        <div class="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-white rounded-full animate-pulse"></div>
    </div>
    <div class="particle" style={{top: '10%', left: '20%'}}> </div>
    <div class="particle" style={{top: '30%',right: '25%'}}></div>
    <div class="particle" style={{bottom: '15%', left: '30%'}}></div>
    <div class="particle" style={{bottom: '40%', right: '10%'}}></div>
    <p className=' text-amber-400 mx-2 '>Preparing...</p>
</div>
  )
}

export default Loader