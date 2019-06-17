

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as DisposeScriptService$Wonderjs from "../../service/record/main/script/DisposeScriptService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as CreateScriptMainService$Wonderjs from "../../service/state/main/script/CreateScriptMainService.js";
import * as IsActiveScriptMainService$Wonderjs from "../../service/state/main/script/IsActiveScriptMainService.js";
import * as GameObjectScriptMainService$Wonderjs from "../../service/state/main/script/GameObjectScriptMainService.js";
import * as OperateScriptDataMainService$Wonderjs from "../../service/state/main/script/OperateScriptDataMainService.js";
import * as OperateScriptAttributeDataMainService$Wonderjs from "../../service/state/main/script/OperateScriptAttributeDataMainService.js";

function createScript(state) {
  return CreateScriptMainService$Wonderjs.create(state);
}

function unsafeGetScriptGameObject(script, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectScriptMainService$Wonderjs.unsafeGetGameObject(script, state[/* scriptRecord */26]);
}

function addScriptEventFunctionData(script, scriptEventFunctionDataName, scriptEventFunctionData, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.addScriptEventFunctionData(script, scriptEventFunctionDataName, scriptEventFunctionData, state);
}

function removeScriptEventFunctionData(script, scriptEventFunctionDataName, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.removeScriptEventFunctionData(script, scriptEventFunctionDataName, state);
}

function replaceScriptEventFunctionData(script, param, targetScriptEventFunctionData, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.replaceScriptEventFunctionData(script, /* tuple */[
              param[0],
              param[1]
            ], targetScriptEventFunctionData, state);
}

function unsafeGetScriptEventFunctionDataEntries(script, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.unsafeGetScriptEventFunctionDataEntries(script, state);
}

function addScriptAttribute(script, scriptAttributeName, scriptAttribute, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.addScriptAttribute(script, scriptAttributeName, scriptAttribute, state);
}

function removeScriptAttribute(script, scriptAttributeName, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.removeScriptAttribute(script, scriptAttributeName, state);
}

function replaceScriptAttribute(script, param, targetScriptAttribute, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.replaceScriptAttribute(script, /* tuple */[
              param[0],
              param[1]
            ], targetScriptAttribute, state);
}

function unsafeGetScriptAttributeEntries(script, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttributeEntries(script, state);
}

function unsafeGetScriptAttribute(script, scriptAttributeName, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttribute(script, scriptAttributeName, state);
}

function unsafeGetScriptAttributeFieldDefaultValue(script, scriptAttributeName, fieldName, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptAttributeDataMainService$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue(fieldName, OperateScriptDataMainService$Wonderjs.unsafeGetScriptAttribute(script, scriptAttributeName, state));
}

function setScriptAttributeFieldDefaultValueAndValue(script, scriptAttributeName, fieldName, value, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateScriptDataMainService$Wonderjs.setScriptAttributeFieldDefaultValueAndValue(script, /* tuple */[
              scriptAttributeName,
              fieldName,
              value
            ], state);
}

function unsafeGetScriptIsActive(script, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IsActiveScriptMainService$Wonderjs.unsafeGetIsActive(script, state);
}

function setScriptIsActive(script, isScriptActive, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(script, DisposeScriptService$Wonderjs.isAlive, state[/* scriptRecord */26]);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IsActiveScriptMainService$Wonderjs.setIsActive(script, isScriptActive, state);
}

export {
  createScript ,
  unsafeGetScriptGameObject ,
  addScriptEventFunctionData ,
  removeScriptEventFunctionData ,
  replaceScriptEventFunctionData ,
  unsafeGetScriptEventFunctionDataEntries ,
  addScriptAttribute ,
  removeScriptAttribute ,
  replaceScriptAttribute ,
  unsafeGetScriptAttributeEntries ,
  unsafeGetScriptAttribute ,
  unsafeGetScriptAttributeFieldDefaultValue ,
  setScriptAttributeFieldDefaultValueAndValue ,
  unsafeGetScriptIsActive ,
  setScriptIsActive ,
  
}
/* Contract-WonderLog Not a pure module */
