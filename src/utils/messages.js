const moment = require('moment');

const generateMessage = (text) => {
  // const now = moment();
  return {
    text,
    createdAt: moment().format('h:mm:ss a')
  }
}

const generateLocationMessage = (url) => {
  return {
    url,
    createdAt: moment().format('h:mm:ss a')
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}