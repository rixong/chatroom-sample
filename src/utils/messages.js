const moment = require('moment');

const generateMessage = (text) => {
  // const now = moment();
  return {
    text,
    createdAt: moment().format('h:m:s a')
  }
}

module.exports = {
  generateMessage
}