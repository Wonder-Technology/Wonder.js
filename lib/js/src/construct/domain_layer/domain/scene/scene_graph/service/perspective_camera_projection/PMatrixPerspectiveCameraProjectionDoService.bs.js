'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../value_object/ProjectionMatrixVO.bs.js");
var PerspectiveCameraProjectionEntity$Wonderjs = require("../../entity/PerspectiveCameraProjectionEntity.bs.js");

function getPMatrix(cameraProjection) {
  return ProjectionMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetPerspectiveCameraProjectionRepoDp(undefined).getPMatrix, PerspectiveCameraProjectionEntity$Wonderjs.value(cameraProjection)));
}

exports.getPMatrix = getPMatrix;
/* No side effect */
