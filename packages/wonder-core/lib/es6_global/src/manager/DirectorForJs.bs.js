

import * as Most from "most";
import * as CreatePO$WonderCore from "../data/CreatePO.bs.js";
import * as POContainer$WonderCore from "../data/POContainer.bs.js";
import * as Result$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as WorkManager$WonderCore from "./work_manager/WorkManager.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as ComponentManager$WonderCore from "./scene_graph_manager/component/ComponentManager.bs.js";
import * as GameObjectManager$WonderCore from "./scene_graph_manager/GameObjectManager.bs.js";
import * as PluginDataManager$WonderCore from "./work_manager/plugin_data/PluginDataManager.bs.js";

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

export {
  _convertJobOrders ,
  registerWorkPlugin ,
  unregisterWorkPlugin ,
  prepare ,
  init ,
  runPipeline ,
  getIsDebug ,
  setIsDebug ,
  registerComponent ,
  unregisterComponent ,
  createAndSetComponentState ,
  unsafeGetRelatedComponentData ,
  setRelatedComponentData ,
  createComponent ,
  setComponentData ,
  addComponent ,
  hasComponent ,
  getComponent ,
  getAllComponents ,
  getComponentData ,
  getComponentGameObjects ,
  setGameObjectData ,
  createAndSetGameObjectState ,
  createGameObject ,
  getAllGameObjects ,
  getState ,
  
}
/* most Not a pure module */
