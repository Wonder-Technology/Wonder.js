'use strict';

var Most = require("most");
var CreatePO$WonderCore = require("../data/CreatePO.bs.js");
var POContainer$WonderCore = require("../data/POContainer.bs.js");
var Result$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Result.bs.js");
var WorkManager$WonderCore = require("./work_manager/WorkManager.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var ComponentManager$WonderCore = require("./scene_graph_manager/component/ComponentManager.bs.js");
var GameObjectManager$WonderCore = require("./scene_graph_manager/GameObjectManager.bs.js");
var PluginDataManager$WonderCore = require("./work_manager/plugin_data/PluginDataManager.bs.js");

function _convertJobOrders(jobOrders) {
  return ArraySt$WonderCommonlib.map(jobOrders, (function (jobOrder) {
                return {
                        pipelineName: jobOrder.pipelineName,
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction === "after" ? /* After */1 : /* Before */0
                      };
              }));
}

function registerWorkPlugin(data, jobOrdersOpt, param) {
  var jobOrders = jobOrdersOpt !== undefined ? jobOrdersOpt : [];
  return POContainer$WonderCore.setPO(WorkManager$WonderCore.registerPlugin(POContainer$WonderCore.unsafeGetPO(undefined), data, _convertJobOrders(jobOrders)));
}

function unregisterWorkPlugin(targetPluginName) {
  return POContainer$WonderCore.setPO(WorkManager$WonderCore.unregisterPlugin(POContainer$WonderCore.unsafeGetPO(undefined), targetPluginName));
}

function prepare(param) {
  return POContainer$WonderCore.setPO(CreatePO$WonderCore.createPO(undefined));
}

function init(param) {
  return POContainer$WonderCore.setPO(WorkManager$WonderCore.init(POContainer$WonderCore.unsafeGetPO(undefined)));
}

function runPipeline(pipelineName) {
  return Result$WonderCommonlib.handleFail(Result$WonderCommonlib.mapSuccess(WorkManager$WonderCore.runPipeline(POContainer$WonderCore.unsafeGetPO(undefined), pipelineName), (function (__x) {
                    return Most.map(POContainer$WonderCore.setPO, __x);
                  })), Exception$WonderCommonlib.throwErr);
}

function getIsDebug(param) {
  return PluginDataManager$WonderCore.getIsDebug(undefined);
}

var setIsDebug = PluginDataManager$WonderCore.setIsDebug;

function registerComponent(data) {
  return Result$WonderCommonlib.handleFail(Result$WonderCommonlib.mapSuccess(ComponentManager$WonderCore.registerComponent(POContainer$WonderCore.unsafeGetPO(undefined), data), POContainer$WonderCore.setPO), Exception$WonderCommonlib.throwErr);
}

function unregisterComponent(componentName) {
  return POContainer$WonderCore.setPO(ComponentManager$WonderCore.unregisterComponent(POContainer$WonderCore.unsafeGetPO(undefined), componentName));
}

function createAndSetComponentState(componentName, config) {
  return POContainer$WonderCore.setPO(ComponentManager$WonderCore.createAndSetComponentState(POContainer$WonderCore.unsafeGetPO(undefined), componentName, config));
}

function unsafeGetRelatedComponentData(componentName) {
  return ComponentManager$WonderCore.unsafeGetUsedComponentData(POContainer$WonderCore.unsafeGetPO(undefined), componentName);
}

function setRelatedComponentData(data, componentName) {
  return POContainer$WonderCore.setPO(ComponentManager$WonderCore.setRelatedComponentData(POContainer$WonderCore.unsafeGetPO(undefined), data, componentName));
}

var createComponent = ComponentManager$WonderCore.createComponent;

var setComponentData = ComponentManager$WonderCore.setComponentData;

var addComponent = ComponentManager$WonderCore.addComponent;

var hasComponent = ComponentManager$WonderCore.hasComponent;

var getComponent = ComponentManager$WonderCore.getComponent;

var getAllComponents = ComponentManager$WonderCore.getAllComponents;

var getComponentData = ComponentManager$WonderCore.getComponentData;

var getComponentGameObjects = ComponentManager$WonderCore.getComponentGameObjects;

function setGameObjectData(data) {
  return POContainer$WonderCore.setPO(GameObjectManager$WonderCore.setGameObjectData(POContainer$WonderCore.unsafeGetPO(undefined), data));
}

function createAndSetGameObjectState(param) {
  return POContainer$WonderCore.setPO(GameObjectManager$WonderCore.createAndSetState(POContainer$WonderCore.unsafeGetPO(undefined)));
}

function createGameObject(param) {
  var match = GameObjectManager$WonderCore.createGameObject(POContainer$WonderCore.unsafeGetPO(undefined));
  POContainer$WonderCore.setPO(match[0]);
  return match[1];
}

function getAllGameObjects(param) {
  return GameObjectManager$WonderCore.getAllGameObjects(POContainer$WonderCore.unsafeGetPO(undefined));
}

function getState(componentName) {
  return OptionSt$WonderCommonlib.toNullable(ComponentManager$WonderCore.getState(POContainer$WonderCore.unsafeGetPO(undefined), componentName));
}

exports._convertJobOrders = _convertJobOrders;
exports.registerWorkPlugin = registerWorkPlugin;
exports.unregisterWorkPlugin = unregisterWorkPlugin;
exports.prepare = prepare;
exports.init = init;
exports.runPipeline = runPipeline;
exports.getIsDebug = getIsDebug;
exports.setIsDebug = setIsDebug;
exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.createAndSetComponentState = createAndSetComponentState;
exports.unsafeGetRelatedComponentData = unsafeGetRelatedComponentData;
exports.setRelatedComponentData = setRelatedComponentData;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.setGameObjectData = setGameObjectData;
exports.createAndSetGameObjectState = createAndSetGameObjectState;
exports.createGameObject = createGameObject;
exports.getAllGameObjects = getAllGameObjects;
exports.getState = getState;
/* most Not a pure module */
