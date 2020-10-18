'use strict';

var CreateGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/CreateGameObjectDoService.bs.js");
var AllRenderGameObjectsDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/AllRenderGameObjectsDoService.bs.js");
var AddComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/AddComponentGameObjectDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/GetComponentGameObjectDoService.bs.js");
var HasComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/HasComponentGameObjectDoService.bs.js");

function create(param) {
  return CreateGameObjectDoService$Wonderjs.create(undefined);
}

var addTransform = AddComponentGameObjectDoService$Wonderjs.addTransform;

var getTransform = GetComponentGameObjectDoService$Wonderjs.getTransform;

var hasTransform = HasComponentGameObjectDoService$Wonderjs.hasTransform;

var addBSDFMaterial = AddComponentGameObjectDoService$Wonderjs.addBSDFMaterial;

var getBSDFMaterial = GetComponentGameObjectDoService$Wonderjs.getBSDFMaterial;

var hasBSDFMaterial = HasComponentGameObjectDoService$Wonderjs.hasBSDFMaterial;

var addGeometry = AddComponentGameObjectDoService$Wonderjs.addGeometry;

var getGeometry = GetComponentGameObjectDoService$Wonderjs.getGeometry;

var hasGeometry = HasComponentGameObjectDoService$Wonderjs.hasGeometry;

var addDirectionLight = AddComponentGameObjectDoService$Wonderjs.addDirectionLight;

var getDirectionLight = GetComponentGameObjectDoService$Wonderjs.getDirectionLight;

var hasDirectionLight = HasComponentGameObjectDoService$Wonderjs.hasDirectionLight;

var addBasicCameraView = AddComponentGameObjectDoService$Wonderjs.addBasicCameraView;

var getBasicCameraView = GetComponentGameObjectDoService$Wonderjs.getBasicCameraView;

var hasBasicCameraView = HasComponentGameObjectDoService$Wonderjs.hasBasicCameraView;

var addPerspectiveCameraProjection = AddComponentGameObjectDoService$Wonderjs.addPerspectiveCameraProjection;

var getPerspectiveCameraProjection = GetComponentGameObjectDoService$Wonderjs.getPerspectiveCameraProjection;

var hasPerspectiveCameraProjection = HasComponentGameObjectDoService$Wonderjs.hasPerspectiveCameraProjection;

function getAllRenderGameObjects(param) {
  return AllRenderGameObjectsDoService$Wonderjs.getAllRenderGameObjects(undefined);
}

function getAllRenderGeometries(param) {
  return AllRenderGameObjectsDoService$Wonderjs.getAllRenderGeometries(undefined);
}

function getAllRenderBSDFMaterials(param) {
  return AllRenderGameObjectsDoService$Wonderjs.getAllRenderBSDFMaterials(undefined);
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
