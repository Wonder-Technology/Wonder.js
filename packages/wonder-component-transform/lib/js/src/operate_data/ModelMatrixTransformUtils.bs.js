'use strict';

var Matrix3$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix3.bs.js");
var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var Vector3$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Vector3.bs.js");
var Quaternion$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Quaternion.bs.js");
var ConfigUtils$WonderComponentTransform = require("../config/ConfigUtils.bs.js");
var HierachyTransformUtils$WonderComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");
var OperateTypeArrayTransformUtils$WonderComponentTransform = require("../utils/OperateTypeArrayTransformUtils.bs.js");

function getLocalPosition(localPositions, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalPositionTuple(transform, localPositions);
}

function setLocalPosition(state, transform, localPosition) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalPosition(transform, localPosition, state.localPositions);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function setPosition(state, transform, parent, position) {
  return setLocalPosition(state, transform, Vector3$WonderCommonlib.transformMat4Tuple(position, Matrix4$WonderCommonlib.invert(ConfigUtils$WonderComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalRotation(localRotations, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalRotationTuple(transform, localRotations);
}

function setLocalRotation(state, transform, localRotation) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalRotation(transform, localRotation, state.localRotations);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function getLocalScale(localScales, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalScaleTuple(transform, localScales);
}

function setLocalScale(state, transform, localScale) {
  OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalScale(transform, localScale, state.localScales);
  return HierachyTransformUtils$WonderComponentTransform.markHierachyDirty(state, transform);
}

function setScale(state, transform, parent, scale) {
  return setLocalScale(state, transform, Vector3$WonderCommonlib.transformMat4Tuple(scale, Matrix4$WonderCommonlib.invert(ConfigUtils$WonderComponentTransform.getFloat32Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, parent))));
}

function getLocalEulerAngles(localRotations, transform) {
  return Quaternion$WonderCommonlib.getEulerAngles(OperateTypeArrayTransformUtils$WonderComponentTransform.getLocalRotationTuple(transform, localRotations));
}

function setLocalEulerAngles(state, transform, localEulerAngles) {
  return setLocalRotation(state, transform, Quaternion$WonderCommonlib.setFromEulerAngles(localEulerAngles));
}

function getNormalMatrix(state, transform) {
  return Matrix3$WonderCommonlib.transposeSelf(Matrix4$WonderCommonlib.invertTo3x3(ConfigUtils$WonderComponentTransform.getFloat9Array1(state), ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(state.localToWorldMatrices, transform)));
}

exports.getLocalPosition = getLocalPosition;
exports.setLocalPosition = setLocalPosition;
exports.setPosition = setPosition;
exports.getLocalRotation = getLocalRotation;
exports.setLocalRotation = setLocalRotation;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
exports.setScale = setScale;
exports.getLocalEulerAngles = getLocalEulerAngles;
exports.setLocalEulerAngles = setLocalEulerAngles;
exports.getNormalMatrix = getNormalMatrix;
/* No side effect */
