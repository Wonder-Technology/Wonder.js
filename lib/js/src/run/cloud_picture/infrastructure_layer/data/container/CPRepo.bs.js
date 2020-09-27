'use strict';

var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var CPContainerManager$Wonderjs = require("../CPContainerManager.bs.js");

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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getExnTransform(param) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return OptionSt$Wonderjs.getExn(po.transform);
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getExnPBRMaterial(param) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return OptionSt$Wonderjs.getExn(po.pbrMaterial);
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getExnGeometry(param) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return OptionSt$Wonderjs.getExn(po.geometry);
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getExnDirectionLight(param) {
  var po = CPContainerManager$Wonderjs.getPO(undefined);
  return OptionSt$Wonderjs.getExn(po.directionLight);
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getGlobalTemp(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).globalTemp;
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
              time: time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getPicture(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).picture;
}

function setPicture(picture) {
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
              time: po.time,
              picture: picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getWebGPU(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).webgpu;
}

function setWebGPU(webgpu) {
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
              time: po.time,
              picture: po.picture,
              webgpu: webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getCamera(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).camera;
}

function setCamera(camera) {
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pass;
}

function setPass(pass) {
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getRayTracingPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).pathTracingPass;
}

function setRayTracingPass(pathTracingPass) {
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: po.image
            });
}

function getAccumulationPass(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).accumulationPass;
}

function setAccumulationPass(accumulationPass) {
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: accumulationPass,
              image: po.image
            });
}

function getImage(param) {
  return CPContainerManager$Wonderjs.getPO(undefined).image;
}

function setImage(image) {
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
              time: po.time,
              picture: po.picture,
              webgpu: po.webgpu,
              camera: po.camera,
              pass: po.pass,
              pathTracingPass: po.pathTracingPass,
              accumulationPass: po.accumulationPass,
              image: image
            });
}

exports.getPipeline = getPipeline;
exports.setPipeline = setPipeline;
exports.getScene = getScene;
exports.setScene = setScene;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.getExnTransform = getExnTransform;
exports.setTransform = setTransform;
exports.getExnPBRMaterial = getExnPBRMaterial;
exports.setPBRMaterial = setPBRMaterial;
exports.getExnGeometry = getExnGeometry;
exports.setGeometry = setGeometry;
exports.getBasicCameraView = getBasicCameraView;
exports.setBasicCameraView = setBasicCameraView;
exports.getPerspectiveCameraProjection = getPerspectiveCameraProjection;
exports.setPerspectiveCameraProjection = setPerspectiveCameraProjection;
exports.getExnDirectionLight = getExnDirectionLight;
exports.setDirectionLight = setDirectionLight;
exports.getPOConfig = getPOConfig;
exports.setPOConfig = setPOConfig;
exports.getGlobalTemp = getGlobalTemp;
exports.getTime = getTime;
exports.setTime = setTime;
exports.getPicture = getPicture;
exports.setPicture = setPicture;
exports.getWebGPU = getWebGPU;
exports.setWebGPU = setWebGPU;
exports.getCamera = getCamera;
exports.setCamera = setCamera;
exports.getPass = getPass;
exports.setPass = setPass;
exports.getRayTracingPass = getRayTracingPass;
exports.setRayTracingPass = setRayTracingPass;
exports.getAccumulationPass = getAccumulationPass;
exports.setAccumulationPass = setAccumulationPass;
exports.getImage = getImage;
exports.setImage = setImage;
/* CPContainerManager-Wonderjs Not a pure module */
