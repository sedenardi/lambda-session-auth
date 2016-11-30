'use strict';

const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const loginPath = path.resolve(__dirname, './login.html');
const userPath = path.resolve(__dirname, './user.html');

module.exports = {
  login: (cb) => {
    fs.readFile(loginPath, (err, res) => {
      if (err) { return cb(err); }
      return cb(null, res.toString());
    });
  },
  user: (opts, cb) => {
    fs.readFile(userPath, (err, res) => {
      if (err) { return cb(err); }
      const compiled = template(res.toString());
      const body = compiled(opts);
      return cb(null, body);
    });
  }
};
