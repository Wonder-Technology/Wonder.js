'use strict';


function getIsDebug(state) {
  return state.config.isDebug;
}

function getGeometryCount(state) {
  return state.config.geometryCount;
}

function getGeometryPointCount(state) {
  return state.config.geometryPointCount;
}

exports.getIsDebug = getIsDebug;
exports.getGeometryCount = getGeometryCount;
exports.getGeometryPointCount = getGeometryPointCount;
/* No side effect */
