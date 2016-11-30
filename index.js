'use strict';

const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const authentication = require('./authentication');
const session = require('./session');

const loginPath = path.resolve(__dirname, './login.html');
const userPath = path.resolve(__dirname, './user.html');

module.exports = {
  get: (event, context) => {
    const sessionRes = session.get(event.headers);
    if (sessionRes.valid) {
      fs.readFile(userPath, (err, res) => {
        if (err) { return context.done(err); }
        const compiled = template(res.toString());
        console.log(res.toString());
        const body = compiled({
          username: sessionRes.user.username,
          first: sessionRes.user.first,
          last: sessionRes.user.last
        });
        return context.done(null, body);
      });
    } else {
      fs.readFile(loginPath, (err, res) => {
        if (err) { return context.done(err); }
        return context.done(null, res.toString());
      });
    }
  },
  login: (event, context) => {
    const username = event.data.username;
    const pass = event.data.password;
    const authRes = authentication.auth(username, pass);
    if (authRes.success) {
      const sess = session.set(authRes.user);
      return context.done(null, {
        success: authRes.success,
        Cookie: sess.Cookie
      });
    } else {
      return context.done(null, authRes)
    }
  },
  logout: (event, context) => {
    const sessionRes = session.get(event.headers);
    const sess = session.destroy(sessionRes.user);
    context.done(null, { Cookie: sess.Cookie });
  }
};
