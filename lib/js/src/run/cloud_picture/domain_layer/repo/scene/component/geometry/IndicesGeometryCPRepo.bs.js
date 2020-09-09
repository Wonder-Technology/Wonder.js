'use strict';

var CPRepo$Wonderjs = require("../../../CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("./utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

function getIndices(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indices = match.indices;
  var indicesInfos = match.indicesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getUint32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), indices, indicesInfos);
}

function setIndices(index, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indices = geometryPO.indices;
  var indicesInfos = geometryPO.indicesInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setUint32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index),
                  indicesInfos,
                  geometryPO.indicesOffset,
                  data.length
                ], (function (param) {
                    return TypeArrayCPRepoUtils$Wonderjs.fillUint32ArrayWithOffset(indices, data, param);
                  })), (function (indicesOffset) {
                return CPRepo$Wonderjs.setGeometry({
                            maxIndex: geometryPO.maxIndex,
                            buffer: geometryPO.buffer,
                            vertices: geometryPO.vertices,
                            normals: geometryPO.normals,
                            indices: geometryPO.indices,
                            verticesInfos: geometryPO.verticesInfos,
                            normalsInfos: geometryPO.normalsInfos,
                            indicesInfos: geometryPO.indicesInfos,
                            verticesOffset: geometryPO.verticesOffset,
                            normalsOffset: geometryPO.normalsOffset,
                            indicesOffset: indicesOffset,
                            gameObjectsMap: geometryPO.gameObjectsMap
                          });
              }));
}

function hasIndices(index) {
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), CPRepo$Wonderjs.getExnGeometry(undefined).indicesInfos);
}

function getIndicesCount(index) {
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), CPRepo$Wonderjs.getExnGeometry(undefined).indicesInfos), (function (param) {
                return param[1] - param[0] | 0;
              }));
}

exports.getIndices = getIndices;
exports.setIndices = setIndices;
exports.hasIndices = hasIndices;
exports.getIndicesCount = getIndicesCount;
/* CPRepo-Wonderjs Not a pure module */
