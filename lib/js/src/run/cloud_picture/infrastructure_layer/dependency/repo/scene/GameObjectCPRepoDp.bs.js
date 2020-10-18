'use strict';

var CPRepo$Wonderjs = require("../../../data/container/CPRepo.bs.js");
var ListSt$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function getMaxUID(param) {
  return CPRepo$Wonderjs.getGameObject(undefined).maxUID;
}

function setMaxUID(maxUID) {
  var init = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: maxUID,
              transformMap: init.transformMap,
              bsdfMaterialMap: init.bsdfMaterialMap,
              geometryMap: init.geometryMap,
              directionLightMap: init.directionLightMap,
              basicCameraViewMap: init.basicCameraViewMap,
              perspectiveCameraProjectionMap: init.perspectiveCameraProjectionMap
            });
}

function addTransform(gameObject, transform) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.transformMap, gameObject, transform),
              bsdfMaterialMap: gameObjectPO.bsdfMaterialMap,
              geometryMap: gameObjectPO.geometryMap,
              directionLightMap: gameObjectPO.directionLightMap,
              basicCameraViewMap: gameObjectPO.basicCameraViewMap,
              perspectiveCameraProjectionMap: gameObjectPO.perspectiveCameraProjectionMap
            });
}

function getTransform(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).transformMap, gameObject);
}

function hasTransform(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).transformMap, gameObject);
}

function addBSDFMaterial(gameObject, material) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: gameObjectPO.transformMap,
              bsdfMaterialMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.bsdfMaterialMap, gameObject, material),
              geometryMap: gameObjectPO.geometryMap,
              directionLightMap: gameObjectPO.directionLightMap,
              basicCameraViewMap: gameObjectPO.basicCameraViewMap,
              perspectiveCameraProjectionMap: gameObjectPO.perspectiveCameraProjectionMap
            });
}

function getBSDFMaterial(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).bsdfMaterialMap, gameObject);
}

function hasBSDFMaterial(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).bsdfMaterialMap, gameObject);
}

function addGeometry(gameObject, geometry) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: gameObjectPO.transformMap,
              bsdfMaterialMap: gameObjectPO.bsdfMaterialMap,
              geometryMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.geometryMap, gameObject, geometry),
              directionLightMap: gameObjectPO.directionLightMap,
              basicCameraViewMap: gameObjectPO.basicCameraViewMap,
              perspectiveCameraProjectionMap: gameObjectPO.perspectiveCameraProjectionMap
            });
}

function getGeometry(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).geometryMap, gameObject);
}

function hasGeometry(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).geometryMap, gameObject);
}

function addDirectionLight(gameObject, directionLight) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: gameObjectPO.transformMap,
              bsdfMaterialMap: gameObjectPO.bsdfMaterialMap,
              geometryMap: gameObjectPO.geometryMap,
              directionLightMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.directionLightMap, gameObject, directionLight),
              basicCameraViewMap: gameObjectPO.basicCameraViewMap,
              perspectiveCameraProjectionMap: gameObjectPO.perspectiveCameraProjectionMap
            });
}

function getDirectionLight(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).directionLightMap, gameObject);
}

function hasDirectionLight(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).directionLightMap, gameObject);
}

function addBasicCameraView(gameObject, basicCameraView) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: gameObjectPO.transformMap,
              bsdfMaterialMap: gameObjectPO.bsdfMaterialMap,
              geometryMap: gameObjectPO.geometryMap,
              directionLightMap: gameObjectPO.directionLightMap,
              basicCameraViewMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.basicCameraViewMap, gameObject, basicCameraView),
              perspectiveCameraProjectionMap: gameObjectPO.perspectiveCameraProjectionMap
            });
}

function getBasicCameraView(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).basicCameraViewMap, gameObject);
}

function hasBasicCameraView(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).basicCameraViewMap, gameObject);
}

function addPerspectiveCameraProjection(gameObject, perspectiveCameraProjection) {
  var gameObjectPO = CPRepo$Wonderjs.getGameObject(undefined);
  return CPRepo$Wonderjs.setGameObject({
              maxUID: gameObjectPO.maxUID,
              transformMap: gameObjectPO.transformMap,
              bsdfMaterialMap: gameObjectPO.bsdfMaterialMap,
              geometryMap: gameObjectPO.geometryMap,
              directionLightMap: gameObjectPO.directionLightMap,
              basicCameraViewMap: gameObjectPO.basicCameraViewMap,
              perspectiveCameraProjectionMap: ImmutableSparseMap$Wonderjs.set(gameObjectPO.perspectiveCameraProjectionMap, gameObject, perspectiveCameraProjection)
            });
}

function getPerspectiveCameraProjection(gameObject) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getGameObject(undefined).perspectiveCameraProjectionMap, gameObject);
}

function hasPerspectiveCameraProjection(gameObject) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getGameObject(undefined).perspectiveCameraProjectionMap, gameObject);
}

function getAllGeometryGameObjects(param) {
  return ListSt$Wonderjs.fromArray(ImmutableSparseMap$Wonderjs.getKeys(CPRepo$Wonderjs.getGameObject(undefined).geometryMap));
}

function getAllGameObjectGeometries(param) {
  return ListSt$Wonderjs.fromArray(ImmutableSparseMap$Wonderjs.getValues(CPRepo$Wonderjs.getGameObject(undefined).geometryMap));
}

function getAllGameObjectBSDFMaterials(param) {
  return ListSt$Wonderjs.fromArray(ImmutableSparseMap$Wonderjs.getValues(CPRepo$Wonderjs.getGameObject(undefined).bsdfMaterialMap));
}

exports.getMaxUID = getMaxUID;
exports.setMaxUID = setMaxUID;
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
exports.getAllGeometryGameObjects = getAllGeometryGameObjects;
exports.getAllGameObjectGeometries = getAllGameObjectGeometries;
exports.getAllGameObjectBSDFMaterials = getAllGameObjectBSDFMaterials;
/* CPRepo-Wonderjs Not a pure module */
