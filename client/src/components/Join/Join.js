import React from 'react';
import { useHistory } from 'react-router-dom';

import './Join.css';

const Join = ({ socket, isUserInChat, setIsUserInChat, name, setName }) => {
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) return;

    socket.emit('join', { name }, (error) => {
      if (error) {
        return alert(error);
      }

      setIsUserInChat(true);
      history.push('/chat')
    });
  }

  const handleOnChange = e => {
    const value = e.target.value;

    if (value.length > 10) {
      return setName( value.slice(0, 20) );
    }

    setName(value);
  }

  return (
    <div className="join blue-background">
      <form onSubmit={handleSubmit} className="container flex-column">
        <label htmlFor="nameInput" className="label">Enter your name</label>
        <input
          id="nameInput"
          name="nameInput"
          type="text" value={name}
          onChange={handleOnChange}
          className="input"
        />
        <button className="button button-style-off">Join the chat</button>
        <div className="caption">Created by Mikhail Ostras</div>
      </form>
    </div>
  )
};

export default Join;