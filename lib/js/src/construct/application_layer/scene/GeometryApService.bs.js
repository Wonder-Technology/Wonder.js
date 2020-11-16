'use strict';

var IndicesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/IndicesGeometryDoService.bs.js");
var NormalsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/NormalsGeometryDoService.bs.js");
var OperateGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/OperateGeometryDoService.bs.js");
var TangentsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/TangentsGeometryDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/VerticesGeometryDoService.bs.js");
var TexCoordsGeometryDoService$Wonderjs = require("../../domain_layer/domain/scene/scene_graph/service/geometry/TexCoordsGeometryDoService.bs.js");

var getVertices = VerticesGeometryDoService$Wonderjs.getVertices;

var getTexCoords = TexCoordsGeometryDoService$Wonderjs.getTexCoords;

var getNormals = NormalsGeometryDoService$Wonderjs.getNormals;

var getTangents = TangentsGeometryDoService$Wonderjs.getTangents;

var getIndices = IndicesGeometryDoService$Wonderjs.getIndices;

var isFlipTexCoordY = OperateGeometryDoService$Wonderjs.isFlipTexCoordY;

var isSame = OperateGeometryDoService$Wonderjs.isSame;

var getId = OperateGeometryDoService$Wonderjs.getId;

exports.getVertices = getVertices;
exports.getTexCoords = getTexCoords;
exports.getNormals = getNormals;
exports.getTangents = getTangents;
exports.getIndices = getIndices;
exports.isFlipTexCoordY = isFlipTexCoordY;
exports.isSame = isSame;
exports.getId = getId;
/* No side effect */
