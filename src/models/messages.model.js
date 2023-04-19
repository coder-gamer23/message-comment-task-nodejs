const dbData = require('../data/db.json');
// const fs = require('fs');
const path = require('path');

module.exports = {
  messages: dbData.messages,
  dataSource: path.join(__dirname, '..', 'data', 'db.json'),
  totalmessages:dbData.totalmessages,
  messagesModelData: dbData
};