// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoiceInput from './components/voiceinput';
import Commands from './components/command';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UpdateCommands from './components/update';

const App = () => {
  const [response, setResponse] = useState('');

  const handleVoiceCommand = async (command) => {
    console.log(command);
  };

const router = createBrowserRouter([
  {path:"/", element:<UpdateCommands/>},
  {path:"/mainpage", element:<VoiceInput onVoiceCommand={setResponse}/>},
])

  return (
    <div>
<RouterProvider router={router}>
  
</RouterProvider>
    </div>
  );
};

export default App;





recognition.onresult = (event) => {
  const current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  setTranscript(transcript);
  onVoiceCommand(transcript);




  //personal commmands of user like profiles..
  if(transcript.includes("linkedin profile")){
    if(mydata.linkedin === ""){
      readOut("please add the url for linkedin profile ");
      return;
    }
   window.open(mydata.linkedin);
    readOut("opening your linkedin profile");
  }

  if(transcript.includes("github profile")){readOut("opening your github profile sir");
    if(mydata.github === ""){
      readOut("please add the url for github profile ");
      return;
    }
    window.open(mydata.github);
  }

  if(transcript.includes("gmail") || transcript.includes("open my mail section") ){
    if(mydata.mailLink === ""){
      readOut("please add the url for you gmail ");
      return;
    }
    readOut("opening your Gmail ");
    window.open(mydata.mailLink);
  }


  if(transcript.includes("google drive") || transcript.includes("open google drive") ){
    readOut("opening your Google Drive ");
    window.open("https://drive.google.com/drive/");
  }


  if(transcript.includes("leetcode") || transcript.includes("lead code") ){
    if(mydata.leetcode === ""){
      readOut("please add the url for you leetcode profile ");
      return;
    }
    readOut("opening leetcode ");
    window.open(mydata.leetcode);
  }

  if(transcript.includes("whatsapp")|| transcript.includes("open whatsapp") || transcript.includes("message")){
    if(mydata.whatsapp === ""){
      readOut("please add the url for your whatsapp ");
      return;
    }
    window.open(mydata.whatsapp);
    readOut("opening you whatsapp account");
  }
  if(transcript.includes("facebook")|| transcript.includes("open facebook") ){
    if(mydata.facebook === ""){
      readOut("please add the url for your facebook ");
      return;
    }
    window.open(mydata.facebook);
    readOut("opening you facebook account");
  }
  if(transcript.includes("instagram")|| transcript.includes("open instagram") ){
    if(mydata.facebook === ""){
      readOut("please add the url for your instagram ");
      return;
    }
    window.open(mydata.instagram);
    readOut("opening you instagram account");
  }

  //Social media & other websites
  if(transcript.includes("open github")){
    readOut("opening your github sir");
    window.open("https://github.com/");
  }


  if(transcript.includes("internshala")){
    readOut("opening your intern shala sir");
    window.open("https://internshala.com/student/dashboard");
  }

  if(transcript.includes("youtube")){
    readOut("opening youtube sir");
  window.open("https://www.youtube.com/")

  }

  if(transcript.includes("leetcode problems") || transcript.includes("problems") ){
    readOut("opening leetcode problems sir");
    window.open("https://leetcode.com/problemset/");
  }

  // if(transcript.includes("problems on")  ){
  //   let input = transcript.split("");
  //   input.splice(0,12);
  //   input = input.join("")
  //   console.log(input);
  //   readOut("sure sir");
  //   window.open(`https://leetcode.com/tag/${input}/`);
  // }
  if(transcript.includes("chat gpt") || transcript.includes("chatgpt") || transcript.includes("gpt") || transcript.includes("chat")){
 mywindow = window.open("https://chatgpt.com/","_blank")
    readOut("sure")
  }

  if(transcript.includes("google maps") || transcript.includes("map") || transcript.includes("google map") || transcript.includes("map") ){
    readOut("opening google maps");
    window.open("https://www.google.com/maps");
  }
  if(transcript.includes("google meet") || transcript.includes("meet") || transcript.includes("meeting") ){
    readOut("opening google meet");
    window.open("https://meet.google.com/landing");
  }

  //automation commands
  if(transcript.includes("search for") ){
    let input = transcript.split("");
    input.splice(0,11);
    input = input.join("")?.split(" ")?.join("+");
    console.log(input);
    readOut("sure sir");
    window.open(`https://www.google.com/search?q=${input}`);
  }

  if(transcript.includes("what is") ){
    let input = transcript.split("");
    input.splice(0,8);
    input = input.join("").split(" ").join("+");
    console.log(input);
    readOut("sure sir");
    window.open(`https://www.google.com/search?q=${input}`);
  }

  if(transcript.includes("play")){
    let input = transcript.split("");
    input.splice(0,5);
    input = input.join("").split(" ").join("+");
    console.log(input);
    readOut(`Ok `);
    window.open(`https://www.youtube.com/results?search_query=${input}`);
  }


  //greetings and user intraction with JARVIS......

  if(transcript.includes("how are you") ){
    readOut("I am good , what about you");
  }

  if(transcript.includes("fine") || transcript.includes("im good")|| transcript.includes("great") || transcript.includes("good")){
    readOut("That's good to hear");
    readOut("so tell me, how can i help you");
  }

  if(transcript.includes("bro") || transcript.includes("hello jarvis") || transcript.includes("kaise ho") || transcript.includes("kaiseho")){
    readOut("hello sir")
  }
  if(transcript.includes("ok") || transcript.includes("stop")){
   getHumanLikeResponse(" ").then(res=>readOut("ok"))
  }

  if(transcript.includes("close the window") || transcript.includes("close this") || transcript.includes("closed")){
 readOut("By By");
  }

  if(transcript.includes("who are you")){
    readOut("im Jarves , your personal assistant");
  }

  if(transcript.includes("thankyou") || transcript.includes("thank you") || transcript.includes("thanks")){
    readOut("your welcome ")
  }


};