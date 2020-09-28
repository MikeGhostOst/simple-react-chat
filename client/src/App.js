import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import io from 'socket.io-client';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  const ENDPOINT = 'localhost:5000';

  const [socket, setSocket] = useState(null);
  const [isUserInChat, setIsUserInChat] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Join 
          socket={socket}
          isUserInChat={isUserInChat}
          setIsUserInChat={setIsUserInChat}
          name={name}
          setName={setName}
        />
      </Route>
      <Route exact path="/chat">
        <Chat
          socket={socket}
          isUserInChat={isUserInChat}
          setIsUserInChat={setIsUserInChat}
          name={name}
        />
      </Route>
    </BrowserRouter>
  );
}

export default App;