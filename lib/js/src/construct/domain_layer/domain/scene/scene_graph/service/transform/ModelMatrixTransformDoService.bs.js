'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Tuple3$Wonderjs = require("../../../../../library/structure/Tuple3.bs.js");
var AngleVO$Wonderjs = require("../../value_object/AngleVO.bs.js");
var Matrix4$Wonderjs = require("../../../../../library/structure/Matrix4.bs.js");
var ScaleVO$Wonderjs = require("../../value_object/ScaleVO.bs.js");
var Vector3$Wonderjs = require("../../../../../library/structure/Vector3.bs.js");
var PositionVO$Wonderjs = require("../../value_object/PositionVO.bs.js");
var Quaternion$Wonderjs = require("../../../../../library/structure/Quaternion.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var EulerAnglesVO$Wonderjs = require("../../value_object/EulerAnglesVO.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../value_object/LocalToWorldMatrixVO.bs.js");
var HierachyTransformDoService$Wonderjs = require("./HierachyTransformDoService.bs.js");

function getLocalToWorldMatrix(transform) {
  return LocalToWorldMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalToWorldMatrix, TransformEntity$Wonderjs.value(transform)));
}

function getLocalPosition(transform) {
  return PositionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalPosition, TransformEntity$Wonderjs.value(transform)));
}

function setLocalPosition(transform, localPosition) {
  return Result$Wonderjs.mapSuccess(Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setLocalPosition, TransformEntity$Wonderjs.value(transform), PositionVO$Wonderjs.value(localPosition)), (function (param) {
                return HierachyTransformDoService$Wonderjs.markHierachyDirty(transform);
              }));
}

function setPosition(transform, parent, position) {
  return Result$Wonderjs.bind(Matrix4$Wonderjs.invert(Curry._1(DpContainer$Wonderjs.unsafeGetGlobalTempRepoDp(undefined).getFloat32Array1, undefined), LocalToWorldMatrixVO$Wonderjs.value(getLocalToWorldMatrix(parent))), (function (mat4) {
                return setLocalPosition(transform, PositionVO$Wonderjs.create(Vector3$Wonderjs.transformMat4Tuple(PositionVO$Wonderjs.value(position), mat4)));
              }));
}

function getLocalRotation(transform) {
  return RotationVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalRotation, TransformEntity$Wonderjs.value(transform)));
}

function setLocalRotation(transform, localRotation) {
  return Result$Wonderjs.mapSuccess(Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setLocalRotation, TransformEntity$Wonderjs.value(transform), RotationVO$Wonderjs.value(localRotation)), (function (param) {
                return HierachyTransformDoService$Wonderjs.markHierachyDirty(transform);
              }));
}

function getLocalEulerAngles(transform) {
  return EulerAnglesVO$Wonderjs.create(Tuple3$Wonderjs.map(Quaternion$Wonderjs.getEulerAngles(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalRotation, TransformEntity$Wonderjs.value(transform))), AngleVO$Wonderjs.create));
}

function setLocalEulerAngles(transform, localEulerAngles) {
  return setLocalRotation(transform, RotationVO$Wonderjs.create(Quaternion$Wonderjs.setFromEulerAngles(EulerAnglesVO$Wonderjs.getPrimitiveValue(localEulerAngles))));
}

function getLocalScale(transform) {
  return ScaleVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalScale, TransformEntity$Wonderjs.value(transform)));
}

function setLocalScale(transform, localScale) {
  return Result$Wonderjs.mapSuccess(Curry._2(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).setLocalScale, TransformEntity$Wonderjs.value(transform), ScaleVO$Wonderjs.value(localScale)), (function (param) {
                return HierachyTransformDoService$Wonderjs.markHierachyDirty(transform);
              }));
}

function setScale(transform, parent, scale) {
  return Result$Wonderjs.bind(Matrix4$Wonderjs.invert(Curry._1(DpContainer$Wonderjs.unsafeGetGlobalTempRepoDp(undefined).getFloat32Array1, undefined), LocalToWorldMatrixVO$Wonderjs.value(getLocalToWorldMatrix(parent))), (function (mat4) {
                return setLocalScale(transform, ScaleVO$Wonderjs.create(Vector3$Wonderjs.transformMat4Tuple(ScaleVO$Wonderjs.value(scale), mat4)));
              }));
}

exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.getLocalPosition = getLocalPosition;
exports.setLocalPosition = setLocalPosition;
exports.setPosition = setPosition;
exports.getLocalRotation = getLocalRotation;
exports.setLocalRotation = setLocalRotation;
exports.getLocalEulerAngles = getLocalEulerAngles;
exports.setLocalEulerAngles = setLocalEulerAngles;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
exports.setScale = setScale;
/* No side effect */
