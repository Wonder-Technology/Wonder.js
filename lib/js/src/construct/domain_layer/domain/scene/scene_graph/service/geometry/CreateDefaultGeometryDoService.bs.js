'use strict';

var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var IndicesVO$Wonderjs = require("../../value_object/IndicesVO.bs.js");
var NormalsVO$Wonderjs = require("../../value_object/NormalsVO.bs.js");
var TangentsVO$Wonderjs = require("../../value_object/TangentsVO.bs.js");
var VerticesVO$Wonderjs = require("../../value_object/VerticesVO.bs.js");
var TexCoordsVO$Wonderjs = require("../../value_object/TexCoordsVO.bs.js");
var CreateGeometryDoService$Wonderjs = require("./CreateGeometryDoService.bs.js");
var IndicesGeometryDoService$Wonderjs = require("./IndicesGeometryDoService.bs.js");
var NormalsGeometryDoService$Wonderjs = require("./NormalsGeometryDoService.bs.js");
var TangentsGeometryDoService$Wonderjs = require("./TangentsGeometryDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("./VerticesGeometryDoService.bs.js");
var TexCoordsGeometryDoService$Wonderjs = require("./TexCoordsGeometryDoService.bs.js");

function create(param) {
  var vertices = VerticesVO$Wonderjs.create(param[0]);
  var texCoords = TexCoordsVO$Wonderjs.create(param[1]);
  var normals = NormalsVO$Wonderjs.create(param[2]);
  var tangents = TangentsVO$Wonderjs.create(param[3]);
  var indices = IndicesVO$Wonderjs.create(param[4]);
  return Result$Wonderjs.bind(CreateGeometryDoService$Wonderjs.create(undefined), (function (geometry) {
                return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(VerticesGeometryDoService$Wonderjs.setVertices(geometry, vertices), (function (param) {
                                              return TexCoordsGeometryDoService$Wonderjs.setTexCoords(geometry, texCoords);
                                            })), (function (param) {
                                          return NormalsGeometryDoService$Wonderjs.setNormals(geometry, normals);
                                        })), (function (param) {
                                      return TangentsGeometryDoService$Wonderjs.setTangents(geometry, tangents);
                                    })), (function (param) {
                                  return IndicesGeometryDoService$Wonderjs.setIndices(geometry, indices);
                                })), (function (param) {
                              return geometry;
                            }));
              }));
}

exports.create = create;
/* No side effect */
