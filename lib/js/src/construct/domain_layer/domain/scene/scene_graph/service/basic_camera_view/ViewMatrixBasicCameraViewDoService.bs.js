'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var ViewMatrixVO$Wonderjs = require("../../value_object/ViewMatrixVO.bs.js");
var BasicCameraViewEntity$Wonderjs = require("../../entity/BasicCameraViewEntity.bs.js");

function getViewWorldToCameraMatrix(cameraView) {
  return ViewMatrixVO$Wonderjs.create(Curry._1(DpContainer$Wonderjs.unsafeGetBasicCameraViewRepoDp(undefined).getViewWorldToCameraMatrix, BasicCameraViewEntity$Wonderjs.value(cameraView)));
}

exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
/* No side effect */
