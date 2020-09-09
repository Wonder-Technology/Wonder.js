'use strict';

var GameObjectApService$Wonderjs = require("../../../application_layer/scene/GameObjectApService.bs.js");

function create(param) {
  return GameObjectApService$Wonderjs.create(undefined);
}

var addTransform = GameObjectApService$Wonderjs.addTransform;

var getTransform = GameObjectApService$Wonderjs.getTransform;

var hasTransform = GameObjectApService$Wonderjs.hasTransform;

var addPBRMaterial = GameObjectApService$Wonderjs.addPBRMaterial;

var getPBRMaterial = GameObjectApService$Wonderjs.getPBRMaterial;

var hasPBRMaterial = GameObjectApService$Wonderjs.hasPBRMaterial;

var addGeometry = GameObjectApService$Wonderjs.addGeometry;

var getGeometry = GameObjectApService$Wonderjs.getGeometry;

var hasGeometry = GameObjectApService$Wonderjs.hasGeometry;

var addDirectionLight = GameObjectApService$Wonderjs.addDirectionLight;

var getDirectionLight = GameObjectApService$Wonderjs.getDirectionLight;

var hasDirectionLight = GameObjectApService$Wonderjs.hasDirectionLight;

var addBasicCameraView = GameObjectApService$Wonderjs.addBasicCameraView;

var getBasicCameraView = GameObjectApService$Wonderjs.getBasicCameraView;

var hasBasicCameraView = GameObjectApService$Wonderjs.hasBasicCameraView;

var addPerspectiveCameraProjection = GameObjectApService$Wonderjs.addPerspectiveCameraProjection;

var getPerspectiveCameraProjection = GameObjectApService$Wonderjs.getPerspectiveCameraProjection;

var hasPerspectiveCameraProjection = GameObjectApService$Wonderjs.hasPerspectiveCameraProjection;

function getAllRenderGameObjects(param) {
  return GameObjectApService$Wonderjs.getAllRenderGameObjects(undefined);
}

function getAllRenderGeometries(param) {
  return GameObjectApService$Wonderjs.getAllRenderGeometries(undefined);
}

function getAllRenderPBRMaterials(param) {
  return GameObjectApService$Wonderjs.getAllRenderPBRMaterials(undefined);
}

exports.create = create;
exports.addTransform = addTransform;
exports.getTransform = getTransform;
exports.hasTransform = hasTransform;
exports.addPBRMaterial = addPBRMaterial;
exports.getPBRMaterial = getPBRMaterial;
exports.hasPBRMaterial = hasPBRMaterial;
exports.addGeometry = addGeometry;
exports.getGeometry = getGeometry;
exports.hasGeometry = hasGeometry;
exports.addDirectionLight = addDirectionLight;
exports.getDirectionLight = getDirectionLight;
exports.hasDirectionLight = hasDirectionLight;
exports.addBasicCameraView = addBasicCameraView;
exports.getBasicCameraView = getBasicCameraView;
exports.hasBasicCameraView = hasBasicCameraView;
exports.addPerspectiveCameraProjection = addPerspectiveCameraProjection;
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
exports.hasPerspectiveCameraProjection = hasPerspectiveCameraProjection;
exports.getAllRenderGameObjects = getAllRenderGameObjects;
exports.getAllRenderGeometries = getAllRenderGeometries;
exports.getAllRenderPBRMaterials = getAllRenderPBRMaterials;
/* No side effect */
