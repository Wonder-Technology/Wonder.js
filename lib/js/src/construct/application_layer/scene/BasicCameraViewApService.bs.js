'use strict';

var ActiveBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/ActiveBasicCameraViewDoService.bs.js");
var GameObjectBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/GameObjectBasicCameraViewDoService.bs.js");
var ViewMatrixBasicCameraViewDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/basic_camera_view/ViewMatrixBasicCameraViewDoService.bs.js");

var getGameObject = GameObjectBasicCameraViewDoService$Wonderjs.getGameObject;

var getViewWorldToCameraMatrix = ViewMatrixBasicCameraViewDoService$Wonderjs.getViewWorldToCameraMatrix;

var getActiveBasicCameraView = ActiveBasicCameraViewDoService$Wonderjs.getActiveCameraView;

exports.getGameObject = getGameObject;
exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
exports.getActiveBasicCameraView = getActiveBasicCameraView;
/* No side effect */
