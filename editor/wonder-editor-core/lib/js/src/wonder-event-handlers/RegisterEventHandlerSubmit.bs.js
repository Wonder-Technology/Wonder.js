'use strict';

var Curry = require("rescript/lib/js/curry.js");

function handler(api, e) {
  var handlerFunc = e.handlerFunc;
  var eventName = e.eventName;
  var match = api.eventManager;
  Curry._2(match.onCustomEvent, eventName, handlerFunc);
  var match$1 = api.ui;
  return Curry._1(match$1.dispatch, [
              "submit",
              eventName,
              handlerFunc
            ]);
}

exports.handler = handler;
/* No side effect */
