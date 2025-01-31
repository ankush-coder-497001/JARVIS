import React, { useState, useEffect } from 'react';
import Display from './Ui';
import axios from 'axios';
import Loader from './Loader';
import { FetchNewz, FetchWeather, handleGenerate, HandleOnOpenApp, HandleSystemCommands, openLink, performSearch, readOut, searchYouTube, TellNewz } from '../AllFunctions';

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
   setNewz(FetchNewz())
    const data = JSON.parse(localStorage.getItem('JarvisData'));
    setMyData(data || {}); 
  }, []);

  useEffect(()=>{
    setWeather(FetchWeather(mydata))
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
            handleGenerate(transcript,setLoading,setresult)
          }else{
             handleVoiceCommands(transcript);
             HandleSystemCommands(transcript);
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
      "github": () => openLink("https://github.com/", null, "opening your github"),
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
      "hello jarvis": () => readOut("hello, how are you"),
      "hello ": () => readOut("hello, how are you"),
      "good": () => readOut("oh , ok"),
      "great": () => readOut("good to here"),
      "nice": () => readOut("good to here"),
      "newz": () => TellNewz("sure"),
      "news": () => TellNewz("sure"),
      "latest": () => TellNewz("sure"),
      "headlines": () => TellNewz("sure"),
      "headline": () => TellNewz("sure"),
      "weather": () => TellWeather("sure"),
      "open": (input) => HandleOnOpenApp(input)
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





  return (
    <div>
      <Display transcript={transcript} result ={result} setIsListening={setIsListening} isListening={isListening} readOut={readOut} weather={weather} />
      {Loading &&  <Loader/>}
    </div>
  );
};

export default VoiceInput;
