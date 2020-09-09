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

var addPBRMaterial = AddComponentGameObjectDoService$Wonderjs.addPBRMaterial;

var getPBRMaterial = GetComponentGameObjectDoService$Wonderjs.getPBRMaterial;

var hasPBRMaterial = HasComponentGameObjectDoService$Wonderjs.hasPBRMaterial;

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

function getAllRenderPBRMaterials(param) {
  return AllRenderGameObjectsDoService$Wonderjs.getAllRenderPBRMaterials(undefined);
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
