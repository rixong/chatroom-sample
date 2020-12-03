const users = [];

const addUser = ({id, username, room}) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()
  if (!username || !room){
    return {
      error: 'Username and room are required.'
    }
  }
  const existingUser = users.find((user) => {
    return user.username === username && user.room === room;
  })
    if (existingUser) {
    return {
      error: 'Username already taken in this room.'      
    }
  }
  const user = {id, username, room};
  users.push(user);
  return user;
}

const removeUser = (id) => {
  const idx = users.findIndex((user) => user.id === id)
  if(idx !== -1){
    return users.slice(idx, 1)[0]
  }
}

const getUser = (id) => {
  const idx = users.findIndex((user) => user.id === id)
  if(idx !== -1){
    return users[idx]
  }
}

const getUsersInRoom = (room) => {
  const users = user.filter((user) => user.room === room)
  return users;
}



// addUser({
//   id:2,
//   username: 'Rick',
//   room: "Austin"
// })

// addUser({
//   id:2,
//   username: 'Bob',
//   room: "Austin"
// })

// const res = {
//   id:2,
//   username: 'Bob',
//   room: "Austin"
// };

