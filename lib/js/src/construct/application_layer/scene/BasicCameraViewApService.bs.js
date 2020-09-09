'use strict';

var ActiveBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/ActiveBasicCameraViewDoService.bs.js");
var CreateBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/CreateBasicCameraViewDoService.bs.js");
var GameObjectBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/GameObjectBasicCameraViewDoService.bs.js");
var ViewMatrixBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/ViewMatrixBasicCameraViewDoService.bs.js");

function create(param) {
  return CreateBasicCameraViewDoService$Wonderjs.create(undefined);
}

var getGameObject = GameObjectBasicCameraViewDoService$Wonderjs.getGameObject;

var getViewWorldToCameraMatrix = ViewMatrixBasicCameraViewDoService$Wonderjs.getViewWorldToCameraMatrix;

var isActive = ActiveBasicCameraViewDoService$Wonderjs.isActive;

var active = ActiveBasicCameraViewDoService$Wonderjs.active;

var unactive = ActiveBasicCameraViewDoService$Wonderjs.unactive;

var setActive = ActiveBasicCameraViewDoService$Wonderjs.setActive;

function getActiveBasicCameraView(param) {
  return ActiveBasicCameraViewDoService$Wonderjs.getActiveCameraView(undefined);
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
