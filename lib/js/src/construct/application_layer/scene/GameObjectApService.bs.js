'use strict';

var AllRenderGameObjectsDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/AllRenderGameObjectsDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/gameObject/GetComponentGameObjectDoService.bs.js");

var getTransform = GetComponentGameObjectDoService$Wonderjs.getTransform;

var getDirectionLight = GetComponentGameObjectDoService$Wonderjs.getDirectionLight;

var getBasicCameraView = GetComponentGameObjectDoService$Wonderjs.getBasicCameraView;

var getPerspectiveCameraProjection = GetComponentGameObjectDoService$Wonderjs.getPerspectiveCameraProjection;

var getBSDFMaterial = GetComponentGameObjectDoService$Wonderjs.getBSDFMaterial;

var getGeometry = GetComponentGameObjectDoService$Wonderjs.getGeometry;

var getAllRenderGameObjects = AllRenderGameObjectsDoService$Wonderjs.getAllRenderGameObjects;

var getAllRenderGeometries = AllRenderGameObjectsDoService$Wonderjs.getAllRenderGeometries;

var getAllRenderBSDFMaterials = AllRenderGameObjectsDoService$Wonderjs.getAllRenderBSDFMaterials;

exports.getTransform = getTransform;
exports.getDirectionLight = getDirectionLight;
exports.getBasicCameraView = getBasicCameraView;
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
exports.getBSDFMaterial = getBSDFMaterial;
exports.getGeometry = getGeometry;
exports.getAllRenderGameObjects = getAllRenderGameObjects;
exports.getAllRenderGeometries = getAllRenderGeometries;
exports.getAllRenderBSDFMaterials = getAllRenderBSDFMaterials;
/* No side effect */
