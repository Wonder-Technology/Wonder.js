'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Result$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Result.bs.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");
var PluginDataManager$WonderCore = require("../../work_manager/plugin_data/PluginDataManager.bs.js");
var ContractResult$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/ContractResult.bs.js");
var MutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var ImmutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/ImmutableHashMap.bs.js");

function registerComponent(po, data) {
  var componentData = po.componentData;
  return Result$WonderCommonlib.mapSuccess(ContractResult$WonderCommonlib.requireCheck((function (param) {
                    return ContractResult$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("not register before", "not"), (function (param) {
                                  return ContractResult$WonderCommonlib.assertFalse(ImmutableHashMap$WonderCommonlib.has(componentData.allRegisteredComponentData, data.componentName));
                                }));
                  }), PluginDataManager$WonderCore.getIsDebug(undefined)), (function (param) {
                return {
                        allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
                        states: po.states,
                        pluginData: po.pluginData,
                        componentData: {
                          allRegisteredComponentData: ImmutableHashMap$WonderCommonlib.set(componentData.allRegisteredComponentData, data.componentName, data),
                          allUsedComponentData: componentData.allUsedComponentData
                        },
                        gameObjectData: po.gameObjectData,
                        usedGameObjectData: po.usedGameObjectData
                      };
              }));
}

function unregisterComponent(po, componentName) {
  var componentData = po.componentData;
  return {
          allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
          states: po.states,
          pluginData: po.pluginData,
          componentData: {
            allRegisteredComponentData: ImmutableHashMap$WonderCommonlib.deleteVal(componentData.allRegisteredComponentData, componentName),
            allUsedComponentData: componentData.allUsedComponentData
          },
          gameObjectData: po.gameObjectData,
          usedGameObjectData: po.usedGameObjectData
        };
}

function unsafeGetUsedComponentData(param, componentName) {
  return MutableHashMap$WonderCommonlib.unsafeGet(param.componentData.allUsedComponentData, componentName);
}

function setRelatedComponentData(poState, data, componentName) {
  MutableHashMap$WonderCommonlib.set(poState.componentData.allUsedComponentData, componentName, data);
  return poState;
}

function createAndSetComponentState(po, componentName, config) {
  var match = ImmutableHashMap$WonderCommonlib.unsafeGet(po.componentData.allRegisteredComponentData, componentName);
  var init = po.componentData;
  return {
          allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
          states: po.states,
          pluginData: po.pluginData,
          componentData: {
            allRegisteredComponentData: init.allRegisteredComponentData,
            allUsedComponentData: ImmutableHashMap$WonderCommonlib.set(po.componentData.allUsedComponentData, componentName, {
                  componentName: componentName,
                  state: match.createStateFunc(config),
                  createComponentFunc: match.createComponentFunc,
                  getGameObjectsFunc: match.getGameObjectsFunc,
                  addComponentFunc: match.addComponentFunc,
                  hasComponentFunc: match.hasComponentFunc,
                  getComponentFunc: match.getComponentFunc,
                  getAllComponentsFunc: match.getAllComponentsFunc,
                  getComponentDataFunc: match.getComponentDataFunc,
                  setComponentDataFunc: match.setComponentDataFunc
                })
          },
          gameObjectData: po.gameObjectData,
          usedGameObjectData: po.usedGameObjectData
        };
}

function _setComponentStateToData(componentState, data) {
  data.state = componentState;
  return data;
}

function createComponent(data) {
  var match = data.createComponentFunc(data.state);
  return [
          (data.state = match[0], data),
          match[1]
        ];
}

function setComponentData(data, component, dataName, dataValue) {
  var componentState = data.setComponentDataFunc(data.state, component, dataName, dataValue);
  data.state = componentState;
  return data;
}

function addComponent(data, gameObject, component) {
  var componentState = data.addComponentFunc(data.state, gameObject, component);
  data.state = componentState;
  return data;
}

function hasComponent(data, gameObject) {
  return data.hasComponentFunc(data.state, gameObject);
}

function getComponent(data, gameObject) {
  return data.getComponentFunc(data.state, gameObject);
}

function getAllComponents(data) {
  return data.getAllComponentsFunc(data.state);
}

function getComponentData(data, component, dataName) {
  return data.getComponentDataFunc(data.state, component, dataName);
}

function getComponentGameObjects(data, component) {
  return data.getGameObjectsFunc(data.state, component);
}

function getState(po, componentName) {
  return OptionSt$WonderCommonlib.map(MutableHashMap$WonderCommonlib.get(po.componentData.allUsedComponentData, componentName), (function (param) {
                return param.state;
              }));
}

exports.registerComponent = registerComponent;
exports.unregisterComponent = unregisterComponent;
exports.unsafeGetUsedComponentData = unsafeGetUsedComponentData;
exports.setRelatedComponentData = setRelatedComponentData;
exports.createAndSetComponentState = createAndSetComponentState;
exports._setComponentStateToData = _setComponentStateToData;
exports.createComponent = createComponent;
exports.setComponentData = setComponentData;
exports.addComponent = addComponent;
exports.hasComponent = hasComponent;
exports.getComponent = getComponent;
exports.getAllComponents = getAllComponents;
exports.getComponentData = getComponentData;
exports.getComponentGameObjects = getComponentGameObjects;
exports.getState = getState;
/* No side effect */
