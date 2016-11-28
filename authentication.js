'use strict';

const users = {
  user1: 'pass1',
  user2: 'pass2'
};

module.exports = {
  auth: (user, pass) => {
    if (!user || !pass) {
      return { success: false, message: 'Must provide username and password.' };
    } else if (!users[user]) {
      return { success: false, message: 'User doesn\'t exist.' };
    } else if (users[user] !== pass) {
      return { success: false, message: 'Incorrect password.' };
    } else {
      return { success: true };
    }
  }
};
