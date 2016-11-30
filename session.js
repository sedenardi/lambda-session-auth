'use strict';

const cookie = require('cookie');
const users = require('./users');

const cookieKey = 'SID';
const cookiePrefix = 'Session::';

module.exports = {
  getSession: (headers) => {
    const cookieStr = headers ? (headers.Cookie || '') : '';
    const cookies = cookie.parse(cookieStr);
    if (!cookies[cookieKey]) {
      return { valid: false };
    }
    const username = cookies[cookieKey].replace(cookiePrefix, '');
    const user = users[username];
    return {
      valid: !!user,
      user: user
    };
  },
  setSession: (user) => {
    const sessionId = `${cookiePrefix}${user.username}`;
    const newCookie = cookie.serialize(cookieKey, sessionId);
    return { Cookie: newCookie };
  },
  destroySession: (user) => {
    const clearCookie = cookie.serialize(cookieKey, 'empty', { maxAge: 0 });
    return { Cookie: clearCookie };
  }
};
