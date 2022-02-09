

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as OptionSt$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function unsafeGetGameObjectData(po) {
  return OptionSt$WonderCommonlib.unsafeGet(po.gameObjectData);
}

function setGameObjectData(po, gameObjectData) {
  return {
          allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
          states: po.states,
          pluginData: po.pluginData,
          componentData: po.componentData,
          gameObjectData: gameObjectData,
          usedGameObjectData: po.usedGameObjectData
        };
}

function createAndSetState(po) {
  var match = OptionSt$WonderCommonlib.unsafeGet(po.gameObjectData);
  return {
          allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
          states: po.states,
          pluginData: po.pluginData,
          componentData: po.componentData,
          gameObjectData: po.gameObjectData,
          usedGameObjectData: {
            state: Curry._1(match.createStateFunc, undefined),
            createGameObjectFunc: match.createGameObjectFunc,
            getAllGameObjectsFunc: match.getAllGameObjectsFunc
          }
        };
}

function _unsafeGetGameObjectRelatedData(param) {
  return OptionSt$WonderCommonlib.unsafeGet(param.usedGameObjectData);
}

function _setGameObjectStateToPOState(poState, data, gameObjectState) {
  data.state = gameObjectState;
  poState.usedGameObjectData = data;
  return poState;
}

function createGameObject(po) {
  var data = _unsafeGetGameObjectRelatedData(po);
  var match = data.createGameObjectFunc(data.state);
  return [
          _setGameObjectStateToPOState(po, data, match[0]),
          match[1]
        ];
}

function getAllGameObjects(po) {
  var data = _unsafeGetGameObjectRelatedData(po);
  return data.getAllGameObjectsFunc(data.state);
}

export {
  unsafeGetGameObjectData ,
  setGameObjectData ,
  createAndSetState ,
  _unsafeGetGameObjectRelatedData ,
  _setGameObjectStateToPOState ,
  createGameObject ,
  getAllGameObjects ,
  
}
/* No side effect */
