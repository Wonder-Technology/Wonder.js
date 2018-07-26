

import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ReallocateCPUMemoryService$Wonderjs from "../../../primitive/memory/ReallocateCPUMemoryService.js";
import * as BufferCustomGeometryService$Wonderjs from "../../../record/main/geometry/custom/BufferCustomGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../primitive/geometry/ReallocatedPointsGeometryService.js";

function _updateInfos(infos, infoIndex, param, offset) {
  var increment = param[1] - param[0] | 0;
  return ReallocatedPointsGeometryService$Wonderjs.setInfo(infoIndex, offset, offset + increment | 0, infos);
}

function _setNewMap(oldIndex, newIndex, oldMap, newMap) {
  return SparseMapService$WonderCommonlib.set(newIndex, SparseMapService$WonderCommonlib.unsafeGet(oldIndex, oldMap), newMap);
}

function _allocateNewData(newAliveIndexArray, param) {
  var indicesInfos = param[/* indicesInfos */9];
  var normalsInfos = param[/* normalsInfos */8];
  var texCoordsInfos = param[/* texCoordsInfos */7];
  var verticesInfos = param[/* verticesInfos */6];
  var indices = param[/* indices */5];
  var normals = param[/* normals */4];
  var texCoords = param[/* texCoords */3];
  var vertices = param[/* vertices */2];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                var newIndicesOffset = param[8];
                var newNormalsOffset = param[7];
                var newTexCoordsOffset = param[6];
                var newVerticesOffset = param[5];
                var infoIndex = BufferCustomGeometryService$Wonderjs.getInfoIndex(index);
                var verticesInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, verticesInfos);
                var texCoordsInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, texCoordsInfos);
                var normalsInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, normalsInfos);
                var indicesInfo = ReallocatedPointsGeometryService$Wonderjs.getInfo(infoIndex, indicesInfos);
                return /* tuple */[
                        param[0] + 1 | 0,
                        _updateInfos(verticesInfos, infoIndex, verticesInfo, newVerticesOffset),
                        _updateInfos(texCoordsInfos, infoIndex, texCoordsInfo, newTexCoordsOffset),
                        _updateInfos(normalsInfos, infoIndex, normalsInfo, newNormalsOffset),
                        _updateInfos(indicesInfos, infoIndex, indicesInfo, newIndicesOffset),
                        TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                              vertices,
                              newVerticesOffset
                            ], /* tuple */[
                              vertices,
                              verticesInfo[0]
                            ], verticesInfo[1]),
                        TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                              texCoords,
                              newTexCoordsOffset
                            ], /* tuple */[
                              texCoords,
                              texCoordsInfo[0]
                            ], texCoordsInfo[1]),
                        TypeArrayService$Wonderjs.fillFloat32ArrayWithFloat32Array(/* tuple */[
                              normals,
                              newNormalsOffset
                            ], /* tuple */[
                              normals,
                              normalsInfo[0]
                            ], normalsInfo[1]),
                        TypeArrayService$Wonderjs.fillUint16ArrayWithUint16Array(/* tuple */[
                              indices,
                              newIndicesOffset
                            ], /* tuple */[
                              indices,
                              indicesInfo[0]
                            ], indicesInfo[1]),
                        vertices,
                        texCoords,
                        normals,
                        indices
                      ];
              }), /* tuple */[
              0,
              verticesInfos,
              texCoordsInfos,
              normalsInfos,
              indicesInfos,
              0,
              0,
              0,
              0,
              vertices,
              texCoords,
              normals,
              indices
            ], newAliveIndexArray);
}

function _setNewDataToState(newAliveIndexArray, customGeometryRecord, param) {
  return /* record */[
          /* index */customGeometryRecord[/* index */0],
          /* buffer */customGeometryRecord[/* buffer */1],
          /* vertices */param[9],
          /* texCoords */param[10],
          /* normals */param[11],
          /* indices */param[12],
          /* verticesInfos */param[1],
          /* texCoordsInfos */param[2],
          /* normalsInfos */param[3],
          /* indicesInfos */param[4],
          /* verticesOffset */param[5],
          /* texCoordsOffset */param[6],
          /* normalsOffset */param[7],
          /* indicesOffset */param[8],
          /* disposeCount */customGeometryRecord[/* disposeCount */14],
          /* gameObjectMap */customGeometryRecord[/* gameObjectMap */15],
          /* groupCountMap */customGeometryRecord[/* groupCountMap */16],
          /* disposedIndexArray */customGeometryRecord[/* disposedIndexArray */17],
          /* disposedIndexMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* aliveIndexArray */newAliveIndexArray
        ];
}

function reAllocate(customGeometryRecord) {
  var disposedIndexMap = customGeometryRecord[/* disposedIndexMap */18];
  var newAliveIndexArray = customGeometryRecord[/* aliveIndexArray */19].filter((function (aliveIndex) {
          return !ReallocateCPUMemoryService$Wonderjs.isDisposed(aliveIndex, disposedIndexMap);
        }));
  return _setNewDataToState(newAliveIndexArray, customGeometryRecord, _allocateNewData(newAliveIndexArray, customGeometryRecord));
}

export {
  _updateInfos ,
  _setNewMap ,
  _allocateNewData ,
  _setNewDataToState ,
  reAllocate ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
