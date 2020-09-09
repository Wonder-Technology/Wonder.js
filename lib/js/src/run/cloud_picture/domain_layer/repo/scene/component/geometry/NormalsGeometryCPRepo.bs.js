'use strict';

var CPRepo$Wonderjs = require("../../../CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("./utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

function getNormals(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normals = match.normals;
  var normalsInfos = match.normalsInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getFloat32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), normals, normalsInfos);
}

function setNormals(index, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normals = geometryPO.normals;
  var normalsInfos = geometryPO.normalsInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setFloat32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index),
                  normalsInfos,
                  geometryPO.normalsOffset,
                  data.length
                ], (function (param) {
                    return TypeArrayCPRepoUtils$Wonderjs.fillFloat32ArrayWithOffset(normals, data, param);
                  })), (function (normalsOffset) {
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
                            normalsOffset: normalsOffset,
                            indicesOffset: geometryPO.indicesOffset,
                            gameObjectsMap: geometryPO.gameObjectsMap
                          });
              }));
}

function hasNormals(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normalsInfos = match.normalsInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), normalsInfos);
}

exports.getNormals = getNormals;
exports.setNormals = setNormals;
exports.hasNormals = hasNormals;
/* CPRepo-Wonderjs Not a pure module */
