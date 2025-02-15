// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoiceInput from './components/voiceinput';
import Commands from './components/command';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UpdateCommands from './components/update';
import UserGuide from './components/UserGuide';

const App = () => {
  const [response, setResponse] = useState('');

  const handleVoiceCommand = async (command) => {
    console.log(command);
  };

const router = createBrowserRouter([
  {path:"/", element:<UpdateCommands/>},
  {path:"/mainpage", element:<VoiceInput onVoiceCommand={setResponse}/>},
  {path:'/UserGuide', element: <UserGuide/>  }
])

  return (
    <div>
<RouterProvider router={router}>
  
</RouterProvider>
    </div>
  );
};

export default App;





