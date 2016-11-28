'use strict';

const cookieKey = 'SID';
const cookiePrefix = 'Session::';

module.exports = {
  set: (user) => {
    return new Promise((resolve, reject) => {
      const sessionId = `${cookiePrefix}${user}`;
      const newCookie = `${cookieKey}=${sessionId}`;
      return resolve({ Cookie: newCookie });
    });
  },
  get: (cookies) => {
    return new Promise((resolve, reject) => {
      if (!cookies[cookieKey]) {
        return resolve(false);
      }
      const user = cookies[cookieKey].replace(cookiePrefix, '');
      if (!user) {
        return resolve(false);
      }
      return resolve(true);
    });
  }
};
