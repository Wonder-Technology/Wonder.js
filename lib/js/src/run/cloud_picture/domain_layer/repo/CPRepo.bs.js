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
exports.getPOConfig = getPOConfig;
exports.setPOConfig = setPOConfig;
exports.getGlobalTemp = getGlobalTemp;
exports.setGlobalTemp = setGlobalTemp;
exports.getTime = getTime;
exports.setTime = setTime;
/* CPContainerManager-Wonderjs Not a pure module */
