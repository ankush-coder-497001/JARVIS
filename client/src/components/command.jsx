import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Commands = () =>{


  useEffect(()=>{
const local = JSON.parse(localStorage.getItem("JARVIS"))
if(local){
  navigate("/mainpage")
}
  },[])

 const navigate = useNavigate();

  const [name ,setname] = useState("");
  const [email ,setemail] = useState("");
  const [phone ,setphone] = useState(0);
  const [password ,setpassword] = useState("");
  const [WhatsApp ,setwhatsapp] = useState("");
  const [Instagram ,setinstagram] = useState("");  
  const [linkedin ,setlinkedin] = useState("");  
  const [facebook ,setfacebook] = useState("");  
  const [gmaillink ,setmaillink] = useState("");  
  const [leetcode ,setleetcode] = useState("");  
  const [github ,setgithub] = useState("");  


  const handleOnSubmit =  (event)=>{
    event.preventDefault();

//check if fields are not filled

if(name==="" || email=== "" || password==""){
  alert("Please fill all fields");
  return;
}

   axios.post("http://localhost:5000/User/GetUserData",{name,email,password,phone,WhatsApp,Instagram,linkedin,facebook,gmaillink,leetcode,github})
   .then((res)=>{
    localStorage.setItem("JARVIS",JSON.stringify(res.data));
    navigate("/mainpage")
   })
  }


  return(
    <>
     <header class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background text-white bg-dark bg-gray-900  border-b border-muted dark:border-muted-foreground/20" style={{height:"40px"}}>
    <div class="flex items-center gap-2">
    <div class={`flex items-center jarves animated-text`}>
      <h1 class="text-lg font-semibold">L</h1>
      <h1 class="text-lg font-semibold">o</h1>
      <h1 class="text-lg font-semibold">G</h1>
      <h1 class="text-lg font-semibold">I</h1>
      <h1 class="text-lg font-semibold">N</h1>
      </div>
    </div>
  </header>
<div class="flex min-h-screen w-full items-center justify-center bg-cyan-300  p-4" style={{height:"calc(100vh - 40px)"}}>
  <div class="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 ">
    <div class="relative rounded-lg bg-[rgba(255,255,255,0.5)] p-6 backdrop-blur-lg commands ">
      <h2 class="mb-4 text-2xl font-bold text-[#1a1b1e] login-heading ">Login</h2>
      <form class="space-y-4">
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="name"
          >
            Name
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="name"
            placeholder="Enter your name"
            type="text"
            fdprocessedid="k1k7xa"
           onChange={(e)=> setname(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="email"
          >
            Email
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="email"
            placeholder="Enter your email"
            type="email"
            fdprocessedid="hh5r2q"
            onChange={e=> setemail(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="phone"
          >
            Phone(optional)
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="phone"
            placeholder="Enter your phone number"
            type="number"
            fdprocessedid="yxbpcl"
            onChange={e=> setphone(e.target.value)}
          />
        </div>
        <div>
          <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1b1e]"
            for="company"
          >
            Password
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[rgba(255,255,255,0.5)] text-[#1a1b1e] placeholder:text-[#1a1b1e]"
            id="company"
            placeholder="Enter your Password"
            type="text"
            fdprocessedid="4if9td"
            onChange={e=> setpassword(e.target.value)}

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
      </form>
    </div>
    <div class="relative rounded-lg bg-[rgba(255,255,255,0.5)] p-6 backdrop-blur-lg commands ">
      <h2 class="mb-4 font-bold text-[#1a1b1e] login-heading ">Add Links</h2>
      <form class="space-y-4">
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
        Submit
      </button>
    </div>
  </div>
</div>
    </>
  )
}

export default Commands;