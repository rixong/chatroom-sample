const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('location-button')
const $messages = document.getElementById('messages')
// const $users = document.getElementById('sidebar')

// Templates
const messageTemplate = document.getElementById('message-template').innerHTML
const locationTemplate = document.getElementById('location-template').innerHTML
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML

// Grab the query from submitted URL (from join page).
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
  // Get new message
  const $newMessage = $messages.lastElementChild
  // Get the height of new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
  // Visible height
  const visibleHeigth = $messages.offsetHeight;

  //Height of message container
  const containerHeigth = $messages.scrollHeight

  // How far have I scrolled down
  const scrollOffset = $messages.scrollTop + visibleHeigth

  if (containerHeigth - newMessageHeight <= scrollOffset){
    $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('roomData', ({ room, users }) => {
  html = Mustache.render(sidebarTemplate, { room, users });
  document.getElementById('sidebar').innerHTML = html
})

socket.on('message', ({ username, text, createdAt }) => {
  const html = Mustache.render(messageTemplate, {
    username,
    message: text,
    createdAt
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()
})

socket.on('locationMessage', ({ username, url, createdAt }) => {
  const html = Mustache.render(locationTemplate, {
    username,
    url,
    createdAt
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $messageFormButton.disabled = true

  socket.emit('sendMessage', $messageFormInput.value, (error) => {
    $messageFormButton.disabled = false
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log(error)
    }
    // console.log('Message delivered.');
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
        // console.log('Location delivered.')
      })
  });
});

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = './'
  }
});

