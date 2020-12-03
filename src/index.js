const path = require('path')
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)
// app.use(esxpress.JSON());
app.use(express.static(publicDirectoryPath));


io.on('connection', (socket) => {
  console.log('New web socket connection');
  // To a new member
  socket.emit('message', 'Welcome!');
  // Only to other members.
  socket.broadcast.emit('message', 'A new member has joined.')

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if(filter.isProfane(message)){
      return callback('Profanity is not allowed!')
    }
    io.emit('message',  message)
    callback();
  })
  
    socket.on('sendLocation', (coords, callback) => {
      io.emit('message', (`https://google.com/maps?q=${coords.lat},${coords.long}`))
      callback()
    })

  socket.on('disconnect', () => {
    io.emit('message', 'A person has left the chat.')
  })

  // Count challenge code
  // socket.emit('countUpdated', count)
  // socket.on('increment', () => {
  //   count ++;
  //   io.emit('countUpdated', count)
  // })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
