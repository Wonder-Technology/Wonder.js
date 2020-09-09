'use strict';

var CPRepo$Wonderjs = require("../../../CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("./utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

function getVertices(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var vertices = match.vertices;
  var verticesInfos = match.verticesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getFloat32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), vertices, verticesInfos);
}

function setVertices(index, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var vertices = geometryPO.vertices;
  var verticesInfos = geometryPO.verticesInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setFloat32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index),
                  verticesInfos,
                  geometryPO.verticesOffset,
                  data.length
                ], (function (param) {
                    return TypeArrayCPRepoUtils$Wonderjs.fillFloat32ArrayWithOffset(vertices, data, param);
                  })), (function (verticesOffset) {
                return CPRepo$Wonderjs.setGeometry({
                            maxIndex: geometryPO.maxIndex,
                            buffer: geometryPO.buffer,
                            vertices: geometryPO.vertices,
                            normals: geometryPO.normals,
                            indices: geometryPO.indices,
                            verticesInfos: geometryPO.verticesInfos,
                            normalsInfos: geometryPO.normalsInfos,
                            indicesInfos: geometryPO.indicesInfos,
                            verticesOffset: verticesOffset,
                            normalsOffset: geometryPO.normalsOffset,
                            indicesOffset: geometryPO.indicesOffset,
                            gameObjectsMap: geometryPO.gameObjectsMap
                          });
              }));
}

function hasVertices(index) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var verticesInfos = match.verticesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(index), verticesInfos);
}

exports.getVertices = getVertices;
exports.setVertices = setVertices;
exports.hasVertices = hasVertices;
/* CPRepo-Wonderjs Not a pure module */
