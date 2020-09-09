'use strict';

var CPRepo$Wonderjs = require("../../../../../domain_layer/repo/CPRepo.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var ListMapRepoUtils$Wonderjs = require("../../utils/ListMapRepoUtils.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var IndicesGeometryCPRepo$Wonderjs = require("../../../../../domain_layer/repo/scene/component/geometry/IndicesGeometryCPRepo.bs.js");
var NormalsGeometryCPRepo$Wonderjs = require("../../../../../domain_layer/repo/scene/component/geometry/NormalsGeometryCPRepo.bs.js");
var VerticesGeometryCPRepo$Wonderjs = require("../../../../../domain_layer/repo/scene/component/geometry/VerticesGeometryCPRepo.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("../../../../../domain_layer/repo/scene/component/geometry/utils/BufferGeometryCPRepoUtils.bs.js");
var ReallocatedPointsGeometryCPRepoUtils$Wonderjs = require("../../../../../domain_layer/repo/scene/component/geometry/utils/ReallocatedPointsGeometryCPRepoUtils.bs.js");

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

var getVertices = VerticesGeometryCPRepo$Wonderjs.getVertices;

var setVertices = VerticesGeometryCPRepo$Wonderjs.setVertices;

var getNormals = NormalsGeometryCPRepo$Wonderjs.getNormals;

var setNormals = NormalsGeometryCPRepo$Wonderjs.setNormals;

var getIndices = IndicesGeometryCPRepo$Wonderjs.getIndices;

var setIndices = IndicesGeometryCPRepo$Wonderjs.setIndices;

var hasVertices = VerticesGeometryCPRepo$Wonderjs.hasVertices;

var hasNormals = NormalsGeometryCPRepo$Wonderjs.hasNormals;

var hasIndices = IndicesGeometryCPRepo$Wonderjs.hasIndices;

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
