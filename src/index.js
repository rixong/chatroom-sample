const path = require('path')
const express = require('express');
const http = require('http');
const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)
// app.use(esxpress.JSON());
app.use(express.static(publicDirectoryPath));

io.on('connection', () => {
  console.log('New web socket connection');
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
