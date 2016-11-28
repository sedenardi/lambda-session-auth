'use strict';

const cookieKey = 'SID';
const cookiePrefix = 'Session::';

module.exports = {
  set: (user) => {
    const sessionId = `${cookiePrefix}${user}`;
    const newCookie = `${cookieKey}=${sessionId}`;
    return { Cookie: newCookie };
  },
  get: (sessionId) => {
    const user = sessionId.replace(cookiePrefix, '');
    if (user) {
      return true;
    } else {
      return false;
    }
  }
};
