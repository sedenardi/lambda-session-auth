'use strict';

const cookie = require('cookie');
const fs = require('fs');
const path = require('path');
const authentication = require('./authentication');
const session = require('./session');

const loginPath = path.resolve(__dirname, './login.html');

module.exports = {
  post: (event, context) => {
    const user = event.data.username;
    const pass = event.data.password;
    const authRes = authentication.auth(user, pass);
    if (authRes.success) {
      const cookie = session.set(user);
      return context.done(null, Object.assign(authRes, cookie));
    } else {
      return context.done(null, authRes)
    }
  },
  get: (event, context) => {
    const cookieStr = event.headers ? (event.headers.Cookie || '') : '';
    const cookies = cookie.parse(cookieStr);
    const sessionRes = session.get(cookies);
    if (sessionRes.valid) {
      // authenticated
      return context.done(null, `Logged in as: ${sessionRes.user}`)
    } else {
      fs.readFile(loginPath, (err, res) => {
        if (err) { return context.done(err); }
        return context.done(null, res.toString());
      });
    }
  }
};
