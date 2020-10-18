'use strict';

var GameObjectApService$Wonderjs = require("../../../../application_layer/scene/GameObjectApService.bs.js");

function create(param) {
  return GameObjectApService$Wonderjs.create(undefined);
}

var addTransform = GameObjectApService$Wonderjs.addTransform;

var getTransform = GameObjectApService$Wonderjs.getTransform;

var hasTransform = GameObjectApService$Wonderjs.hasTransform;

var addBSDFMaterial = GameObjectApService$Wonderjs.addBSDFMaterial;

var getBSDFMaterial = GameObjectApService$Wonderjs.getBSDFMaterial;

var hasBSDFMaterial = GameObjectApService$Wonderjs.hasBSDFMaterial;

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

function getAllRenderBSDFMaterials(param) {
  return GameObjectApService$Wonderjs.getAllRenderBSDFMaterials(undefined);
}

exports.create = create;
exports.addTransform = addTransform;
exports.getTransform = getTransform;
exports.hasTransform = hasTransform;
exports.addBSDFMaterial = addBSDFMaterial;
exports.getBSDFMaterial = getBSDFMaterial;
exports.hasBSDFMaterial = hasBSDFMaterial;
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
exports.getAllRenderBSDFMaterials = getAllRenderBSDFMaterials;
/* No side effect */
