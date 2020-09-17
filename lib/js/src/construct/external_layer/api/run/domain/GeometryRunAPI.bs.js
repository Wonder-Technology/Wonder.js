'use strict';

var GeometryApService$Wonderjs = require("../../../../application_layer/scene/GeometryApService.bs.js");

function create(param) {
  return GeometryApService$Wonderjs.create(undefined);
}

var getGameObjects = GeometryApService$Wonderjs.getGameObjects;

var createSphereGeometry = GeometryApService$Wonderjs.createSphereGeometry;

function createPlaneGeometry(param) {
  return GeometryApService$Wonderjs.createPlaneGeometry(undefined);
}

var getVertices = GeometryApService$Wonderjs.getVertices;

var setVertices = GeometryApService$Wonderjs.setVertices;

var getNormals = GeometryApService$Wonderjs.getNormals;

var setNormals = GeometryApService$Wonderjs.setNormals;

var getIndices = GeometryApService$Wonderjs.getIndices;

var setIndices = GeometryApService$Wonderjs.setIndices;

var hasVertices = GeometryApService$Wonderjs.hasVertices;

var hasNormals = GeometryApService$Wonderjs.hasNormals;

var hasIndices = GeometryApService$Wonderjs.hasIndices;

var getIndicesCount = GeometryApService$Wonderjs.getIndicesCount;

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
