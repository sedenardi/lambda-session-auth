'use strict';

const session = require('./session');
const render = require('./render');
const authentication = require('./authentication');

module.exports = {
  get: (event, context) => {
    const sess = session.getSession(event.headers);
    if (sess.valid) {
      render.user({
        username: sess.user.username,
        first: sess.user.first,
        last: sess.user.last
      }, (err, res) => {
        if (err) { return context.done(err); }
        return context.done(null, res);
      });
    } else {
      render.login((err, res) => {
        if (err) { return context.done(err); }
        return context.done(null, res);
      });
    }
  },
  login: (event, context) => {
    const username = event.data.username;
    const pass = event.data.password;
    const authRes = authentication.auth(username, pass);
    if (authRes.success) {
      const sess = session.setSession(authRes.user);
      return context.done(null, {
        success: authRes.success,
        Cookie: sess.Cookie
      });
    } else {
      return context.done(null, authRes)
    }
  },
  logout: (event, context) => {
    const sessionRes = session.getSession(event.headers);
    const sess = session.destroySession(sessionRes.user);
    context.done(null, { Cookie: sess.Cookie });
  }
};
