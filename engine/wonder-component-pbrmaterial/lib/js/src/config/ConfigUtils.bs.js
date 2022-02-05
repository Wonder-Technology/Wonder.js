'use strict';


function getIsDebug(state) {
  return state.config.isDebug;
}

function getPBRMaterialCount(state) {
  return state.config.pbrMaterialCount;
}

exports.getIsDebug = getIsDebug;
exports.getPBRMaterialCount = getPBRMaterialCount;
/* No side effect */
