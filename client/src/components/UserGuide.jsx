import { Link } from "react-router-dom"

const UserGuide = ()=>{
  return(
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E17] to-[#1A1F2E] text-white font-sans overflow-auto relative">
<div className="stars"></div> 
<Link to={"/mainpage"}  className=" absolute top-0 left-20 z-50 text-lg font-bold text-black animate-pulse cursor-pointer w-20 rounded-sm bg-red-400 my-2 text-center  "  >HOME</Link>
<div className="container mx-auto p-1 flex flex-col border-x-2  h-screen relative z-10">
  <center>
  <h2 className="text-2xl text-sky-500 font-bold  w-full bg-white " >Jarvis User Guide</h2>
  </center>
<div className="relative z-10 h-full  overflow-y-auto text-sm p-3 space-y-2">
            <p className=" text-white font-bold p-2 rounded-lg inline-block">
            <p className=" font-bold text-lg  bg-[#E82561]  text-white  rounded-lg text-center w-full ">Intoduction</p>
Welcome to Jarvis, your smart personal assistant designed to automate browser tasks and act as a helpful companion in your daily work. Jarvis runs seamlessly in the background, assisting you with questions, managing tasks, and streamlining your browser experience. Whether you're a student or a working professional, Jarvis is here to enhance your productivity and make your online activities smarter and faster.</p>
            <p className=" text-white font-bold p-2 rounded-lg inline-block w-full">
            <p className="font-bold text-lg  bg-[#E82561]  text-white  rounded-lg text-center w-full  ">Key Features</p>
            1. Web Search: Find answers quickly by including the keyword "Jarvis" in your question. For example:
            <br/>
   - "Jarvis, who is the prime minister of India?"
   <br/>

   - "Jarvis, define artificial intelligence."
   <br/>


2. Social Media and Website Access: Instantly open social media platforms or frequently used websites. Customize these URLs to 
<br/>
match your own profiles or preferences.
<br/>


3. YouTube Control: Play YouTube videos by including the word "play" in your sentence. For example:
<br/>

   - "Play relaxing music."
   <br/>

   - "Play tutorials on React."
   <br/>


4. Browser Automation: Automate tasks like searching specific topics by saying:
<br/>

   - "Search for Python tutorials."
   <br/>

   - "Search who is Elon Musk."
   <br/>


5. Meeting Management: Create and manage meetings directly through voice commands.
<br/>

6. Weather Updates: Get real-time weather updates for your location.
<br/>

7. News Updates: Stay informed with the latest news delivered instantly.

</p>
            <p className=" text-white font-bold p-2 rounded-lg inline-block w-full">
            <p className="font-bold text-lg  bg-[#E82561]  text-white  rounded-lg text-center w-full  "> How to Access Jarvis
            </p>
            Jarvis is free to use and can be accessed on any device. Simply visit the official URL:
            <a className="text-red-400 underline " href="https://j-a-r-v-i-s.netlify.app/">JARVIS</a>
            <br/>

            There is no need to sign up or log in—just open the website and start using Jarvis immediately.
            <br/>
</p>
            <p className=" text-white font-bold p-2 rounded-lg inline-block w-full">
            <p className="font-bold text-lg   bg-[#E82561]  text-white  rounded-lg text-center w-full  ">  Using Voice Commands
            </p>
            General Questions
            <br/>
To get answers, include the word "Jarvis" in your query. Example:
            <br/>
- "Jarvis, how far is the moon?"
            <br/>

 YouTube Commands
            <br/>
Use the keyword "play" to watch videos on YouTube. Example:
            <br/>
- "Play motivational speeches."
            <br/>

 Search Commands
            <br/>
Use "search" or "search for" to perform web searches. Example:
            <br/>
- "Search for best programming languages."

</p>
            <p className=" text-white font-bold p-2 rounded-lg inline-block w-full">
            <p className="font-bold text-lg   bg-[#E82561]  text-white  rounded-lg text-center w-full  ">   Under Development
            </p>
            We are currently developing support for different voice models to further enhance Jarvis’ capabilities.
</p>
          </div>

</div>
</div>
    </>
  )
}

export default UserGuide