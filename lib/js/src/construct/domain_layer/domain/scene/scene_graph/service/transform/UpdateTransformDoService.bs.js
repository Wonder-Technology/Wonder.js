'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Quaternion$Wonderjs = require("../../../../../library/structure/Quaternion.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var EulerAnglesVO$Wonderjs = require("../../value_object/EulerAnglesVO.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../value_object/LocalToWorldMatrixVO.bs.js");
var DirtyTransformDoService$Wonderjs = require("./DirtyTransformDoService.bs.js");
var HierachyTransformDoService$Wonderjs = require("./HierachyTransformDoService.bs.js");
var ModelMatrixTransformDoService$Wonderjs = require("./ModelMatrixTransformDoService.bs.js");

function update(transform) {
  if (!DirtyTransformDoService$Wonderjs.isDirty(transform)) {
    return ;
  }
  DirtyTransformDoService$Wonderjs.mark(transform, false);
  var parent = HierachyTransformDoService$Wonderjs.getParent(transform);
  if (parent !== undefined) {
    update(parent);
    var parentLocalToWorldMatrix = ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(parent);
    var childLocalToWorldMatrix = ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform);
    LocalToWorldMatrixVO$Wonderjs.multiply(childLocalToWorldMatrix, parentLocalToWorldMatrix, LocalToWorldMatrixVO$Wonderjs.fromTranslationRotationScale(LocalToWorldMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetGlobalTempRepoDp(undefined).getFloat32Array1, undefined)), ModelMatrixTransformDoService$Wonderjs.getLocalPosition(transform), ModelMatrixTransformDoService$Wonderjs.getLocalRotation(transform), ModelMatrixTransformDoService$Wonderjs.getLocalScale(transform)));
    return ;
  }
  var localToWorldMatrix = ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform);
  LocalToWorldMatrixVO$Wonderjs.fromTranslationRotationScale(localToWorldMatrix, ModelMatrixTransformDoService$Wonderjs.getLocalPosition(transform), ModelMatrixTransformDoService$Wonderjs.getLocalRotation(transform), ModelMatrixTransformDoService$Wonderjs.getLocalScale(transform));
  
}

function updateAndGetPosition(transform) {
  update(transform);
  return LocalToWorldMatrixVO$Wonderjs.getTranslation(ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform));
}

function updateAndSetPosition(transform, position) {
  var parent = HierachyTransformDoService$Wonderjs.getParent(transform);
  if (parent !== undefined) {
    update(parent);
    return ModelMatrixTransformDoService$Wonderjs.setPosition(transform, parent, position);
  } else {
    return ModelMatrixTransformDoService$Wonderjs.setLocalPosition(transform, position);
  }
}

function updateAndGetRotation(transform) {
  update(transform);
  return LocalToWorldMatrixVO$Wonderjs.getRotation(ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform));
}

function updateAndSetRotation(transform, rotation) {
  var parent = HierachyTransformDoService$Wonderjs.getParent(transform);
  if (parent !== undefined) {
    return ModelMatrixTransformDoService$Wonderjs.setLocalRotation(transform, RotationVO$Wonderjs.multiply(RotationVO$Wonderjs.invert(updateAndGetRotation(parent)), rotation));
  } else {
    return ModelMatrixTransformDoService$Wonderjs.setLocalRotation(transform, rotation);
  }
}

function updateAndGetScale(transform) {
  update(transform);
  return LocalToWorldMatrixVO$Wonderjs.getScale(ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform));
}

function updateAndSetScale(transform, scale) {
  var parent = HierachyTransformDoService$Wonderjs.getParent(transform);
  if (parent !== undefined) {
    update(parent);
    return ModelMatrixTransformDoService$Wonderjs.setScale(transform, parent, scale);
  } else {
    return ModelMatrixTransformDoService$Wonderjs.setLocalScale(transform, scale);
  }
}

function updateAndGetEulerAngles(transform) {
  update(transform);
  return LocalToWorldMatrixVO$Wonderjs.getEulerAngles(ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform));
}

function updateAndSetEulerAngles(transform, eulerAngles) {
  return updateAndSetRotation(transform, RotationVO$Wonderjs.create(Quaternion$Wonderjs.setFromEulerAngles(EulerAnglesVO$Wonderjs.getPrimitiveValue(eulerAngles))));
}

exports.update = update;
exports.updateAndGetPosition = updateAndGetPosition;
exports.updateAndSetPosition = updateAndSetPosition;
exports.updateAndGetRotation = updateAndGetRotation;
exports.updateAndSetRotation = updateAndSetRotation;
exports.updateAndGetScale = updateAndGetScale;
exports.updateAndSetScale = updateAndSetScale;
exports.updateAndGetEulerAngles = updateAndGetEulerAngles;
exports.updateAndSetEulerAngles = updateAndSetEulerAngles;
/* No side effect */
