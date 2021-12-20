'use strict';


function getIsDebug(state) {
  return state.config.isDebug;
}

exports.getIsDebug = getIsDebug;
/* No side effect */
