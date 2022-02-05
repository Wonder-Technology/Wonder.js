'use strict';

var Most = require("most");
var Result$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Result.bs.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var CreatePO$WonderEngineCore = require("../data/CreatePO.bs.js");
var Exception$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Exception.bs.js");
var POContainer$WonderEngineCore = require("../data/POContainer.bs.js");
var WorkManager$WonderEngineCore = require("./work_manager/WorkManager.bs.js");
var ComponentManager$WonderEngineCore = require("./scene_graph_manager/component/ComponentManager.bs.js");
var GameObjectManager$WonderEngineCore = require("./scene_graph_manager/GameObjectManager.bs.js");
var PluginDataManager$WonderEngineCore = require("./work_manager/plugin_data/PluginDataManager.bs.js");

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
  return POContainer$WonderEngineCore.setPO(WorkManager$WonderEngineCore.registerPlugin(POContainer$WonderEngineCore.unsafeGetPO(undefined), data, _convertJobOrders(jobOrders)));
}

function unregisterWorkPlugin(targetPluginName) {
  return POContainer$WonderEngineCore.setPO(WorkManager$WonderEngineCore.unregisterPlugin(POContainer$WonderEngineCore.unsafeGetPO(undefined), targetPluginName));
}

function prepare(param) {
  return POContainer$WonderEngineCore.setPO(CreatePO$WonderEngineCore.createPO(undefined));
}

function init(param) {
  return POContainer$WonderEngineCore.setPO(WorkManager$WonderEngineCore.init(POContainer$WonderEngineCore.unsafeGetPO(undefined)));
}

function runPipeline(pipelineName) {
  return Result$WonderCommonlib.handleFail(Result$WonderCommonlib.mapSuccess(WorkManager$WonderEngineCore.runPipeline(POContainer$WonderEngineCore.unsafeGetPO(undefined), pipelineName), (function (__x) {
                    return Most.map(POContainer$WonderEngineCore.setPO, __x);
                  })), Exception$WonderCommonlib.throwErr);
}

function getIsDebug(param) {
  return PluginDataManager$WonderEngineCore.getIsDebug(undefined);
}

var setIsDebug = PluginDataManager$WonderEngineCore.setIsDebug;

function registerComponent(data) {
  return Result$WonderCommonlib.handleFail(Result$WonderCommonlib.mapSuccess(ComponentManager$WonderEngineCore.registerComponent(POContainer$WonderEngineCore.unsafeGetPO(undefined), data), POContainer$WonderEngineCore.setPO), Exception$WonderCommonlib.throwErr);
}

function unregisterComponent(componentName) {
  return POContainer$WonderEngineCore.setPO(ComponentManager$WonderEngineCore.unregisterComponent(POContainer$WonderEngineCore.unsafeGetPO(undefined), componentName));
}

function createAndSetComponentState(componentName, config) {
  return POContainer$WonderEngineCore.setPO(ComponentManager$WonderEngineCore.createAndSetComponentState(POContainer$WonderEngineCore.unsafeGetPO(undefined), componentName, config));
}

function unsafeGetRelatedComponentData(componentName) {
  return ComponentManager$WonderEngineCore.unsafeGetUsedComponentData(POContainer$WonderEngineCore.unsafeGetPO(undefined), componentName);
}

function setRelatedComponentData(data, componentName) {
  return POContainer$WonderEngineCore.setPO(ComponentManager$WonderEngineCore.setRelatedComponentData(POContainer$WonderEngineCore.unsafeGetPO(undefined), data, componentName));
}

var createComponent = ComponentManager$WonderEngineCore.createComponent;

var setComponentData = ComponentManager$WonderEngineCore.setComponentData;

var addComponent = ComponentManager$WonderEngineCore.addComponent;

var hasComponent = ComponentManager$WonderEngineCore.hasComponent;

var getComponent = ComponentManager$WonderEngineCore.getComponent;

var getAllComponents = ComponentManager$WonderEngineCore.getAllComponents;

var getComponentData = ComponentManager$WonderEngineCore.getComponentData;

var getComponentGameObjects = ComponentManager$WonderEngineCore.getComponentGameObjects;

function setGameObjectData(data) {
  return POContainer$WonderEngineCore.setPO(GameObjectManager$WonderEngineCore.setGameObjectData(POContainer$WonderEngineCore.unsafeGetPO(undefined), data));
}

function createAndSetGameObjectState(param) {
  return POContainer$WonderEngineCore.setPO(GameObjectManager$WonderEngineCore.createAndSetState(POContainer$WonderEngineCore.unsafeGetPO(undefined)));
}

function createGameObject(param) {
  var match = GameObjectManager$WonderEngineCore.createGameObject(POContainer$WonderEngineCore.unsafeGetPO(undefined));
  POContainer$WonderEngineCore.setPO(match[0]);
  return match[1];
}

function getAllGameObjects(param) {
  return GameObjectManager$WonderEngineCore.getAllGameObjects(POContainer$WonderEngineCore.unsafeGetPO(undefined));
}

function getState(componentName) {
  return OptionSt$WonderCommonlib.toNullable(ComponentManager$WonderEngineCore.getState(POContainer$WonderEngineCore.unsafeGetPO(undefined), componentName));
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
