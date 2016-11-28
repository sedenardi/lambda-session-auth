'use strict';

const cookie = require('cookie');

const auth = require('./auth');
const session = require('./session');

module.exports = {
  post: (event, context) => {
    const user = event.data.username;
    const pass = event.data.password;
    auth(user, pass).then((authRes) => {
      if (res) {
        session.set(user).then((cookie) => {
          return context.done(null, Object.assign(authRes, cookie));
        });
      } else {
        return context.done(null, authRes)
      }
    });
  },
  get: (event, context) => {
    const cookieStr = event.headers ? (event.headers.Cookie || '') : '';
    const cookies = cookie.parse(cookieStr);
    session.get(cookies).then((sessionRes) => {
      if (sessionRes) {
        // authenticated

      } else {
        
      }
    });
  }
};
