import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateCommands = () =>{

  const navigate = useNavigate();
  const [mydata,setmydata] = useState({});


  useEffect(()=>{
  const Localdata = JSON.parse(localStorage.getItem("JarvisData"));
  if(Localdata){
    navigate("/mainpage");
  } 
  },[])

  
  
  const [whatsapp ,setwhatsapp] = useState("");
  const [instagram ,setinstagram] = useState("");  
  const [linkedin ,setlinkedin] = useState("");  
  const [facebook ,setfacebook] = useState("");  
  const [mailLink ,setmaillink] = useState("");  
  const [leetcode ,setleetcode] = useState("");  
  const [github ,setgithub] = useState("");  
  const [name , setname] = useState("");
  


  const handleOnSubmit =  (event)=>{
    event.preventDefault();
    localStorage.setItem('JarvisData',JSON.stringify({name,whatsapp,instagram,linkedin,facebook,mailLink,leetcode,github}));
    navigate('/mainpage')
  }

  const handleonback = ()=>{
    navigate("/mainpage")
  }


  return(
    <>

<div class="flex min-h-screen  items-center justify-center  p-4 ">
    <div class="relative rounded-lg bg-[rgba(255,255,255,0.5)] p-6 backdrop-blur-lg commands command ">
      <h2 class="mb-4  font-bold text-[#1a1b1e] login-heading">Add links</h2>
      <form class="space-y-4">
      <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            Your Name 
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            placeholder="Enter Your Name"
            type="text"
            fdprocessedid="4if9td"
            onChange={e=> setname(e.target.value)}

          />
        </div>
      <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            Github 
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            placeholder="Enter Github Profile Url"
            type="text"
            fdprocessedid="4if9td"
            onChange={e=> setgithub(e.target.value)}

          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="name"
          >
            WhatsApp UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="name"
            type="text"
            placeholder="Enter WhatsApp UrL"
            fdprocessedid="2tvmh"
            onChange={e=> setwhatsapp(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="email"
          >
            Instagram  UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="email"
            placeholder="Enter your Instagram"
            type="email"
            fdprocessedid="rpmq88"
            onChange={e=> setinstagram(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="phone"
          >
            LinkedIn Profile UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="phone"
            type="tel"
            placeholder="Enter your LinkedIn"
            fdprocessedid="69zpen"
            onChange={e=> setlinkedin(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            FaceBook UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            type="text"
            placeholder="Enter your FaceBook"
            fdprocessedid="nnjtod"
            onChange={e=> setfacebook(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            Gmail UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            type="text"
            placeholder="Enter your Gmail"
            fdprocessedid="nnjtod"
            onChange={e=> setmaillink(e.target.value)}
          />
        </div>
       
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            LeetCode UrL
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            type="text"
            placeholder="Enter LeetCode UrL"
            fdprocessedid="nnjtod"
            onChange={e=> setleetcode(e.target.value)}
          />
        </div>
       
      </form>
    </div>
    <div class="col-span-2 flex justify-center ">
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full max-w-md bg-[#1a1b1e] text-white hover:bg-[#2c2d30]"
        type="submit"
        onClick={e=>handleOnSubmit(e)}
      >
        SAVE CHANGES
      </button>
    </div>
  </div>
    </>
  )
}

export default UpdateCommands;