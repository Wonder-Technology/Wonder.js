

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as MaxCountLightService$Wonderjs from "../../service/record/main/light/MaxCountLightService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as BufferPointLightService$Wonderjs from "../../service/record/main/light/point/BufferPointLightService.js";
import * as DisposePointLightService$Wonderjs from "../../service/record/main/light/point/DisposePointLightService.js";
import * as OperatePointLightService$Wonderjs from "../../service/record/main/light/point/OperatePointLightService.js";
import * as CreatePointLightMainService$Wonderjs from "../../service/state/main/light/point/CreatePointLightMainService.js";
import * as GameObjectPointLightService$Wonderjs from "../../service/record/main/light/point/GameObjectPointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "../../service/state/main/light/point/RecordPointLightMainService.js";

function createPointLight(state) {
  return CreatePointLightMainService$Wonderjs.create(true, state);
}

function unsafeGetPointLightGameObject(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectPointLightService$Wonderjs.unsafeGetGameObject(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function getPointLightColor(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getColor(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightColor(light, color, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setColor(light, color, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightIntensity(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getIntensity(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightIntensity(light, intensity, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setIntensity(light, intensity, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightConstant(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getConstant(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightConstant(light, constant, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setConstant(light, constant, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightLinear(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getLinear(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightLinear(light, linear, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setLinear(light, linear, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightQuadratic(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getQuadratic(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightQuadratic(light, quadratic, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setQuadratic(light, quadratic, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightRange(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getRange(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightRange(light, range, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setRange(light, range, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function setPointLightRangeLevel(light, level, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setRangeLevel(light, level, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function getPointLightIsRender(light, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return OperatePointLightService$Wonderjs.getIsRender(light, RecordPointLightMainService$Wonderjs.getRecord(state));
}

function setPointLightIsRender(light, isRender, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(light, DisposePointLightService$Wonderjs.isAlive, RecordPointLightMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* pointLightRecord */22] = OperatePointLightService$Wonderjs.setIsRender(light, isRender, RecordPointLightMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function isMaxCount(state) {
  return MaxCountLightService$Wonderjs.isMaxCount(RecordPointLightMainService$Wonderjs.getRecord(state)[/* renderLightArr */8], BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  createPointLight ,
  unsafeGetPointLightGameObject ,
  getPointLightColor ,
  setPointLightColor ,
  getPointLightIntensity ,
  setPointLightIntensity ,
  getPointLightConstant ,
  setPointLightConstant ,
  getPointLightLinear ,
  setPointLightLinear ,
  getPointLightQuadratic ,
  setPointLightQuadratic ,
  getPointLightRange ,
  setPointLightRange ,
  setPointLightRangeLevel ,
  getPointLightIsRender ,
  setPointLightIsRender ,
  isMaxCount ,
  
}
/* Contract-WonderLog Not a pure module */
