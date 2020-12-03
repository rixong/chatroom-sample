const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('location-button')
const $messages = document.getElementById('messages')

// Templates
const messageTemplate = document.getElementById('message-template').innerHTML

socket.on('message', (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // $messageFormInput.disabled = true
  $messageFormButton.disabled = true
  
  socket.emit('sendMessage', $messageFormInput.value, (error) => {
    // $messageFormInput.disabled = false
    $messageFormButton.disabled = false
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log(error)
    }
    console.log('Message delivered.');
  });

})

$sendLocationButton.addEventListener('click', () => {
  $sendLocationButton.disabled = true;
  if (!navigator.geolocation) {
    return alert('Geolocation not supported.');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    $sendLocationButton.disabled = false;
    socket.emit('sendLocation',
      {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }, () => {
        console.log('Location delivered.')
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

