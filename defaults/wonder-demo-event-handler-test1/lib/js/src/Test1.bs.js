'use strict';


function handler(states, api, e) {
  console.log(e);
  return states;
}

exports.handler = handler;
/* No side effect */
