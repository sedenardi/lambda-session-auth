'use strict';

const cookieKey = 'SID';
const cookiePrefix = 'Session::';

module.exports = {
  set: (user) => {
    const sessionId = `${cookiePrefix}${user}`;
    const newCookie = `${cookieKey}=${sessionId}`;
    return { Cookie: newCookie };
  },
  get: (cookies) => {
    if (!cookies[cookieKey]) {
      return { valid: false };
    }
    const user = cookies[cookieKey].replace(cookiePrefix, '');
    return {
      valid: !!user,
      user: user
    };
  }
};
