'use strict';

var OptionSt$Wonderjs = require("../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var CPContainerManager$Wonderjs = require("../../infrastructure_layer/data/CPContainerManager.bs.js");

function getPipeline(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pipeline;
}

function setPipeline(pipeline) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getScene(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).scene;
}

function setScene(scene) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getGameObject(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).gameObject;
}

function setGameObject(gameObject) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getTransform(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).transform;
}

function getExnTransform(param) {
  return OptionSt$Wonderjs.getExn(CPContainerManager$Wonderjs.getPO(undefined).transform);
}

function setTransform(transform) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getPBRMaterial(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pbrMaterial;
}

function getExnPBRMaterial(param) {
  return OptionSt$Wonderjs.getExn(CPContainerManager$Wonderjs.getPO(undefined).pbrMaterial);
}

function setPBRMaterial(pbrMaterial) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getGeometry(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).geometry;
}

function getExnGeometry(param) {
  return OptionSt$Wonderjs.getExn(CPContainerManager$Wonderjs.getPO(undefined).geometry);
}

function setGeometry(geometry) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getBasicCameraView(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).basicCameraView;
}

function setBasicCameraView(basicCameraView) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getPerspectiveCameraProjection(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).perspectiveCameraProjection;
}

function setPerspectiveCameraProjection(perspectiveCameraProjection) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getDirectionLight(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).directionLight;
}

function getExnDirectionLight(param) {
  return OptionSt$Wonderjs.getExn(CPContainerManager$Wonderjs.getPO(undefined).directionLight);
}

function setDirectionLight(directionLight) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getPOConfig(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).poConfig;
}

function setPOConfig(poConfig) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: poConfig,
              globalTemp: po.globalTemp,
              time: po.time
            });
}

function getGlobalTemp(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).globalTemp;
}

function setGlobalTemp(globalTemp) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: globalTemp,
              time: po.time
            });
}

function getTime(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).time;
}

function setTime(time) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return CPContainerManager$Wonderjs.setPO({
              pipeline: po.pipeline,
              scene: po.scene,
              gameObject: po.gameObject,
              transform: po.transform,
              pbrMaterial: po.pbrMaterial,
              geometry: po.geometry,
              basicCameraView: po.basicCameraView,
              perspectiveCameraProjection: po.perspectiveCameraProjection,
              directionLight: po.directionLight,
              poConfig: po.poConfig,
              globalTemp: po.globalTemp,
              time: time
            });
}

exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
exports.getScene = getScene;
exports.setScene = setScene;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.getTransform = getTransform;
exports.getExnTransform = getExnTransform;
exports.setTransform = setTransform;
exports.getPBRMaterial = getPBRMaterial;
exports.getExnPBRMaterial = getExnPBRMaterial;
exports.setPBRMaterial = setPBRMaterial;
exports.getGeometry = getGeometry;
exports.getExnGeometry = getExnGeometry;
exports.setGeometry = setGeometry;
exports.getBasicCameraView = getBasicCameraView;
exports.setBasicCameraView = setBasicCameraView;
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
exports.setPerspectiveCameraProjection = setPerspectiveCameraProjection;
exports.getDirectionLight = getDirectionLight;
exports.getExnDirectionLight = getExnDirectionLight;
exports.setDirectionLight = setDirectionLight;
exports.getPOConfig = getPOConfig;
exports.setPOConfig = setPOConfig;
exports.getGlobalTemp = getGlobalTemp;
exports.setGlobalTemp = setGlobalTemp;
exports.getTime = getTime;
exports.setTime = setTime;
/* CPContainerManager-Wonderjs Not a pure module */
