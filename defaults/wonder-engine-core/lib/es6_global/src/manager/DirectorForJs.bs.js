

import * as Most from "most";
import * as Result$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as CreatePO$WonderEngineCore from "../data/CreatePO.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as POContainer$WonderEngineCore from "../data/POContainer.bs.js";
import * as WorkManager$WonderEngineCore from "./work_manager/WorkManager.bs.js";
import * as ComponentManager$WonderEngineCore from "./scene_graph_manager/component/ComponentManager.bs.js";
import * as GameObjectManager$WonderEngineCore from "./scene_graph_manager/GameObjectManager.bs.js";
import * as PluginDataManager$WonderEngineCore from "./work_manager/plugin_data/PluginDataManager.bs.js";

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
