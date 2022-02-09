'use strict';

var Curry = require("rescript/lib/js/curry.js");

function handler(states, api, e) {
  var middlewareState = states.middlewareState;
  var match = api.middlewareManager;
  var setState = match.setState;
  var unsafeGetState = match.unsafeGetState;
  var unsafeGetData = match.unsafeGetData;
  var match$1 = Curry._2(unsafeGetData, middlewareState, "EventManager");
  var eventManagerState = Curry._2(unsafeGetState, middlewareState, "EventManager");
  var handlerFunc = e.handlerFunc;
  var eventName = e.eventName;
  var eventManagerState$1 = Curry._3(match$1.onCustomEvent, eventManagerState, eventName, handlerFunc);
  var match$2 = Curry._2(unsafeGetData, middlewareState, "UI");
  var uiState = Curry._2(unsafeGetState, middlewareState, "UI");
  var uiState$1 = Curry._2(match$2.dispatch, uiState, [
        "submit",
        eventName,
        handlerFunc
      ]);
  var middlewareState$1 = Curry._3(setState, Curry._3(setState, middlewareState, "EventManager", eventManagerState$1), "UI", uiState$1);
  return {
          middlewareState: middlewareState$1
        };
}

exports.handler = handler;
/* No side effect */
