const socket = io();

socket.on('message', (message) => {
  // console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if(error){
      return console.log(error)
    }
    console.log(message);
  });

  e.target.message.value = '';
})

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
    socket.emit('sendLocation',
      {lat: position.coords.latitude,
        long: position.coords.longitude
      })
  });
});




// const button = document.querySelector('#increment').addEventListener('click', () => {
//   // console.log('Clicked');
//   socket.emit('increment')
// })

// const display = document.querySelector('#display');
// socket.on('countUpdated', (count) => {
//   // console.log("The count is updated.", count);
//   display.textContent = count;
// })

