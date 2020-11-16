'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Tuple3$Wonderjs = require("../../../../../library/structure/tuple/Tuple3.bs.js");
var AngleVO$Wonderjs = require("../../value_object/AngleVO.bs.js");
var ScaleVO$Wonderjs = require("../../value_object/ScaleVO.bs.js");
var PositionVO$Wonderjs = require("../../value_object/PositionVO.bs.js");
var RotationVO$Wonderjs = require("../../value_object/RotationVO.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var EulerAnglesVO$Wonderjs = require("../../value_object/EulerAnglesVO.bs.js");
var NormalMatrixVO$Wonderjs = require("../../value_object/NormalMatrixVO.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../value_object/LocalToWorldMatrixVO.bs.js");

function getLocalPosition(transform) {
  return PositionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalPosition, TransformEntity$Wonderjs.value(transform)));
}

function getLocalRotation(transform) {
  return RotationVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalRotation, TransformEntity$Wonderjs.value(transform)));
}

function getLocalEulerAngles(transform) {
  return EulerAnglesVO$Wonderjs.create(Tuple3$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalEulerAngles, TransformEntity$Wonderjs.value(transform)), AngleVO$Wonderjs.create));
}

function getLocalScale(transform) {
  return ScaleVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalScale, TransformEntity$Wonderjs.value(transform)));
}

function getPosition(transform) {
  return PositionVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getPosition, TransformEntity$Wonderjs.value(transform)));
}

function getRotation(transform) {
  return RotationVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getRotation, TransformEntity$Wonderjs.value(transform)));
}

function getScale(transform) {
  return ScaleVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getScale, TransformEntity$Wonderjs.value(transform)));
}

function getLocalToWorldMatrix(transform) {
  return LocalToWorldMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getLocalToWorldMatrix, TransformEntity$Wonderjs.value(transform)));
}

function getNormalMatrix(transform) {
  return NormalMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetTransformRepoDp(undefined).getNormalMatrix, TransformEntity$Wonderjs.value(transform)));
}

exports.getLocalPosition = getLocalPosition;
exports.getLocalRotation = getLocalRotation;
exports.getLocalEulerAngles = getLocalEulerAngles;
exports.getLocalScale = getLocalScale;
exports.getPosition = getPosition;
exports.getRotation = getRotation;
exports.getScale = getScale;
exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.getNormalMatrix = getNormalMatrix;
/* No side effect */
