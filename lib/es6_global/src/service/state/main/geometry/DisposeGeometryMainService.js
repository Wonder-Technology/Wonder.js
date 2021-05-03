

import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GroupGeometryService$Wonderjs from "../../../record/main/geometry/GroupGeometryService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeVboBufferService$Wonderjs from "../../../record/main/vboBuffer/DisposeVboBufferService.js";
import * as GameObjectGeometryService$Wonderjs from "../../../record/main/geometry/GameObjectGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

var isAlive = DisposeComponentService$Wonderjs.isAlive;

function isAliveWithRecord(geometry, param) {
  var disposedIndexArray = param[/* disposedIndexArray */19];
  return DisposeComponentService$Wonderjs.isAlive(geometry, disposedIndexArray);
}

function _disposeData(geometry, geometryRecord) {
  var disposeCount = geometryRecord[/* disposeCount */16];
  var disposedIndexArray = geometryRecord[/* disposedIndexArray */19];
  var infoIndex = BufferGeometryService$Wonderjs.getInfoIndex(geometry);
  var newrecord = Caml_array.caml_array_dup(geometryRecord);
  newrecord[/* verticesInfos */7] = ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, 0, 0, geometryRecord[/* verticesInfos */7]);
  newrecord[/* texCoordsInfos */8] = ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, 0, 0, geometryRecord[/* texCoordsInfos */8]);
  newrecord[/* normalsInfos */9] = ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, 0, 0, geometryRecord[/* normalsInfos */9]);
  newrecord[/* indicesInfos */10] = ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, 0, 0, geometryRecord[/* indicesInfos */10]);
  newrecord[/* disposeCount */16] = disposeCount + 1 | 0;
  newrecord[/* disposedIndexArray */19] = ArrayService$Wonderjs.push(geometry, disposedIndexArray);
  newrecord[/* nameMap */20] = DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, geometryRecord[/* nameMap */20]);
  return newrecord;
}

function handleBatchDisposeComponentData(geometryDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(MutableSparseMapService$WonderCommonlib.getValidKeys(geometryDataMap), isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var match = MutableSparseMapService$WonderCommonlib.reduceiValid((function (param, gameObjectArr, geometry) {
          var geometryNeedDisposeVboBufferArr = param[0];
          var geometryRecord = GroupGeometryService$Wonderjs.batchRemoveGameObjects(gameObjectArr, geometry, param[1]);
          var match = GroupGeometryService$Wonderjs.isGroupGeometry(geometry, geometryRecord);
          if (match) {
            return /* tuple */[
                    geometryNeedDisposeVboBufferArr,
                    geometryRecord
                  ];
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(geometry, geometryNeedDisposeVboBufferArr),
                    _disposeData(geometry, geometryRecord)
                  ];
          }
        }), /* tuple */[
        /* array */[],
        geometryRecord
      ], geometryDataMap);
  var newrecord = Caml_array.caml_array_dup(state);
  return /* tuple */[
          (newrecord[/* geometryRecord */23] = match[1], newrecord),
          match[0]
        ];
}

function handleBatchDisposeComponent(geometryHasNoGameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(geometryHasNoGameObjectArray, isAliveWithRecord, RecordGeometryMainService$Wonderjs.getRecord(state));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("geometry has no gameObject", "has"), (function (param) {
                        var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
                        return Contract$WonderLog.Operators[/* = */0](geometryHasNoGameObjectArray.filter((function (geometry) {
                                          return Js_option.isSome(GameObjectGeometryService$Wonderjs.getGameObjects(geometry, geometryRecord));
                                        })).length, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometryHasNoGameObject) {
          return /* tuple */[
                  ArrayService$Wonderjs.push(geometryHasNoGameObject, param[0]),
                  _disposeData(geometryHasNoGameObject, param[1])
                ];
        }), /* tuple */[
        /* array */[],
        geometryRecord
      ], geometryHasNoGameObjectArray);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */23] = match[1];
  newrecord[/* vboBufferRecord */36] = DisposeVboBufferService$Wonderjs.disposeGeometryVboBuffer(match[0], state[/* vboBufferRecord */36]);
  return newrecord;
}

function isNotDisposed(param) {
  var disposedIndexArray = param[/* disposedIndexArray */19];
  return disposedIndexArray.length === 0;
}

export {
  isAlive ,
  isAliveWithRecord ,
  _disposeData ,
  handleBatchDisposeComponentData ,
  handleBatchDisposeComponent ,
  isNotDisposed ,
  
}
/* Log-WonderLog Not a pure module */
