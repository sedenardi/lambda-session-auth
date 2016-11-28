'use strict';

const users = {
  user1: 'pass1',
  user2: 'pass2'
};

module.exports = {
  auth: (user, pass) => {
    return new Promise((resolve, reject) => {
      if (!user || !pass) {
        return resolve({ success: false, message: 'Must provide username and password.' });
      } else if (!users[user]) {
        return resolve({ success: false, message: 'User doesn\'t exist.' });
      } else if (users[user] !== pass) {
        return resolve({ success: false, message: 'Incorrect password.' });
      } else {
        return resolve({ success: true });
      }
    });
  }
};
