const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsers } = require('./users');
const { addMessage, removeMessage, getMessages } = require('./messages');
const users = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('The server is up and running!');
});

io.on('connection', socket => {
  console.log('a new connection');

  socket.on('join', ({ name }, callback) => {
    const { error, user } = addUser({ name });

    if (error) {
      return callback(error);
    }

    socket.join('chat');
    socket.user_name = name;
    callback();

    const messageText = `The user ${user.name} has joined!`;
    const message = addMessage('system', messageText);

    io.to('chat').emit('message', message);
    console.log(messageText);
  });

  socket.on('getMessages', ({}, callback) => {
    callback(getMessages());
  })

  socket.on('sendMessage', ({ text }, callback) => {
    const user = getUser(socket.user_name);

    if (!user) {
      return callback({ error: `The user hasn't joined!` })
    }

    const message = addMessage(user.name, text);
    io.to('chat').emit('message', message);
    callback({});
  });

  socket.on('messageForDeletion', ({ id }) => {
    if (removeMessage(id)) {
      io.to('chat').emit('deleteMessage', id);
    }
  });

  socket.on('leave', ({}, callback) => {
    socket.leave('chat');

    const user = users.removeUser(socket.user_name);

    if (user) {
      callback();

      const messageText = `The user ${user.name} has left!`;
      const message = addMessage('system', messageText);

      io.to('chat').emit('message', message);
      console.log(messageText);
    }
  });

  socket.on('disconnect', () => {
    console.log('a user has disconnected');

    const user = users.removeUser(socket.user_name);

    if (user) {
      const messageText = `The user ${user.name} has disconnected!`;
      const message = addMessage('system', messageText);

      io.to('chat').emit('message', message);
      console.log(messageText);
    } else {
      console.log('Someone has disconnected!');
    }
  });
})

server.listen(PORT, () => {
  console.log(`the server has started on the port ${PORT}`)
})