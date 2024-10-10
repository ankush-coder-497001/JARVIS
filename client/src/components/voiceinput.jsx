import React, { useState, useEffect } from 'react';
import Display from './Ui';

const VoiceInput = ({ onVoiceCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mydata, setMyData] = useState({});

  // Use a ref for recognition to avoid re-creating it on every render
  const recognitionRef = React.useRef(null);

  // Find user data from local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('JarvisData'));
    setMyData(data || {}); // Ensure it defaults to an empty object if null
  }, []);

  useEffect(() => {
    const initializeRecognition = () => {
      // Check if the browser supports SpeechRecognition
      if (!window.webkitSpeechRecognition) {
        readOut("Speech Recognition not supported in this browser");
        return;
      }

      // Initialize recognition if it's not already done
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
            readOut("Speech recognition stopped. Restarting...");
            recognitionRef.current.start(); // Restart if listening
          }
        };

        recognitionRef.current.onspeechend = () => {
          readOut('Speech recognition stopped. Restarting...');
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

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [isListening, mydata, onVoiceCommand]);

  const handleVoiceCommands = (transcript) => {
    // Define personal commands based on user data
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
      "internshala": () => openLink("https://internshala.com/student/dashboard", null, "opening your internshala"),
      "youtube": () => openLink("https://www.youtube.com/", null, "opening youtube"),
      "leetcode problems": () => openLink("https://leetcode.com/problemset/", null, "opening leetcode problems"),
      "chat gpt": () => openLink("https://chatgpt.com/", null, "sure"),
      "google maps": () => openLink("https://www.google.com/maps", null, "opening google maps"),
      "google meet": () => openLink("https://meet.google.com/landing", null, "opening google meet"),
      "search for": (input) => performSearch(input, "searching"),
      "what is": (input) => performSearch(input, "searching"),
      "play": (input) => searchYouTube(input, "playing"),
      "how are you": () => readOut("I am good, what about you?"),
      "fine": () => readOut("That's good to hear. How can I help you?"),
      "bro": () => readOut("Hello sir"),
      "ok": () => readOut("Ok"),
      "close the window": () => readOut("Bye bye"),
      "who are you": () => readOut("I'm Jarvis, your personal assistant"),
      "thankyou": () => readOut("You're welcome"),
      "hello jarvis":()=> readOut("hello, how are you"),
      "hello ":()=> readOut("hello, how are you"),
      "jarvis":()=> readOut("hello, how are you"),
      "can you do":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "your tasks":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "tasks":()=> readOut("i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
      "what are you doing":()=> readOut("i am a personal assistant , i can do you browser task like searching or google , youtube , creating meeting , opening tabs and your social media profiles like linkedin or facebook"),
    };

    for (const [key, command] of Object.entries(commands)) {
      if (transcript.includes(key)) {
        if (typeof command === 'function') {
          // Extract input for search commands
          const input = transcript.split(key)[1]?.trim();
          command(input);
        }
        break; // Exit the loop after finding the first match
      }
    }
  };

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
    readOut(`${action} for ${searchQuery}`);
    window.open(`https://www.google.com/search?q=${searchQuery}`);
  };

  function searchYouTube(query) {
    const modifiedQuery = query.replace(/^play\s+/i, ""); // Removes 'play' if it's at the start of the query

    const baseURL = "https://www.youtube.com/results?search_query=";
    const searchURL = baseURL + encodeURIComponent(modifiedQuery);

    window.open(searchURL, "_blank");
}

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
      <Display transcript={transcript} setIsListening={setIsListening} isListening={isListening} readOut={readOut} />
    </div>
  );
};

export default VoiceInput;
