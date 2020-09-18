'use strict';

var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var ListMapRepoUtils$Wonderjs = require("../../utils/ListMapRepoUtils.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("./utils/TypeArrayCPRepoUtils.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("./utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getExnGeometry(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getExnGeometry(undefined);
  return CPRepo$Wonderjs.setGeometry({
              maxIndex: maxIndex,
              buffer: init.buffer,
              vertices: init.vertices,
              normals: init.normals,
              indices: init.indices,
              verticesInfos: init.verticesInfos,
              normalsInfos: init.normalsInfos,
              indicesInfos: init.indicesInfos,
              verticesOffset: init.verticesOffset,
              normalsOffset: init.normalsOffset,
              indicesOffset: init.indicesOffset,
              gameObjectsMap: init.gameObjectsMap
            });
}

function getGameObjects(geometry) {
  return ImmutableSparseMap$Wonderjs.getNullable(CPRepo$Wonderjs.getExnGeometry(undefined).gameObjectsMap, geometry);
}

function addGameObject(geometry, gameObject) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
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
              indicesOffset: geometryPO.indicesOffset,
              gameObjectsMap: ListMapRepoUtils$Wonderjs.addValue(geometryPO.gameObjectsMap, geometry, gameObject)
            });
}

function getVertices(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var vertices = match.vertices;
  var verticesInfos = match.verticesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getFloat32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), vertices, verticesInfos);
}

function setVertices(geometry, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var vertices = geometryPO.vertices;
  var verticesInfos = geometryPO.verticesInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setFloat32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry),
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

function getNormals(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normals = match.normals;
  var normalsInfos = match.normalsInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getFloat32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), normals, normalsInfos);
}

function setNormals(geometry, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normals = geometryPO.normals;
  var normalsInfos = geometryPO.normalsInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setFloat32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry),
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

function getIndices(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indices = match.indices;
  var indicesInfos = match.indicesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getUint32PointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), indices, indicesInfos);
}

function setIndices(geometry, data) {
  var geometryPO = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indices = geometryPO.indices;
  var indicesInfos = geometryPO.indicesInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.setUint32PointData([
                  BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry),
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

function hasVertices(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var verticesInfos = match.verticesInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), verticesInfos);
}

function hasNormals(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var normalsInfos = match.normalsInfos;
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), normalsInfos);
}

function hasIndices(geometry) {
  return ReallocatedPointsGeometryCPRepoUtils$Wonderjs.hasPointData(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), CPRepo$Wonderjs.getExnGeometry(undefined).indicesInfos);
}

function getIndicesCount(geometry) {
  var match = CPRepo$Wonderjs.getExnGeometry(undefined);
  var indicesInfos = match.indicesInfos;
  return Result$Wonderjs.mapSuccess(ReallocatedPointsGeometryCPRepoUtils$Wonderjs.getInfo(BufferGeometryCPRepoUtils$Wonderjs.getInfoIndex(geometry), indicesInfos), (function (param) {
                return param[1] - param[0] | 0;
              }));
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObjects = getGameObjects;
exports.addGameObject = addGameObject;
exports.getVertices = getVertices;
exports.setVertices = setVertices;
exports.getNormals = getNormals;
exports.setNormals = setNormals;
exports.getIndices = getIndices;
exports.setIndices = setIndices;
exports.hasVertices = hasVertices;
exports.hasNormals = hasNormals;
exports.hasIndices = hasIndices;
exports.getIndicesCount = getIndicesCount;
/* CPRepo-Wonderjs Not a pure module */
