import React, { useState, useEffect } from 'react';
import Display from './Ui';
import axios from 'axios';

const VoiceInput = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mydata,setmydata] = useState({})
  const [data , setdata] = useState({})
  let recognition ;


useEffect(()=>{
const localdata = JSON.parse(localStorage.getItem("JARVIS"));
setdata(localdata);
},[])


//find user data

useEffect(()=>{
  try {
    axios.get(`http://localhost:5000/User/findUser/${data._id}`).then((res)=>{
      setmydata(res.data);
      console.log(res.data);
      console.log(mydata)
    })
  } catch (error) {
    console.log(error.message)
  }
},[data])


  useEffect(() => {
    const Start = ()=>{
     recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;

   //defined here what we deliver in result 
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      let transcript = event.results[current][0].transcript;
      transcript = transcript.toLowerCase();
      setTranscript(transcript);
      onVoiceCommand(transcript);




      //personal commmands of user like profiles..
      if(transcript.includes("linkedin profile")){
        window.open(mydata.linkedin);
        readOut("opening your linkedin profile sir");
      }

      if(transcript.includes("github profile")){
        readOut("opening your github profile sir");
        window.open(mydata.github);
      }

      if(transcript.includes("gmail") || transcript.includes("open my mail section") ){
        readOut("opening your Gmail sir");
        window.open(mydata.mailLink);
      }


      if(transcript.includes("google drive") || transcript.includes("open google drive") ){
        readOut("opening your Google Drive sir");
        window.open("https://drive.google.com/drive/");
      }


      if(transcript.includes(" leetcode ") || transcript.includes(" lead code") ){
        readOut("opening leetcode  sir");
        window.open(mydata.leetcode);
      }

      //Social media & other websites
      if(transcript.includes("open github ")){
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
    
      if(transcript.includes(" leetcode problems") || transcript.includes(" problems") ){
        readOut("opening leetcode problems sir");
        window.open("https://leetcode.com/problemset/");
      }

      if(transcript.includes("problems on")  ){
        let input = transcript.split("");
        input.splice(0,12);
        input = input.join("")
        console.log(input);
        readOut("sure sir");
        window.open(`https://leetcode.com/tag/${input}/`);
      }
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
        input = input.join("").split(" ").join("+");
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

      if(transcript.includes("play") || transcript.includes("show") ){
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
     readOut("I Cant Do it for you")        
      }

      if(transcript.includes("who are you")){
        readOut("im Jarves , your personal assistant");
      }
    
      if(transcript.includes("thankyou") || transcript.includes("thank you") || transcript.includes("thanks")){
        readOut("your welcome ")
      }
  
    
    };

    if (isListening) {
      const username = mydata.name.split(" ")
      readOut(`welcome ,${username[0]} , im jarvis`)
      recognition.start();
    }else{
      recognition.stop()
    }

  }
  Start()
}, [isListening]);






// Code for reading the response
  const readOut = (message)=>{
    const msg = new SpeechSynthesisUtterance(message);
    msg.volume = 1.0;
    window.speechSynthesis.speak(msg);
  }

  return (
    <div>
    <Display  transcript={transcript} setIsListening={setIsListening} isListening={isListening} />
    </div>
  );
};

export default VoiceInput;
