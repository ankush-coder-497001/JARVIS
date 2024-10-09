import { useState } from 'react';
import '../App.css'
import DailogueBox from './d-box';
import { useNavigate } from 'react-router-dom';

const Display = ({transcript,setIsListening,isListening,readOut})=>{
const [show,setshow] = useState('hide');
const [hide,sethide] = useState('show');
const [open,setopen] = useState(false);
const navigate = useNavigate()
  const hanleosstart = ()=>{
    setIsListening(!isListening);
    setshow('show');
    sethide("hide")
    console.log(isListening);
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


<div class="flex flex-col min-h-screen bg-background text-foreground bg-cyan-50  dark:text-primary-foreground">
  <header class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background text-white bg-dark bg-gray-900  border-b border-muted dark:border-muted-foreground/20">
    <div class="flex items-center gap-2">
      <h1 class={`text-lg font-semibold  ${hide} `}>J A R V I S</h1>
    <div class={`flex items-center jarves animated-text ${show} `}>
      <h1 class="text-lg font-semibold">J</h1>
      <h1 class="text-lg font-semibold">A</h1>
      <h1 class="text-lg font-semibold">R</h1>
      <h1 class="text-lg font-semibold">V</h1>
      <h1 class="text-lg font-semibold">I</h1>
      <h1 class="text-lg font-semibold">S</h1>
      </div>
    </div>
    <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full" 
    onClick={showdialogeubox}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
      </svg>
      <span class="sr-only">Available Commands</span>
    </button>
  </header>
  <main class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ">
    <div class="flex items-center justify-center cursor-pointer" onClick={hanleosstart}>
      <div class="relative w-[400px] aspect-square">
        <div class="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#ffa500] rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-4xl font-bold text-white animate-pulse">J-A-R-V-I-S</div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-[300px] h-[300px] bg-[url('/rocket.png')] bg-contain bg-no-repeat animate-spin-slow"></div>
        </div>
      </div>
    </div>
    <div class={`flex flex-col gap-4 mess-box ${show} `}>
      {/* jarves */}
      <div class="bg-card rounded-lg p-4 shadow-md main-sec ">
        <h2 class="text-lg font-semibold mb-2">J.A.R.V.I.S</h2>
        <div class="space-y-4">
          <div class="flex items-start items-center gap-3">
            <span class="relative flex overflow-hidden rounded-full w-8 h-8 shrink-0">
              <span class="flex h-full w-full items-center  justify-center rounded-full bg-muted"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUrSl1xKnymFK6ynCCGnja--KmhjW_Spnrw&s" alt="" /></span>
            </span>
            <div class="flex-1 bg-muted rounded-lg p-3">
              <p>{'Hello, how can I assist you today?'}</p>
            </div>
          </div>
        </div>
      </div>


{/* User */}

      <div class="bg-card rounded-lg p-4 shadow-md main-sec">
        <h2 class="text-lg font-semibold mb-2">USER</h2>
        <div class="space-y-4">
          <div class="flex items-start items-center gap-3">
            <span class="relative flex overflow-hidden rounded-full w-8 h-8 shrink-0">
              <span class="flex h-full w-full items-center  justify-center rounded-full bg-muted"><img src="https://png.pngtree.com/png-vector/20190121/ourmid/pngtree-blue-user-cartoon-icon-character-png-image_519776.jpg" alt="" /></span>
            </span>
            <div class="flex-1 bg-muted rounded-lg p-3">
              <p>{transcript || '..What is React ?'}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-card rounded-lg p-4 shadow-md main-sec update-button" onClick={onupdateclick} >
      UPDATE YOU COMMANDS
      </div>
    </div>
  </main>
    <h3 className='main-sec' >Created-By-Ankush-Kumar-Gupta @2024</h3>
</div>

{open && <DailogueBox readOut = {readOut}/>}
    </>
  )
}

export default Display;