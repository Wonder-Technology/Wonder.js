'use strict';


function getLocalPosition(param) {
  return param.localPosition;
}

function getLocalRotation(param) {
  return param.localRotation;
}

function getLocalScale(param) {
  return param.localScale;
}

function getPosition(param) {
  return param.worldPosition;
}

function getRotation(param) {
  return param.worldRotation;
}

function getScale(param) {
  return param.worldScale;
}

function getLocalToWorldMatrix(param) {
  return param.localToWorldMatrix;
}

function getNormalMatrix(param) {
  return param.normalMatrix;
}

exports.getLocalPosition = getLocalPosition;
exports.getLocalRotation = getLocalRotation;
exports.getLocalScale = getLocalScale;
exports.getPosition = getPosition;
exports.getRotation = getRotation;
exports.getScale = getScale;
exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.getNormalMatrix = getNormalMatrix;
/* No side effect */
