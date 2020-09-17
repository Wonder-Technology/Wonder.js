'use strict';

var CreateGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreateGeometryDoService.bs.js");
var IndicesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/IndicesGeometryDoService.bs.js");
var NormalsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/NormalsGeometryDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/VerticesGeometryDoService.bs.js");
var GameObjectGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/GameObjectGeometryDoService.bs.js");
var CreatePlaneGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreatePlaneGeometryDoService.bs.js");
var CreateSphereGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreateSphereGeometryDoService.bs.js");

function create(param) {
  return CreateGeometryDoService$Wonderjs.create(undefined);
}

var getGameObjects = GameObjectGeometryDoService$Wonderjs.getGameObjects;

var createSphereGeometry = CreateSphereGeometryDoService$Wonderjs.create;

function createPlaneGeometry(param) {
  return CreatePlaneGeometryDoService$Wonderjs.create(undefined);
}

var getVertices = VerticesGeometryDoService$Wonderjs.getVertices;

var setVertices = VerticesGeometryDoService$Wonderjs.setVertices;

var getNormals = NormalsGeometryDoService$Wonderjs.getNormals;

var setNormals = NormalsGeometryDoService$Wonderjs.setNormals;

var getIndices = IndicesGeometryDoService$Wonderjs.getIndices;

var setIndices = IndicesGeometryDoService$Wonderjs.setIndices;

var hasVertices = VerticesGeometryDoService$Wonderjs.hasVertices;

var hasNormals = NormalsGeometryDoService$Wonderjs.hasNormals;

var hasIndices = IndicesGeometryDoService$Wonderjs.hasIndices;

var getIndicesCount = IndicesGeometryDoService$Wonderjs.getIndicesCount;

exports.create = create;
exports.getGameObjects = getGameObjects;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
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
/* No side effect */
