'use strict';

var GeometryApService$Wonderjs = require("../../../../application_layer/scene/GeometryApService.bs.js");

function create(param) {
  return GeometryApService$Wonderjs.create(undefined);
}

var getGameObjects = GeometryApService$Wonderjs.getGameObjects;

function createTriangleGeometry(param) {
  return GeometryApService$Wonderjs.createTriangleGeometry(undefined);
}

var createSphereGeometry = GeometryApService$Wonderjs.createSphereGeometry;

var createPlaneGeometry = GeometryApService$Wonderjs.createPlaneGeometry;

var getVertices = GeometryApService$Wonderjs.getVertices;

var setVertices = GeometryApService$Wonderjs.setVertices;

var getTexCoords = GeometryApService$Wonderjs.getTexCoords;

var setTexCoords = GeometryApService$Wonderjs.setTexCoords;

var getNormals = GeometryApService$Wonderjs.getNormals;

var setNormals = GeometryApService$Wonderjs.setNormals;

var getTangents = GeometryApService$Wonderjs.getTangents;

var setTangents = GeometryApService$Wonderjs.setTangents;

var getIndices = GeometryApService$Wonderjs.getIndices;

var setIndices = GeometryApService$Wonderjs.setIndices;

var hasVertices = GeometryApService$Wonderjs.hasVertices;

var hasNormals = GeometryApService$Wonderjs.hasNormals;

var hasTangents = GeometryApService$Wonderjs.hasTangents;

var hasIndices = GeometryApService$Wonderjs.hasIndices;

var getIndicesCount = GeometryApService$Wonderjs.getIndicesCount;

var computeTangents = GeometryApService$Wonderjs.computeTangents;

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
