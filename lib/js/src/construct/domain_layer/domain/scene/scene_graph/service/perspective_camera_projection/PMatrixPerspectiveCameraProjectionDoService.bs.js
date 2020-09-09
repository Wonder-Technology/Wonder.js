'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../value_object/ProjectionMatrixVO.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getPMatrix(cameraProjection) {
  return OptionSt$Wonderjs.map(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getPMatrix, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)), ProjectionMatrixVO$Wonderjs.create);
}

function setPMatrix(cameraProjection, pMatrix) {
  return Curry._2(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).setPMatrix, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection), ProjectionMatrixVO$Wonderjs.value(pMatrix));
}

exports.getPMatrix = getPMatrix;
exports.setPMatrix = setPMatrix;
/* No side effect */
