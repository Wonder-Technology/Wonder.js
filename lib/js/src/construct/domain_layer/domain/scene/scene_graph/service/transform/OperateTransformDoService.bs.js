'use strict';

var ScaleVO$Wonderjs = require("../../value_object/ScaleVO.bs.js");
var PositionVO$Wonderjs = require("../../value_object/PositionVO.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var NormalMatrixVO$Wonderjs = require("../../value_object/NormalMatrixVO.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../value_object/LocalToWorldMatrixVO.bs.js");

function getLocalPosition(param) {
  return PositionVO$Wonderjs.create(param.localPosition);
}

function getLocalRotation(param) {
  return RotationVO$Wonderjs.create(param.localRotation);
}

function getLocalScale(param) {
  return ScaleVO$Wonderjs.create(param.localScale);
}

function getPosition(param) {
  return PositionVO$Wonderjs.create(param.worldPosition);
}

function getRotation(param) {
  return RotationVO$Wonderjs.create(param.worldRotation);
}

function getScale(param) {
  return ScaleVO$Wonderjs.create(param.worldScale);
}

function getLocalToWorldMatrix(param) {
  return LocalToWorldMatrixVO$Wonderjs.create(param.localToWorldMatrix);
}

function getNormalMatrix(param) {
  return NormalMatrixVO$Wonderjs.create(param.normalMatrix);
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
