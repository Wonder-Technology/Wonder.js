'use strict';


function getIsDebug(state) {
  return state.config.isDebug;
}

function getDirectionLightCount(state) {
  return state.config.directionLightCount;
}

exports.getIsDebug = getIsDebug;
exports.getDirectionLightCount = getDirectionLightCount;
/* No side effect */
