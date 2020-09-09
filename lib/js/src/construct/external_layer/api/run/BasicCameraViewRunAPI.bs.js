'use strict';

var BasicCameraViewApService$Wonderjs = require("../../../application_layer/scene/BasicCameraViewApService.bs.js");

function create(param) {
  return BasicCameraViewApService$Wonderjs.create(undefined);
}

var getGameObject = BasicCameraViewApService$Wonderjs.getGameObject;

var getViewWorldToCameraMatrix = BasicCameraViewApService$Wonderjs.getViewWorldToCameraMatrix;

var isActive = BasicCameraViewApService$Wonderjs.isActive;

var active = BasicCameraViewApService$Wonderjs.active;

var unactive = BasicCameraViewApService$Wonderjs.unactive;

var setActive = BasicCameraViewApService$Wonderjs.setActive;

function getActiveBasicCameraView(param) {
  return BasicCameraViewApService$Wonderjs.getActiveBasicCameraView(undefined);
}

exports.create = create;
exports.getGameObject = getGameObject;
exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
exports.isActive = isActive;
exports.active = active;
exports.unactive = unactive;
exports.setActive = setActive;
exports.getActiveBasicCameraView = getActiveBasicCameraView;
/* No side effect */
