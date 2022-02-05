'use strict';


function onCustomEvent(param) {
  return 1;
}

function trigger(param) {
  return 1;
}

function buildAPI(param) {
  return {
          trigger: trigger,
          onCustomEvent: onCustomEvent
        };
}

exports.onCustomEvent = onCustomEvent;
exports.trigger = trigger;
exports.buildAPI = buildAPI;
/* No side effect */
