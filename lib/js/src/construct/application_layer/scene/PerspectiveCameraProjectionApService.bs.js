'use strict';

var DirtyPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/DirtyPerspectiveCameraProjectionDoService.bs.js");
var CreatePerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/CreatePerspectiveCameraProjectionDoService.bs.js");
var FrustumPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/FrustumPerspectiveCameraProjectionDoService.bs.js");
var PMatrixPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/PMatrixPerspectiveCameraProjectionDoService.bs.js");
var GameObjectPerspectiveCameraProjectionDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/GameObjectPerspectiveCameraProjectionDoService.bs.js");

function create(param) {
  return CreatePerspectiveCameraProjectionDoService$Wonderjs.create(undefined);
}

var getGameObject = GameObjectPerspectiveCameraProjectionDoService$Wonderjs.getGameObject;

var getPMatrix = PMatrixPerspectiveCameraProjectionDoService$Wonderjs.getPMatrix;

var getFovy = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFovy;

var setFovy = FrustumPerspectiveCameraProjectionDoService$Wonderjs.setFovy;

var getAspect = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getAspect;

var setAspect = FrustumPerspectiveCameraProjectionDoService$Wonderjs.setAspect;

var getNear = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getNear;

var setNear = FrustumPerspectiveCameraProjectionDoService$Wonderjs.setNear;

var getFar = FrustumPerspectiveCameraProjectionDoService$Wonderjs.getFar;

var setFar = FrustumPerspectiveCameraProjectionDoService$Wonderjs.setFar;

var markDirty = DirtyPerspectiveCameraProjectionDoService$Wonderjs.markDirty;

var markNotDirty = DirtyPerspectiveCameraProjectionDoService$Wonderjs.markNotDirty;

exports.create = create;
exports.getGameObject = getGameObject;
exports.getPMatrix = getPMatrix;
exports.getFovy = getFovy;
exports.setFovy = setFovy;
exports.getAspect = getAspect;
exports.setAspect = setAspect;
exports.getNear = getNear;
exports.setNear = setNear;
exports.getFar = getFar;
exports.setFar = setFar;
exports.markDirty = markDirty;
exports.markNotDirty = markNotDirty;
/* No side effect */
