

import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as DeviceManagerService$Wonderjs from "../../service/record/all/device/DeviceManagerService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as RenderGeometryService$Wonderjs from "../../service/record/main/geometry/RenderGeometryService.js";
import * as CreateCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/CreateCustomGeometryMainService.js";
import * as GameObjectCustomGeometryService$Wonderjs from "../../service/record/main/geometry/custom/GameObjectCustomGeometryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/RecordCustomGeometryMainService.js";
import * as DisposeCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/DisposeCustomGeometryMainService.js";
import * as IndicesCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/IndicesCustomGeometryMainService.js";
import * as NormalsCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/NormalsCustomGeometryMainService.js";
import * as VerticesCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/VerticesCustomGeometryMainService.js";
import * as TexCoordsCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/TexCoordsCustomGeometryMainService.js";

var createCustomGeometry = CreateCustomGeometryMainService$Wonderjs.create;

function getCustomGeometryDrawMode(state) {
  return RenderGeometryService$Wonderjs.getDrawMode(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]));
}

function getCustomGeometryVertices(geometry, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return VerticesCustomGeometryMainService$Wonderjs.getVertices(geometry, state);
}

function setCustomGeometryVertices(geometry, data, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return VerticesCustomGeometryMainService$Wonderjs.setVerticesByTypeArray(geometry, data, state);
}

function getCustomGeometryTexCoords(geometry, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return TexCoordsCustomGeometryMainService$Wonderjs.getTexCoords(geometry, state);
}

function setCustomGeometryTexCoords(geometry, data, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return TexCoordsCustomGeometryMainService$Wonderjs.setTexCoordsByTypeArray(geometry, data, state);
}

function getCustomGeometryNormals(geometry, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NormalsCustomGeometryMainService$Wonderjs.getNormals(geometry, state);
}

function setCustomGeometryNormals(geometry, data, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NormalsCustomGeometryMainService$Wonderjs.setNormalsByTypeArray(geometry, data, state);
}

function getCustomGeometryIndices(geometry, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesCustomGeometryMainService$Wonderjs.getIndices(geometry, state);
}

function setCustomGeometryIndices(geometry, data, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesCustomGeometryMainService$Wonderjs.setIndicesByTypeArray(geometry, data, state);
}

function unsafeGetCustomGeometryGameObject(geometry, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeCustomGeometryMainService$Wonderjs.isAlive, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectCustomGeometryService$Wonderjs.unsafeGetGameObject(geometry, RecordCustomGeometryMainService$Wonderjs.getRecord(state));
}

export {
  createCustomGeometry ,
  getCustomGeometryDrawMode ,
  getCustomGeometryVertices ,
  setCustomGeometryVertices ,
  getCustomGeometryTexCoords ,
  setCustomGeometryTexCoords ,
  getCustomGeometryNormals ,
  setCustomGeometryNormals ,
  getCustomGeometryIndices ,
  setCustomGeometryIndices ,
  unsafeGetCustomGeometryGameObject ,
  
}
/* Contract-WonderLog Not a pure module */
