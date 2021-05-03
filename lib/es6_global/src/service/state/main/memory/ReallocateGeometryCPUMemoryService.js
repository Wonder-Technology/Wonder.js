

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AliveComponentService$Wonderjs from "../../../primitive/component/AliveComponentService.js";
import * as BufferGeometryService$Wonderjs from "../../../record/main/geometry/BufferGeometryService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function _updateInfos(infos, infoIndex, param, offset) {
  var increment = param[1] - param[0] | 0;
  return ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, offset, offset + increment | 0, infos);
}

function _setNewMap(oldIndex, newIndex, oldMap, newMap) {
  return MutableSparseMapService$WonderCommonlib.set(newIndex, MutableSparseMapService$WonderCommonlib.unsafeGet(oldIndex, oldMap), newMap);
}

function _allocateNewEachData(param, index, param$1) {
  var newIndices32 = param[14];
  var newIndices16 = param[13];
  var newNormals = param[12];
  var newTexCoords = param[11];
  var newVertices = param[10];
  var newIndices32Offset = param[9];
  var newIndicesOffset = param[8];
  var newNormalsOffset = param[7];
  var newTexCoordsOffset = param[6];
  var newVerticesOffset = param[5];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("newIndicesOffset == newIndices32Offset", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](newIndicesOffset, newIndices32Offset);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var infoIndex = BufferGeometryService$Wonderjs.getInfoIndex(index);
  var verticesInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, param$1[/* verticesInfos */7]);
  var texCoordsInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, param$1[/* texCoordsInfos */8]);
  var normalsInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, param$1[/* normalsInfos */9]);
  var indicesInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, param$1[/* indicesInfos */10]);
  var indicesEndIndex = indicesInfo[1];
  var indicesStartIndex = indicesInfo[0];
  return /* tuple */[
          param[0] + 1 | 0,
          _updateInfos(param[1], infoIndex, verticesInfo, newVerticesOffset),
          _updateInfos(param[2], infoIndex, texCoordsInfo, newTexCoordsOffset),
          _updateInfos(param[3], infoIndex, normalsInfo, newNormalsOffset),
          _updateInfos(param[4], infoIndex, indicesInfo, newIndicesOffset),
          TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                newVertices,
                newVerticesOffset
              ], /* tuple */[
                param$1[/* vertices */2],
                verticesInfo[0]
              ], verticesInfo[1]),
          TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                newTexCoords,
                newTexCoordsOffset
              ], /* tuple */[
                param$1[/* texCoords */3],
                texCoordsInfo[0]
              ], texCoordsInfo[1]),
          TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                newNormals,
                newNormalsOffset
              ], /* tuple */[
                param$1[/* normals */4],
                normalsInfo[0]
              ], normalsInfo[1]),
          TypeArrayService$Wonderjs.fillUint16ArrayWithUint16Array(/* tuple */[
                newIndices16,
                newIndicesOffset
              ], /* tuple */[
                param$1[/* indices16 */5],
                indicesStartIndex
              ], indicesEndIndex),
          TypeArrayService$Wonderjs.fillUint32ArrayWithUint32Array(/* tuple */[
                newIndices32,
                newIndices32Offset
              ], /* tuple */[
                param$1[/* indices32 */6],
                indicesStartIndex
              ], indicesEndIndex),
          newVertices,
          newTexCoords,
          newNormals,
          newIndices16,
          newIndices32
        ];
}

function _allocateNewData(newAliveIndexArray, param, geometryRecord) {
  return /* tuple */[
          param[0],
          ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                  return _allocateNewEachData(/* tuple */[
                              param[0],
                              param[1],
                              param[2],
                              param[3],
                              param[4],
                              param[5],
                              param[6],
                              param[7],
                              param[8],
                              param[9],
                              param[10],
                              param[11],
                              param[12],
                              param[13],
                              param[14]
                            ], index, geometryRecord);
                }), /* tuple */[
                0,
                param[6],
                param[7],
                param[8],
                param[9],
                0,
                0,
                0,
                0,
                0,
                param[1],
                param[2],
                param[3],
                param[4],
                param[5]
              ], newAliveIndexArray)
        ];
}

function _setNewDataToState(newAliveIndexArray, geometryRecord, param) {
  var match = param[1];
  return /* record */[
          /* index */geometryRecord[/* index */0],
          /* buffer */param[0],
          /* vertices */match[10],
          /* texCoords */match[11],
          /* normals */match[12],
          /* indices16 */match[13],
          /* indices32 */match[14],
          /* verticesInfos */match[1],
          /* texCoordsInfos */match[2],
          /* normalsInfos */match[3],
          /* indicesInfos */match[4],
          /* verticesOffset */match[5],
          /* texCoordsOffset */match[6],
          /* normalsOffset */match[7],
          /* indices16Offset */match[8],
          /* indices32Offset */match[9],
          /* disposeCount */geometryRecord[/* disposeCount */16],
          /* indicesTypeMap */geometryRecord[/* indicesTypeMap */17],
          /* gameObjectsMap */geometryRecord[/* gameObjectsMap */18],
          /* disposedIndexArray */geometryRecord[/* disposedIndexArray */19],
          /* nameMap */geometryRecord[/* nameMap */20]
        ];
}

function getAllAliveGeometrys(index, param) {
  var disposedIndexArray = param[/* disposedIndexArray */19];
  return AliveComponentService$Wonderjs.getAllAliveComponents(index, disposedIndexArray);
}

function reAllocateToBuffer(newBufferData, geometryRecord) {
  var newAliveIndexArray = getAllAliveGeometrys(geometryRecord[/* index */0], geometryRecord);
  return _setNewDataToState(newAliveIndexArray, geometryRecord, _allocateNewData(newAliveIndexArray, newBufferData, geometryRecord));
}

function reAllocateToTheSameBuffer(geometryRecord) {
  return reAllocateToBuffer(/* tuple */[
              geometryRecord[/* buffer */1],
              geometryRecord[/* vertices */2],
              geometryRecord[/* texCoords */3],
              geometryRecord[/* normals */4],
              geometryRecord[/* indices16 */5],
              geometryRecord[/* indices32 */6],
              geometryRecord[/* verticesInfos */7],
              geometryRecord[/* texCoordsInfos */8],
              geometryRecord[/* normalsInfos */9],
              geometryRecord[/* indicesInfos */10]
            ], geometryRecord);
}

export {
  _updateInfos ,
  _setNewMap ,
  _allocateNewEachData ,
  _allocateNewData ,
  _setNewDataToState ,
  getAllAliveGeometrys ,
  reAllocateToBuffer ,
  reAllocateToTheSameBuffer ,
  
}
/* Log-WonderLog Not a pure module */
