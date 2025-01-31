import axios from "axios";

export const TellNewz = (text)=>{
  readOut(text);
  const random =Math.floor(Math.random()*10);
  const news = newz[random]?.description;
  readOut(`todays headlines are ,  ${news}`);
 }

 export  const TellWeather = (text) =>{
   if(!weather){
     return;
   }
   readOut(text);
   const city = weather?.location?.name;
   const deg = weather?.current?.temp_c
   const inv = weather?.current?.condition?.text     
   readOut(`in ${city} there is ${deg} degree temprature and weather is ${inv}`)
 }

 export  const openLink = (link, fallbackMessage, successMessage) => {
   if (!link) {
     readOut(fallbackMessage);
     return;
   }
   window.open(link);
   readOut(successMessage);
 };

 export  const performSearch = (input, action) => {
   const searchQuery = input.split(" ").join("+");
   const mainstr = searchQuery.split("+").join("");
   readOut(`${action} for ${mainstr}`);
 const openedWindow = window.open(`https://www.google.com/search?q=${searchQuery}`);
 };

 export  function searchYouTube(query) {
   const modifiedQuery = query.replace(/^play\s+/i, ""); // Removes 'play' if it's at the start of the query
  readOut(`playing,${modifiedQuery}`);
   const baseURL = "https://www.youtube.com/results?search_query=";
   const searchURL = baseURL + encodeURIComponent(modifiedQuery);

   window.open(searchURL, "_blank");
}
export  const closeWindow = (text)=>{
 if(newWindow){
   newWindow.close();
  setNewWindow(null);
  readOut(text);
 }
 console.log("closed",newWindow)
}
export  const FetchWeather =(mydata)=>{
 fetch(`http://api.weatherapi.com/v1/current.json?key=6d59e65cfd974bec95c35236242911&q=${mydata?mydata?.city:"ambikapur"}`)
 .then((res)=>res.json())
 .then((data)=>{
  return data;
 })
 .catch((err)=>console.log(err))
}
export  const FetchNewz =()=>{
 fetch(`https://newsdata.io/api/1/news?apikey=pub_6082846201c51760e32f0f88540fdeace2017&q=politics&country=in&language=en,hi&category=crime,education,entertainment,politics,science`)
 .then((res)=>res.json())
 .then((data)=>{
  return data.result;
 })
 .catch((err)=>console.log(err))
}

export  const handleGenerate = async (inputText,setLoading,setresult) => {
 const modifiedQuery = inputText.replace(/^jarvis\s+/i, "");
 setLoading(true);
 try {
     const response = await axios.post('https://jarvis-1-u40v.onrender.com/generate', { text: modifiedQuery });
     setresult(response.data);
     readOut(response.data);
 } catch (error) {
     console.error("Error generating text:", error);
     readOut("An error occurred. Please try again.");
 } finally {
     setLoading(false);
 }
};


export const readOut = (message) => {
  // Check if SpeechSynthesis is supported

  const voiceName = 'Alex'
  const  pitch = 1.2
  const  rate = 0.8
  const volume = 0.8

  if (!window.speechSynthesis) {
    console.error("Speech Synthesis not supported in this browser.");
    return;
  }

  // Get available voices
  const voices = window.speechSynthesis.getVoices();

  // Find the desired voice by name
  const selectedVoice = voices.find(voice => voice.name === voiceName);

  // Fallback if the desired voice is not available
  if (!selectedVoice) {
    console.warn(`Voice "${voiceName}" not found. Using the default voice.`);
  }

  // Create a new SpeechSynthesisUtterance instance
  const msg = new SpeechSynthesisUtterance(message);
  msg.voice = selectedVoice || voices[0]; // Use the selected voice or the first available
  msg.pitch = pitch; // Set the pitch
  msg.rate = rate;   // Set the speaking rate
  msg.volume = volume; // Set the volume

  // Speak the message
  window.speechSynthesis.speak(msg);

  // Log the action (optional)
};


export const HandleOnOpenApp = async (prompt)=>{
  let modifiedQuery = prompt.replace(/^open\s+/i, "");
  modifiedQuery = ConstructName(modifiedQuery);
    try {
     const res = await axios.post('http://localhost:5001/open-app',{appName:modifiedQuery})
    } catch (error) {
      console.log(error)
    }
}


const ConstructName = (appName)=>{
  let result  = appName;
  if(appName.includes("calculator")) result = "calc"
  else if(appName.includes("file")) result = "explorer"
  else if(appName.includes("player") || appName.includes("media")) result  = "wmplayer"
  else if (appName.includes("task")) result = "taskmgr"
  else if(appName.includes("control") || appName.includes("panel")) result = "control"
  else if(appName.includes("settings") || appName.includes("setting")) result = "start ms-settings:"
  else if(appName.includes("code")) result = "code"
  return result;
}


const commands = {
  mouse: [       // Moves the mouse to specific coordinates
    "click ",         // Performs a single mouse click
    "double  ",  // Performs a double-click
    "up",           // Scrolls the mouse wheel up
    "down",         // Scrolls the mouse wheel down
  ],
  keys: [
    "close",        // Presses Alt+F4 to close the current window
    "switch window",       // Alt+Tab to switch between windows
    "restart system",      // Restarts the system
    "shutdown system",     // Shuts down the system
    "volume up",           // Increases the system volume
    "volume down",         // Decreases the system volume
    "mute volume",         // Mutes the system
    "play or pause media", // Toggles play/pause for media
    "next track",          // Moves to the next track
    "previous track",      // Moves to the previous track
    "copy text",           // Copies selected text (Ctrl+C)
    "paste text",          // Pastes text (Ctrl+V)
    "cut text",            // Cuts the selected text (Ctrl+X)
    "select all text",     // Selects all text (Ctrl+A)
    "find text",
     "shut down",
     "lock screen",
     "minimize all",
     "minimise all",
     "mute",           // Opens the search bar (Ctrl+F)
  ],
};


export const HandleSystemCommands = async (input) =>{
     //for mouse commands
     console.log(input.trim().split(" ")[0])
      const isValidMouse = commands.mouse.filter((str)=>str.includes(input.trim().split(" ")[0]));
      if(isValidMouse.length>0){
        try {
          const res = await axios.post('http://localhost:5001/mouse-action',{action : isValidMouse[0]});
          readOut(res.data);
          console.log(res)
        } catch (error) {
          console.log(error)
        } 
      }
      //for key commands 
      const isValidKey = commands.keys.filter((str)=>str.includes(input.trim().split(" ")[0]));
      if(isValidKey.length>0){
        try {
          const res = await axios.post('http://localhost:5001/key' , {command : isValidKey[0]});
          readOut(res.data)
          console.log(res.data)
        } catch (error) {
          console.log(error);
        }
       
      }
}




