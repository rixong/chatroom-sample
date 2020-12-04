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
  return {user};
}

const removeUser = (id) => {
  const idx = users.findIndex((user) => user.id === id)
  if(idx !== -1){
    return users.splice(idx, 1)[0]
  }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

// const rick = {
//   id: 1,
//   username: 'Rick',
//   room: 'Austin'
// }

// const jenny = {
//   id: 2,
//   username: 'Jenny',
//   room: 'Austin'
// }

// console.log(addUser(rick))
// console.log(addUser(jenny))

// console.log(users)

// console.log(removeUser(2))

module.exports = {addUser, removeUser, getUser, getUsersInRoom}