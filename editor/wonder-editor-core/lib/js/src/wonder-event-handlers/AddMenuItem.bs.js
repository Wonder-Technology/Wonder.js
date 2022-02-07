'use strict';

var Curry = require("rescript/lib/js/curry.js");

function handler(api, e) {
  var match = api.ui;
  return Curry._1(match.register, e);
}

exports.handler = handler;
/* No side effect */
