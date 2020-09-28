import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, handleDelete, name }) => {
  let innerContent;

  if (messages.length) {
    innerContent = messages.map((message, index) => 
      <div key={message.id}>
        <Message
          id={message.id}
          userName={message.userName}
          text={message.text}
          handleDelete={handleDelete}
          name={name}
          isLastMessage={index === (messages.length - 1)}
        />
      </div>);
  } else {
    innerContent = 'no messages sent';
  }

  return (
    <ScrollToBottom className="messages">
      {innerContent}
    </ScrollToBottom>
  );
}

export default Messages;