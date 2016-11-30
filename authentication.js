'use strict';

const users = require('./users');

module.exports = {
  auth: (username, pass) => {
    if (!username || !pass) {
      return { success: false, message: 'Must provide username and password.' };
    } else if (!users[username]) {
      return { success: false, message: 'User doesn\'t exist.' };
    } else if (users[username].pass !== pass) {
      return { success: false, message: 'Incorrect password.' };
    } else {
      return { success: true, user: users[username] };
    }
  }
};
