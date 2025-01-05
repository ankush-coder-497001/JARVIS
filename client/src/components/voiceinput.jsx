import React, { useState, useEffect } from 'react';
import Display from './Ui';
import axios from 'axios';
import Loader from './Loader';

const VoiceInput = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mydata, setMyData] = useState({});
  const [newWindow, setNewWindow] = useState(null);
  const recognitionRef = React.useRef(null);
  const [weather,setWeather] = useState(null)
  const [newz,setNewz] = useState(null)
  const [Loading,setLoading] = useState(false);
  const [result,setresult] = useState()

  useEffect(() => {
    FetchNewz()
    const data = JSON.parse(localStorage.getItem('JarvisData'));
    setMyData(data || {}); 
  }, []);

  useEffect(()=>{
    FetchWeather()
  },[isListening])


  useEffect(() => {
    const initializeRecognition = () => {
      if (!window.webkitSpeechRecognition) {
        readOut("Speech Recognition not supported in this browser");
        return;
      }

      if (!recognitionRef.current) {
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;

        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex;
          let transcript = event.results[current][0].transcript.toLowerCase();
          setTranscript(transcript);
          onVoiceCommand(transcript);
          if(transcript.includes("hey jarvis") || transcript.includes("jarvis") ){
            handleGenerate(transcript)
          }else{
             handleVoiceCommands(transcript);
          }
        };

        recognitionRef.current.onend = () => {
          if (isListening) {
            recognitionRef.current.start(); // Restart if listening
          }
        };

        recognitionRef.current.onspeechend = () => {
          recognitionRef.current.start(); // Restart on speech end
        };
      }

      if (isListening) {
        const username = mydata?.name?.split(" ");
        readOut(`Welcome, ${username[0] || ''}, I'm Jarvis, your personal assistant.`);
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
      }
    };

    initializeRecognition();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [isListening, mydata, onVoiceCommand]);

  const handleVoiceCommands = (transcript) => {
    const commands = {
      "linkedin profile": () => openLink(mydata.linkedin, "please add the url for linkedin profile", "opening your linkedin profile"),
      "github profile": () => openLink(mydata.github, "please add the url for github profile", "opening your github profile"),
      "gmail": () => openLink(mydata.mailLink, "please add the url for your gmail", "opening your Gmail"),
      "google drive": () => openLink("https://drive.google.com/drive/", null, "opening your Google Drive"),
      "leetcode": () => openLink(mydata.leetcode, "please add the url for your leetcode profile", "opening leetcode"),
      "whatsapp": () => openLink(mydata.whatsapp, "please add the url for your whatsapp", "opening your whatsapp account"),
      "facebook": () => openLink(mydata.facebook, "please add the url for your facebook", "opening your facebook account"),
      "instagram": () => openLink(mydata.instagram, "please add the url for your instagram", "opening your instagram account"),
      "open github": () => openLink("https://github.com/", null, "opening your github"),
      "internshala": () => openLink("https://internshala.com/student/dashboard", null, "opening internshala"),
      "youtube": () => openLink("https://www.youtube.com/", null, "opening youtube"),
      "leetcode problems": () => openLink("https://leetcode.com/problemset/", null, "opening leetcode problems"),
      "chat gpt": () => openLink("https://chatgpt.com/", null, "sure"),
      "google maps": () => openLink("https://www.google.com/maps", null, "opening google maps"),
      "google meet": () => openLink("https://meet.google.com/landing", null, "opening google meet"),
      "search for": (input) => performSearch(input, "searching"),
      "search ": (input) => performSearch(input, "searching"),
      "play": (input) => searchYouTube(input, "playing"),
      "ok": () => readOut("Ok"),
      "who are you": () => readOut("I'm Jarvis, your personal assistant"),
      "thankyou": () => readOut("You're welcome"),
      "hello jarvis":()=> readOut("hello, how are you"),
      "hello ":()=> readOut("hello, how are you"),
      "good":()=> readOut("oh , ok"),
      "great":()=> readOut("good to here"),
      "nice":()=> readOut("good to here"),
      "newz":()=>TellNewz("sure"),
      "news":()=>TellNewz("sure"),
      "latest":()=>TellNewz("sure"),
      "headlines":()=>TellNewz("sure"),
      "headline":()=>TellNewz("sure"),
      "weather":()=>TellWeather("sure"),
    };

    for (const [key, command] of Object.entries(commands)) {
      if (transcript.includes(key)) {
        if (typeof command === 'function') {
          const input = transcript.split(key)[1]?.trim();
          command(input);
        }
        break; 
      }
    }
  };

  const TellNewz = (text)=>{
   readOut(text);
   const random =Math.floor(Math.random()*10);
   const news = newz[random]?.description;
   readOut(`todays headlines are ,  ${news}`);
  }

  const TellWeather = (text) =>{
    if(!weather){
      return;
    }
    readOut(text);
    const city = weather?.location?.name;
    const deg = weather?.current?.temp_c
    const inv = weather?.current?.condition?.text     
    readOut(`in ${city} there is ${deg} degree temprature and weather is ${inv}`)
  }

  const openLink = (link, fallbackMessage, successMessage) => {
    if (!link) {
      readOut(fallbackMessage);
      return;
    }
    window.open(link);
    readOut(successMessage);
  };

  const performSearch = (input, action) => {
    const searchQuery = input.split(" ").join("+");
    const mainstr = searchQuery.split("+").join("");
    readOut(`${action} for ${mainstr}`);
  const openedWindow = window.open(`https://www.google.com/search?q=${searchQuery}`);
  setNewWindow(openedWindow);
  };

  function searchYouTube(query) {
    const modifiedQuery = query.replace(/^play\s+/i, ""); // Removes 'play' if it's at the start of the query
   readOut(`playing,${modifiedQuery}`);
    const baseURL = "https://www.youtube.com/results?search_query=";
    const searchURL = baseURL + encodeURIComponent(modifiedQuery);

    window.open(searchURL, "_blank");
}
const closeWindow = (text)=>{
  if(newWindow){
    newWindow.close();
   setNewWindow(null);
   readOut(text);
  }
  console.log("closed",newWindow)
}
const FetchWeather =()=>{
  fetch(`http://api.weatherapi.com/v1/current.json?key=6d59e65cfd974bec95c35236242911&q=${mydata?mydata?.city:"ambikapur"}`)
  .then((res)=>res.json())
  .then((data)=>{
    setWeather(data)
  })
  .catch((err)=>console.log(err))
}
const FetchNewz =()=>{
  fetch(`https://newsdata.io/api/1/news?apikey=pub_6082846201c51760e32f0f88540fdeace2017&q=politics&country=in&language=en,hi&category=crime,education,entertainment,politics,science`)
  .then((res)=>res.json())
  .then((data)=>{
    setNewz(data.results)
  })
  .catch((err)=>console.log(err))
}

const handleGenerate = async (inputText) => {
  const modifiedQuery = inputText.replace(/^jarvis\s+/i, "");
  console.log(modifiedQuery)
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

const readOut = (message) => {
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



  return (
    <div>
      <Display transcript={transcript} result ={result} setIsListening={setIsListening} isListening={isListening} readOut={readOut} weather={weather} />
      {Loading &&  <Loader/>}
    </div>
  );
};

export default VoiceInput;
