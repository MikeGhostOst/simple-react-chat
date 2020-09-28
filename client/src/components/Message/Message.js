import React from 'react';

import './Message.css';

import deleteButtonIcon from './delete-button.svg';

const Message = ({ id, userName, text, handleDelete, name, isLastMessage }) => {
  const isSentByCurrentUser = userName === name;

  let deleteButton = (
    <input
      className="delete-button button-style-off"
      type="image"
      src={deleteButtonIcon}
      alt="delete message"
      onClick={() => handleDelete(id)}
    />
  );

  const userClass = isSentByCurrentUser ? 'current-user' : 'other-user';
  const lastMessageClass = isLastMessage ? 'last' : '';

  return (
    <div className={`message ${userClass} ${lastMessageClass}`}>
      <div className="container">
        <div className="header grey-background">
          <div className="user-name">{userName}</div>
          {isSentByCurrentUser ? deleteButton : null}
        </div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
}

export default Message;