'use strict';

var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var IndicesVO$Wonderjs = require("../../value_object/IndicesVO.bs.js");
var NormalsVO$Wonderjs = require("../../value_object/NormalsVO.bs.js");
var VerticesVO$Wonderjs = require("../../value_object/VerticesVO.bs.js");
var CreateGeometryDoService$Wonderjs = require("./CreateGeometryDoService.bs.js");
var IndicesGeometryDoService$Wonderjs = require("./IndicesGeometryDoService.bs.js");
var NormalsGeometryDoService$Wonderjs = require("./NormalsGeometryDoService.bs.js");
var VerticesGeometryDoService$Wonderjs = require("./VerticesGeometryDoService.bs.js");

function create(param) {
  var indices = param[2];
  var normals = param[1];
  var vertices = param[0];
  return Result$Wonderjs.bind(CreateGeometryDoService$Wonderjs.create(undefined), (function (geometry) {
                return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(Result$Wonderjs.bind(VerticesGeometryDoService$Wonderjs.setVertices(geometry, VerticesVO$Wonderjs.create(new Float32Array(vertices))), (function (param) {
                                      return NormalsGeometryDoService$Wonderjs.setNormals(geometry, NormalsVO$Wonderjs.create(new Float32Array(normals)));
                                    })), (function (param) {
                                  return IndicesGeometryDoService$Wonderjs.setIndices(geometry, IndicesVO$Wonderjs.create(new Uint32Array(indices)));
                                })), (function (param) {
                              return geometry;
                            }));
              }));
}

exports.create = create;
/* No side effect */
