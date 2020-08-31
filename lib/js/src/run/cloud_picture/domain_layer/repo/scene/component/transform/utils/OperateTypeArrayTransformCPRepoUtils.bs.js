'use strict';

var TypeArrayCPRepoUtils$Wonderjs = require("../../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferTransformCPRepoUtils$Wonderjs = require("./BufferTransformCPRepoUtils.bs.js");

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat16TypeArray(BufferTransformCPRepoUtils$Wonderjs.getLocalToWorldMatrixIndex(index), typeArr);
}

function setLocalToWorldMatrix(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat16(BufferTransformCPRepoUtils$Wonderjs.getLocalToWorldMatrixIndex(index), data, typeArr);
}

function getLocalPositionTuple(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferTransformCPRepoUtils$Wonderjs.getLocalPositionIndex(index), typeArr);
}

function setLocalPosition(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferTransformCPRepoUtils$Wonderjs.getLocalPositionIndex(index), data, typeArr);
}

function getLocalRotationTuple(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat4Tuple(BufferTransformCPRepoUtils$Wonderjs.getLocalRotationIndex(index), typeArr);
}

function setLocalRotation(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat4(BufferTransformCPRepoUtils$Wonderjs.getLocalRotationIndex(index), data, typeArr);
}

function getLocalScaleTuple(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferTransformCPRepoUtils$Wonderjs.getLocalScaleIndex(index), typeArr);
}

function setLocalScale(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferTransformCPRepoUtils$Wonderjs.getLocalScaleIndex(index), data, typeArr);
}

exports.getLocalToWorldMatrixTypeArray = getLocalToWorldMatrixTypeArray;
exports.setLocalToWorldMatrix = setLocalToWorldMatrix;
exports.getLocalPositionTuple = getLocalPositionTuple;
exports.setLocalPosition = setLocalPosition;
exports.getLocalRotationTuple = getLocalRotationTuple;
exports.setLocalRotation = setLocalRotation;
exports.getLocalScaleTuple = getLocalScaleTuple;
exports.setLocalScale = setLocalScale;
/* No side effect */
