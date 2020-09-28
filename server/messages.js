const messages = [];

const addMessage = (userName, text) => {
  const message  = { userName, text, id: Date.now() };
  messages.push(message);
  return message;
}

const removeMessage = id => {
  const index = messages.findIndex(message => message.id === id);

  if (index !== -1) {
    return messages.splice(index, 1);
  }
}

const getMessages = () => {
  return messages;
}

module.exports = { addMessage, removeMessage, getMessages };