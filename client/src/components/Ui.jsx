import { useState } from 'react';
import '../App.css'
import DailogueBox from './d-box';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Sun, Cloud, Wind, Droplets, FileText, Zap, Settings, HelpCircle, User } from 'lucide-react'
const Display = ({transcript,setIsListening,isListening,readOut,weather,result})=>{
const [show,setshow] = useState(false);
const [open,setopen] = useState(false);
const [activeTab, setActiveTab] = useState('main')
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
<div className="min-h-screen bg-gradient-to-br from-[#0A0E17] to-[#1A1F2E] text-white font-sans overflow-auto relative">
<div className="stars"></div>
<div className="container mx-auto p-4 flex flex-col h-screen relative z-10">
  <motion.header 
    className="text-center mb-8"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="logo-container relative w-48 h-48 mx-auto mb-4 cursor-pointer"  onClick={hanleosstart} >
      <div className="logo-circle absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF574] to-[#1A1F2E] opacity-20 animate-pulse"></div>
      <div className="logo-inner absolute inset-4 rounded-full bg-[#0A0E17] flex items-center justify-center border-2 border-[#FFF574]">
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="#FFF574" strokeWidth="2"/>
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="#FFF574" strokeWidth="2"/>
          <circle cx="50" cy="50" r="10" fill="#FFF574"/>
        </svg>
      </div>
      <div className="logo-orbit absolute inset-[-10px] rounded-full border-2 border-[#FFF574] border-dashed animate-spin-slow opacity-30"></div>
    </div>
    <h1 className="text-4xl font-bold text-[#FFF574] mt-4">JARVIS</h1>
  </motion.header>
  
  <main className={`flex-grow flex flex-col lg:flex-row gap-8 ${show ? "show" : "hide"} `}>
    <motion.div 
      className="w-full lg:w-1/3 flex flex-col gap-6"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="transcript-container bg-[#1A1F2E] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[#FFF574]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#FFF574] flex items-center">
          <Mic className="mr-2" /> Transcript
        </h2>
        <div className="h-48 relative">
          <div className="absolute inset-0 bg-[#0A0E17] opacity-50 rounded"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#FFF574] animate-ping opacity-10"></div>
          </div>
          <div className="relative z-10 h-full overflow-y-auto text-sm p-3 space-y-2">
            <p className="bg-[#0A0E17] p-2 rounded-lg inline-block">User: {transcript}</p>
            <p className="bg-[#FFF574] text-[#0A0E17] p-2 rounded-lg inline-block">{result?result:'AssistantAt your service, sir.'}</p>
          </div>
        </div>
      </div>
    </motion.div>
    
    <motion.div 
      className="w-full lg:w-2/3 flex flex-col gap-6"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-[#1A1F2E] rounded-lg p-4 flex space-x-4 border border-[#FFF574]">
        {['main', 'docs', 'settings', 'help'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-[#FFF574] text-[#0A0E17] shadow-lg transform scale-105' 
                : 'text-white hover:bg-[#0A0E17] hover:text-[#FFF574]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'main' && (
          <TabContent key="main">
            <h2 className="text-2xl font-semibold mb-4 text-[#FFF574]">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DashboardCard title="Recent Commands" icon={Zap}>
                <ul className="list-disc list-inside text-white">
                  <li>Check weather</li>
                  <li>Set reminder for meeting</li>
                  <li>Play music</li>
                </ul>
              </DashboardCard>
              <DashboardCard title="Weather" icon={Sun}>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-lg">{weather ? weather?.current?.condition?.text : "Searching..."}</p>
                    <p className="text-sm text-[#FFF574]">{weather ? `${weather?.location?.name}, US` : "Locating..."}</p>
                  </div>
                  <div className="text-4xl font-bold">
                    {weather ? `${weather?.current?.temp_c}°C` : "--°C"}
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm text-white">
                  <span className="flex items-center"><Cloud className="mr-1" /> 20%</span>
                  <span className="flex items-center"><Wind className="mr-1" /> 5 km/h</span>
                  <span className="flex items-center"><Droplets className="mr-1" /> 65%</span>
                </div>
              </DashboardCard>
            </div>
          </TabContent>
        )}
        
        {activeTab === 'docs' && (
          <TabContent key="docs">
            <h2 className="text-2xl font-semibold mb-4 text-[#FFF574] flex items-center">
              <FileText className="mr-2" /> Documentation
            </h2>
            <div className="space-y-4">
              <DocCard  onClick={()=>navigate("/UserGuide")} title="Getting Started" description="Learn how to set up and use JARVIS for the first time." />
              <DocCard    onClick={()=>navigate("/UserGuide")}  title="Voice Commands" description="Explore the list of available voice commands and their functions." />
              <DocCard   onClick={()=>navigate("/UserGuide")} title="Customization" description="Discover how to personalize JARVIS to suit your needs." />
            </div>
          </TabContent>
        )}
        
        {activeTab === 'settings' && (
          <TabContent key="settings">
            <h2 className="text-2xl font-semibold mb-4 text-[#FFF574] flex items-center">
              <Settings className="mr-2" /> Settings
            </h2>
            <div className="space-y-4">
              <SettingsCard title="Voice">
                <select className="w-full bg-[#0A0E17] rounded-md py-2 px-3 text-white border border-[#FFF574]">
                  <option>Default</option>
                  <option>British Male</option>
                  <option>American Female</option>
                </select>
              </SettingsCard>
         
             
            </div>
          </TabContent>
        )}
        
        {activeTab === 'help' && (
          <TabContent key="help">
            <h2 className="text-2xl font-semibold mb-4 text-[#FFF574] flex items-center">
              <HelpCircle className="mr-2" /> Help & Support
            </h2>
            <div className="space-y-4 text-white">
              <p>We value your feedback to improve Jarvis. For any issues, suggestions, or inquiries, please contact:  </p>
              <ul className="list-disc list-inside space-y-2 bg-[#0A0E17] p-4 rounded-lg border border-[#FFF574]">
                <li>Check our <span className="text-[#FFF574]">FAQ</span> for quick answers</li>
                <li>Visit the <span className="text-[#FFF574] cursor-pointer " onClick={()=>navigate("/UserGuide")} >User Forums</span> to connect with other users</li>
                <li>Contact our <span className="text-[#FFF574]">Support Team</span> 
                - Email: ankushcoder497001@gmail.com <br/> - Phone: +91 9301579493
                </li>
              </ul>
              <p className="bg-[#0A0E17] p-4 rounded-lg border border-[#FFF574]">For immediate assistance, try asking JARVIS: "Help me with [your issue]"</p>
            </div>
          </TabContent>
        )}
      </AnimatePresence>
      
      <motion.button 
        className="w-full bg-gradient-to-r from-[#FFF574] to-[#1A1F2E] text-[#0A0E17] font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFF574] focus:ring-opacity-50 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onupdateclick}
      >
        Update Commands
      </motion.button>
    </motion.div>
  </main>
  
  <motion.footer 
    className="mt-8 text-center text-sm text-[#FFF574]"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <a href='https://ankush-kumar-gupta-portfolio.netlify.app/' className="hover:text-white transition-colors duration-300">
      Created by Ankush
    </a>
  </motion.footer>
</div>
</div>

    </>
  )
}

export default Display;


function TabContent({ children }) {
    return (
      <motion.div 
        className="bg-[#1A1F2E] rounded-lg p-6 shadow-lg border border-[#FFF574]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }
  
  function DashboardCard({ title, icon: Icon, children }) {
    return (
      <div className="bg-[#0A0E17] p-4 rounded-lg border border-[#FFF574]">
        <h3 className="text-lg font-semibold mb-2 text-[#FFF574] flex items-center">
          <Icon className="mr-2" /> {title}
        </h3>
        {children}
      </div>
    )
  }
  
  function DocCard({ title, description }) {

    const navigate  = useNavigate()

    return (
      <div onClick={()=>navigate("/UserGuide")} className="bg-[#0A0E17] cursor-pointer p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-[#FFF574]">
        <h3 className="text-lg font-semibold text-[#FFF574]">{title}</h3>
        <p className="text-white">{description}</p>
      </div>
    )
  }
  
  function SettingsCard({ title, children }) {
    return (
      <div className="bg-[#0A0E17] p-4 rounded-lg border border-[#FFF574]">
        <label className="block text-sm font-medium text-[#FFF574] mb-1">{title}</label>
        {children}
      </div>
    )
  }


// <div class={`space-bg min-h-screen text-white font-sans  `}>
// <div class="container mx-auto p-4 flex flex-col h-screen">
//     <header class="text-center mb-8 fade-in-top">
//         <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
//            J.A.R.V.I.S
//         </h1>
//     </header>
    
//     <main class="flex-grow flex flex-col md:flex-row gap-8">
//         <div class="w-full md:w-1/2 flex justify-center items-center relative cursor-pointer" onClick={hanleosstart}>
//             <div class="robot w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full relative overflow-hidden glow">
//                 <div class="absolute inset-2 bg-black rounded-full"></div>
//                 <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full opacity-75"></div>
//                 <div class="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-white rounded-full animate-pulse"></div>
//             </div>
//             <div class="particle" style={{top: '10%', left: '20%'}}></div>
//             <div class="particle" style={{top: '30%',right: '25%'}}></div>
//             <div class="particle" style={{bottom: '15%', left: '30%'}}></div>
//             <div class="particle" style={{bottom: '40%', right: '10%'}}></div>
//         </div>
        
//         <div class={`w-full md:w-1/2 space-y-6 ${show ? "show" : "hide"} ` } style={{ animationDelay: "0.2s" }} >
//             <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 glow fade-in-right">
//                 <h2 class="text-xl font-semibold mb-2 text-teal-400">Transcript</h2>
//                 <div class="h-32 overflow-y-auto text-sm">
//                     <p>User: { transcript || "say hello"}</p>
//                     <p class="text-blue-400">Assistant: Let me check that for you...</p>
//                 </div>
//             </div>
            
//             <div class="bg-gray-800 bg-opacity-50 rounded-lg p-4 glow fade-in-right" style={{ animationDelay: "0.2s" }} >
//                 <h2 class="text-xl font-semibold mb-2 text-teal-400">Weather</h2>
//                 <p class="text-sm">{weather ? weather?.current?.condition?.text :"searching..."},{weather ? weather?.current?.temp_c : "saerching..."}°C</p>
//                 <p class="text-xs text-gray-400">{weather ? weather?.location?.name : "searching..."}, IN</p>
//             </div>
            
//             <button class="w-64 bg-gradient-to-r from-blue-600 to-teal-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 glow fade-in-bottom" onClick={onupdateclick} >
//                 Update Commands
//             </button>
//         </div>
//     </main>
    
//     <footer class="mt-8 text-center text-sm text-gray-500 fade-in-bottom" style={{animationDelay: '0.4s'}}>
//         <a href='https://ankush-kumar-gupta-portfolio.netlify.app/' >Created by Ankush</a>
//     </footer>
// </div>
// </div>