'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");

var setStartTime = function (startTime){
  if(!!window.performance){
    window.performance.now = () => startTime;
  }
  else{
    window.performance = {
      now: () => startTime
    };
  }
  };

function getTimeControllerRecord(state) {
  return state[/* timeControllerRecord */32];
}

function setElapsed(elapsed, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* timeControllerRecord */32];
  newrecord[/* timeControllerRecord */32] = /* record */[
    /* elapsed */elapsed,
    /* startTime */init[/* startTime */1],
    /* deltaTime */init[/* deltaTime */2],
    /* lastTime */init[/* lastTime */3],
    /* gameTime */init[/* gameTime */4],
    /* fps */init[/* fps */5]
  ];
  return newrecord;
}

exports.setStartTime = setStartTime;
exports.getTimeControllerRecord = getTimeControllerRecord;
exports.setElapsed = setElapsed;
/* No side effect */
