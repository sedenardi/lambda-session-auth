'use strict';

const session = require('./session');
const render = require('./render');
const authentication = require('./authentication');

module.exports = {
  get: (event, context) => {
    const sessionRes = session.get(event.headers);
    if (sessionRes.valid) {
      render.user({
        username: sessionRes.user.username,
        first: sessionRes.user.first,
        last: sessionRes.user.last
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
