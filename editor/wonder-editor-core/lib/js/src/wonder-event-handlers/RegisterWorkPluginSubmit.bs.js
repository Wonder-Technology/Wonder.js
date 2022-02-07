'use strict';

var Curry = require("rescript/lib/js/curry.js");

function handler(api, e) {
  var match = api.registerManager;
  Curry._3(match.setRegisteredWorkPlugin, e.fileStr, e.libraryName, e.funcName);
  return Curry._1(match.saveAllRegisteredWorkPugins, undefined);
}

exports.handler = handler;
/* No side effect */
