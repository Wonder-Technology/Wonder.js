

import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs from "../../service/primitive/component/AliveComponentService.js";
import * as BufferGeometryService$Wonderjs from "../../service/record/main/geometry/BufferGeometryService.js";
import * as GetAllComponentService$Wonderjs from "../../service/primitive/component/GetAllComponentService.js";
import * as NameGeometryMainService$Wonderjs from "../../service/state/main/geometry/NameGeometryMainService.js";
import * as CreateGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateGeometryMainService.js";
import * as GameObjectGeometryService$Wonderjs from "../../service/record/main/geometry/GameObjectGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "../../service/state/main/geometry/RecordGeometryMainService.js";
import * as DisposeGeometryMainService$Wonderjs from "../../service/state/main/geometry/DisposeGeometryMainService.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../service/primitive/geometry/ReallocatedPointsGeometryService.js";
import * as CreateBoxGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateBoxGeometryGeometryMainService.js";
import * as CreateConeGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateConeGeometryGeometryMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";
import * as CreatePlaneGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreatePlaneGeometryGeometryMainService.js";
import * as CreateSphereGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateSphereGeometryGeometryMainService.js";
import * as CreateCylinderGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateCylinderGeometryGeometryMainService.js";

function createGeometry(state) {
  return CreateGeometryMainService$Wonderjs.create(state);
}

var createBoxGeometry = CreateBoxGeometryGeometryMainService$Wonderjs.create;

var createSphereGeometry = CreateSphereGeometryGeometryMainService$Wonderjs.create;

var createCylinderGeometry = CreateCylinderGeometryGeometryMainService$Wonderjs.create;

var createConeGeometry = CreateConeGeometryGeometryMainService$Wonderjs.create;

var createPlaneGeometry = CreatePlaneGeometryGeometryMainService$Wonderjs.create;

function getGeometryVertices(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return VerticesGeometryMainService$Wonderjs.getVertices(geometry, state);
}

function setGeometryVertices(geometry, data, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray(geometry, data, state);
}

function getGeometryTexCoords(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return TexCoordsGeometryMainService$Wonderjs.getTexCoords(geometry, state);
}

function setGeometryTexCoords(geometry, data, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray(geometry, data, state);
}

function getGeometryNormals(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NormalsGeometryMainService$Wonderjs.getNormals(geometry, state);
}

function setGeometryNormals(geometry, data, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray(geometry, data, state);
}

function getGeometryIndices16(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesGeometryMainService$Wonderjs.getIndices16(geometry, state);
}

function setGeometryIndices16(geometry, data, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, data, state);
}

function getGeometryIndices32(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesGeometryMainService$Wonderjs.getIndices32(geometry, state);
}

function setGeometryIndices32(geometry, data, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array(geometry, data, state);
}

function unsafeGetGeometryGameObjects(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GameObjectGeometryService$Wonderjs.unsafeGetGameObjects(geometry, RecordGeometryMainService$Wonderjs.getRecord(state));
}

function unsafeGetGeometryName(geometry, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameGeometryMainService$Wonderjs.unsafeGetName(geometry, state);
}

function setGeometryName(geometry, name, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(geometry, DisposeGeometryMainService$Wonderjs.isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameGeometryMainService$Wonderjs.setName(geometry, name, state);
}

function getAllGeometrys(state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = match[/* disposedIndexArray */19];
  return GetAllComponentService$Wonderjs.getAllComponents(match[/* index */0], disposedIndexArray);
}

var batchDisposeGeometry = DisposeComponentGameObjectMainService$Wonderjs.batchDisposeGeometryComponent;

var hasGeometryVertices = VerticesGeometryMainService$Wonderjs.hasVertices;

var hasGeometryNormals = NormalsGeometryMainService$Wonderjs.hasNormals;

var hasGeometryTexCoords = TexCoordsGeometryMainService$Wonderjs.hasTexCoords;

var hasGeometryIndices = IndicesGeometryMainService$Wonderjs.hasIndices;

var hasGeometryIndices16 = IndicesGeometryMainService$Wonderjs.hasIndices16;

var hasGeometryIndices32 = IndicesGeometryMainService$Wonderjs.hasIndices32;

function getGeometryIndicesCount(geometry, state) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(state);
  var match$1 = ReallocatedPointsGeometryService$Wonderjs.getInfo(BufferGeometryService$Wonderjs.getInfoIndex(geometry), match[/* indicesInfos */10]);
  return match$1[1] - match$1[0] | 0;
}

export {
  createGeometry ,
  createBoxGeometry ,
  createSphereGeometry ,
  createCylinderGeometry ,
  createConeGeometry ,
  createPlaneGeometry ,
  getGeometryVertices ,
  setGeometryVertices ,
  getGeometryTexCoords ,
  setGeometryTexCoords ,
  getGeometryNormals ,
  setGeometryNormals ,
  getGeometryIndices16 ,
  setGeometryIndices16 ,
  getGeometryIndices32 ,
  setGeometryIndices32 ,
  unsafeGetGeometryGameObjects ,
  unsafeGetGeometryName ,
  setGeometryName ,
  getAllGeometrys ,
  batchDisposeGeometry ,
  hasGeometryVertices ,
  hasGeometryNormals ,
  hasGeometryTexCoords ,
  hasGeometryIndices ,
  hasGeometryIndices16 ,
  hasGeometryIndices32 ,
  getGeometryIndicesCount ,
  
}
/* Contract-WonderLog Not a pure module */
