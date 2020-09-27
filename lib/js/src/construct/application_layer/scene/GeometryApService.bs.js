'use strict';

var CreateGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreateGeometryDoService.bs.js");
var IndicesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/IndicesGeometryDoService.bs.js");
var NormalsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/NormalsGeometryDoService.bs.js");
var TangentsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/TangentsGeometryDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/VerticesGeometryDoService.bs.js");
var TexCoordsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/TexCoordsGeometryDoService.bs.js");
var GameObjectGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/GameObjectGeometryDoService.bs.js");
var CreatePlaneGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreatePlaneGeometryDoService.bs.js");
var CreateSphereGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreateSphereGeometryDoService.bs.js");
var CreateTriangleGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/CreateTriangleGeometryDoService.bs.js");

function create(param) {
  return CreateGeometryDoService$Wonderjs.create(undefined);
}

var getGameObjects = GameObjectGeometryDoService$Wonderjs.getGameObjects;

function createTriangleGeometry(param) {
  return CreateTriangleGeometryDoService$Wonderjs.create(undefined);
}

var createSphereGeometry = CreateSphereGeometryDoService$Wonderjs.create;

var createPlaneGeometry = CreatePlaneGeometryDoService$Wonderjs.create;

var getVertices = VerticesGeometryDoService$Wonderjs.getVertices;

var setVertices = VerticesGeometryDoService$Wonderjs.setVertices;

var getTexCoords = TexCoordsGeometryDoService$Wonderjs.getTexCoords;

var setTexCoords = TexCoordsGeometryDoService$Wonderjs.setTexCoords;

var getNormals = NormalsGeometryDoService$Wonderjs.getNormals;

var setNormals = NormalsGeometryDoService$Wonderjs.setNormals;

var getTangents = TangentsGeometryDoService$Wonderjs.getTangents;

var setTangents = TangentsGeometryDoService$Wonderjs.setTangents;

var getIndices = IndicesGeometryDoService$Wonderjs.getIndices;

var setIndices = IndicesGeometryDoService$Wonderjs.setIndices;

var hasVertices = VerticesGeometryDoService$Wonderjs.hasVertices;

var hasNormals = NormalsGeometryDoService$Wonderjs.hasNormals;

var hasTangents = TangentsGeometryDoService$Wonderjs.hasTangents;

var hasIndices = IndicesGeometryDoService$Wonderjs.hasIndices;

var getIndicesCount = IndicesGeometryDoService$Wonderjs.getIndicesCount;

var computeTangents = TangentsGeometryDoService$Wonderjs.computeTangents;

exports.create = create;
exports.getGameObjects = getGameObjects;
exports.createTriangleGeometry = createTriangleGeometry;
exports.createSphereGeometry = createSphereGeometry;
exports.createPlaneGeometry = createPlaneGeometry;
exports.getVertices = getVertices;
exports.setVertices = setVertices;
exports.getTexCoords = getTexCoords;
exports.setTexCoords = setTexCoords;
exports.getNormals = getNormals;
exports.setNormals = setNormals;
exports.getTangents = getTangents;
exports.setTangents = setTangents;
exports.getIndices = getIndices;
exports.setIndices = setIndices;
exports.hasVertices = hasVertices;
exports.hasNormals = hasNormals;
exports.hasTangents = hasTangents;
exports.hasIndices = hasIndices;
exports.getIndicesCount = getIndicesCount;
exports.computeTangents = computeTangents;
/* No side effect */
