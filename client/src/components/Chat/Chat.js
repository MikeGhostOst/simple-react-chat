import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Messages from '../Messages/Messages';
import TextForm from '../TextForm/TextForm';
import LeaveButton from '../LeaveButton/LeaveButton';

import './Chat.css';

const Chat = ({ socket, isUserInChat, setIsUserInChat, name }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText) return;

    socket.emit('sendMessage', { text: inputText }, ({ error }) => {
      if (error) {
        alert(error);
        return setIsUserInChat(false);
      }

      setInputText('');
    });
  };

  const handleLeave = () => {
    socket.emit('leave', {}, () => {
      setIsUserInChat(false);
    });
  }

  const handleDelete = (id) => {
    socket.emit('messageForDeletion', { id });
  }

  useEffect(() => {
    if (!isUserInChat) {
      if (socket) {
        socket.off('message');
        socket.off('deleteMessage');
      }
      return history.push('/');
    }

    if (!socket) return;

    socket.emit('getMessages', {}, oldMessages => {
      setMessages(oldMessages);
    })

    socket.on('message', message => {
      setMessages(oldMessages => [...oldMessages, message]);
    });

    socket.on('deleteMessage', id => {
      setMessages(oldMessages => oldMessages.filter(msg => msg.id !== id));
    });
  }, [socket, isUserInChat, history]);

  return (
    <div className="chat blue-background">
      <div className="container flex-column">
        <div className="header grey-background">
          <LeaveButton handleLeave={handleLeave} />
        </div>
        <Messages messages={messages} handleDelete={handleDelete} name={name} />
        <TextForm handleSubmit={handleSubmit} inputText={inputText} setInputText={setInputText} />
      </div>
    </div>
  )
};

export default Chat;