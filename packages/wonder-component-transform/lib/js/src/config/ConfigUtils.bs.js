'use strict';


function getIsDebug(state) {
  return state.config.isDebug;
}

function getTransformCount(state) {
  return state.config.transformCount;
}

function getFloat9Array1(state) {
  return state.config.float9Array1;
}

function getFloat32Array1(state) {
  return state.config.float32Array1;
}

exports.getIsDebug = getIsDebug;
exports.getTransformCount = getTransformCount;
exports.getFloat9Array1 = getFloat9Array1;
exports.getFloat32Array1 = getFloat32Array1;
/* No side effect */
