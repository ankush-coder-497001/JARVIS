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
          handleVoiceCommands(transcript);
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
      "what is": (input) => handleGenerate(transcript),
      "who is": (input) => handleGenerate(transcript),
      "play": (input) => searchYouTube(input, "playing"),
      "how are you": () => readOut("I am good, what about you?"),
      "what about you": () => readOut("I am good"),
      "fine": () => readOut("That's good to hear. How can I help you?"),
      "bro": () => readOut("Hello sir"),
      "ok": () => readOut("Ok"),
      "close the window": () => closeWindow("sure"),
      "who are you": () => readOut("I'm Jarvis, your personal assistant"),
      "thankyou": () => readOut("You're welcome"),
      "hello jarvis":()=> readOut("hello, how are you"),
      "hello ":()=> readOut("hello, how are you"),
      "jarvis":()=> readOut("hello, how are you"),
      "good":()=> readOut("oh , ok"),
      "great":()=> readOut("good to here"),
      "nice":()=> readOut("good to here"),
      "can you do":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "your tasks":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "tasks":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "what are you doing":()=> readOut("i am a personal assistant , i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "how do i use you":()=>readOut("say search and your topic or what is javascript , for youtube search say , play and your topic name"),
      "how to use":()=>readOut("say search and your topic or what is javascript , for youtube search say , play and your topic name"),
      "use":()=>readOut("say search and your topic or what is javascript , for youtube search say , play and your topic name"),
      "newz":()=>TellNewz("sure"),
      "news":()=>TellNewz("sure"),
      "latest":()=>TellNewz("sure"),
      "headlines":()=>TellNewz("sure"),
      "headline":()=>TellNewz("sure"),
      "weather":()=>TellWeather("sure"),
      "tell me":()=>handleGenerate(transcript) 
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
  setLoading(true);
  try {
      const response = await axios.post('http://127.0.0.1:5000/generate', { input_text: inputText });
      readOut(response.data.output);
  } catch (error) {
      console.error("Error generating text:", error);
      readOut("An error occurred. Please try again.");
  } finally {
      setLoading(false);
  }
};

  const readOut = (message) => {
    // Speak the message using speech synthesis
    const msg = new SpeechSynthesisUtterance(message);
    msg.voice = window.speechSynthesis.getVoices().find(voice => voice.name === 'Alex');
    msg.pitch = 1.2;
    msg.rate = 1;
    msg.volume = 0.8;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div>
      <Display transcript={transcript} setIsListening={setIsListening} isListening={isListening} readOut={readOut} weather={weather} />
      {Loading && <Loader/>}
    </div>
  );
};

export default VoiceInput;
