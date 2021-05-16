

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as MaxCountLightService$Wonderjs from "../../service/record/main/light/MaxCountLightService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as BufferDirectionLightService$Wonderjs from "../../service/record/main/light/direction/BufferDirectionLightService.js";
import * as DisposeDirectionLightService$Wonderjs from "../../service/record/main/light/direction/DisposeDirectionLightService.js";
import * as OperateDirectionLightService$Wonderjs from "../../service/record/main/light/direction/OperateDirectionLightService.js";
import * as CreateDirectionLightMainService$Wonderjs from "../../service/state/main/light/direction/CreateDirectionLightMainService.js";
import * as GameObjectDirectionLightService$Wonderjs from "../../service/record/main/light/direction/GameObjectDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../../service/state/main/light/direction/RecordDirectionLightMainService.js";

function createDirectionLight(state) {
  return CreateDirectionLightMainService$Wonderjs.create(true, state);
}

function unsafeGetDirectionLightGameObject(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectDirectionLightService$Wonderjs.unsafeGetGameObject(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function getDirectionLightColor(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateDirectionLightService$Wonderjs.getColor(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function setDirectionLightColor(light, color, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = OperateDirectionLightService$Wonderjs.setColor(light, color, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getDirectionLightIntensity(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateDirectionLightService$Wonderjs.getIntensity(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function setDirectionLightIntensity(light, intensity, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = OperateDirectionLightService$Wonderjs.setIntensity(light, intensity, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getDirectionLightIsRender(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperateDirectionLightService$Wonderjs.getIsRender(light, RecordDirectionLightMainService$Wonderjs.getRecord(state));
}

function setDirectionLightIsRender(light, isRender, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposeDirectionLightService$Wonderjs.isAlive, RecordDirectionLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* directionLightRecord */21] = OperateDirectionLightService$Wonderjs.setIsRender(light, isRender, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function isMaxCount(state) {
  return MaxCountLightService$Wonderjs.isMaxCount(RecordDirectionLightMainService$Wonderjs.getRecord(state)[/* renderLightArr */4], BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  createDirectionLight ,
  unsafeGetDirectionLightGameObject ,
  getDirectionLightColor ,
  setDirectionLightColor ,
  getDirectionLightIntensity ,
  setDirectionLightIntensity ,
  getDirectionLightIsRender ,
  setDirectionLightIsRender ,
  isMaxCount ,
  
}
/* Contract-WonderLog Not a pure module */
