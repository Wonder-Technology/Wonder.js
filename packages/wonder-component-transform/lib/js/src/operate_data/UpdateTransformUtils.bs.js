'use strict';

var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var Quaternion$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Quaternion.bs.js");
var ConfigUtils$WonderComponentTransform = require("../config/ConfigUtils.bs.js");
var DirtyTransformUtils$WonderComponentTransform = require("./DirtyTransformUtils.bs.js");
var HierachyTransformUtils$WonderComponentTransform = require("./HierachyTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentTransform = require("./ModelMatrixTransformUtils.bs.js");
var ModelMatrixTransformUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/transform/ModelMatrixTransformUtils.bs.js");

function mutableUpdate(state, transform) {
  var localToWorldMatrices = state.localToWorldMatrices;
  var localPositions = state.localPositions;
  var localRotations = state.localRotations;
  var localScales = state.localScales;
  if (!DirtyTransformUtils$WonderComponentTransform.isDirty(state, transform)) {
    return state;
  }
  var state$1 = DirtyTransformUtils$WonderComponentTransform.mark(state, transform, false);
  var parent = HierachyTransformUtils$WonderComponentTransform.getParent(state.parentMap, transform);
  if (parent !== undefined) {
    var state$2 = mutableUpdate(state$1, parent);
    var localToWorldMatrices$1 = state$2.localToWorldMatrices;
    var localPositions$1 = state$2.localPositions;
    var localRotations$1 = state$2.localRotations;
    var localScales$1 = state$2.localScales;
    var parentLocalToWorldMatrix = ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices$1, parent);
    var childLocalToWorldMatrix = ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices$1, transform);
    Matrix4$WonderCommonlib.multiply(childLocalToWorldMatrix, parentLocalToWorldMatrix, Matrix4$WonderCommonlib.fromTranslationRotationScale(ConfigUtils$WonderComponentTransform.getFloat32Array1(state$2), ModelMatrixTransformUtils$WonderComponentTransform.getLocalPosition(localPositions$1, transform), ModelMatrixTransformUtils$WonderComponentTransform.getLocalRotation(localRotations$1, transform), ModelMatrixTransformUtils$WonderComponentTransform.getLocalScale(localScales$1, transform)));
    return state$2;
  }
  var localToWorldMatrix = ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform);
  Matrix4$WonderCommonlib.fromTranslationRotationScale(localToWorldMatrix, ModelMatrixTransformUtils$WonderComponentTransform.getLocalPosition(localPositions, transform), ModelMatrixTransformUtils$WonderComponentTransform.getLocalRotation(localRotations, transform), ModelMatrixTransformUtils$WonderComponentTransform.getLocalScale(localScales, transform));
  return state$1;
}

function updateAndGetPosition(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$WonderCommonlib.getTranslationTuple(ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetPosition(state, transform, position) {
  var parent = HierachyTransformUtils$WonderComponentTransform.getParent(state.parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$WonderComponentTransform.setLocalPosition(state, transform, position);
  }
  var state$1 = mutableUpdate(state, parent);
  return ModelMatrixTransformUtils$WonderComponentTransform.setPosition(state$1, transform, parent, position);
}

function updateAndGetRotation(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$WonderCommonlib.getRotationTuple(ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetRotation(state, transform, rotation) {
  var parent = HierachyTransformUtils$WonderComponentTransform.getParent(state.parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$WonderComponentTransform.setLocalRotation(state, transform, rotation);
  }
  var match = updateAndGetRotation(state, parent);
  return ModelMatrixTransformUtils$WonderComponentTransform.setLocalRotation(match[0], transform, Quaternion$WonderCommonlib.multiply(Quaternion$WonderCommonlib.invert(match[1]), rotation));
}

function updateAndGetScale(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$WonderCommonlib.getScaleTuple(ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetScale(state, transform, scale) {
  var parent = HierachyTransformUtils$WonderComponentTransform.getParent(state.parentMap, transform);
  if (parent === undefined) {
    return ModelMatrixTransformUtils$WonderComponentTransform.setLocalScale(state, transform, scale);
  }
  var state$1 = mutableUpdate(state, parent);
  return ModelMatrixTransformUtils$WonderComponentTransform.setScale(state$1, transform, parent, scale);
}

function updateAndGetEulerAngles(state, transform) {
  var state$1 = mutableUpdate(state, transform);
  var localToWorldMatrices = state$1.localToWorldMatrices;
  return [
          state$1,
          Matrix4$WonderCommonlib.getEulerAngles(ModelMatrixTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrix(localToWorldMatrices, transform))
        ];
}

function updateAndSetEulerAngles(state, transform, eulerAngles) {
  return updateAndSetRotation(state, transform, Quaternion$WonderCommonlib.setFromEulerAngles(eulerAngles));
}

exports.mutableUpdate = mutableUpdate;
exports.updateAndGetPosition = updateAndGetPosition;
exports.updateAndSetPosition = updateAndSetPosition;
exports.updateAndGetRotation = updateAndGetRotation;
exports.updateAndSetRotation = updateAndSetRotation;
exports.updateAndGetScale = updateAndGetScale;
exports.updateAndSetScale = updateAndSetScale;
exports.updateAndGetEulerAngles = updateAndGetEulerAngles;
exports.updateAndSetEulerAngles = updateAndSetEulerAngles;
/* No side effect */
