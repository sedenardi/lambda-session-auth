'use strict';

const cookie = require('cookie');
const users = require('./users');

const cookieKey = 'SID';
const cookiePrefix = 'Session::';

module.exports = {
  get: (headers) => {
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
  set: (user) => {
    const sessionId = `${cookiePrefix}${user.username}`;
    const newCookie = `${cookieKey}=${sessionId}`;
    return { Cookie: newCookie };
  },
  destroy: (user) => {
    // invalidate sessionId if user exists
    const clearCookie = cookie.serialize(cookieKey, 'empty', {
      maxAge: 0
    })
    return { Cookie: clearCookie };
  }
};
