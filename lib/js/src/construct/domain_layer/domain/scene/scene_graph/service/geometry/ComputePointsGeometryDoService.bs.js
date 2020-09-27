'use strict';

var IndicesVO$Wonderjs = require("../../value_object/IndicesVO.bs.js");
var NormalsVO$Wonderjs = require("../../value_object/NormalsVO.bs.js");
var TangentsVO$Wonderjs = require("../../value_object/TangentsVO.bs.js");
var VerticesVO$Wonderjs = require("../../value_object/VerticesVO.bs.js");
var TexCoordsVO$Wonderjs = require("../../value_object/TexCoordsVO.bs.js");
var TangentsGeometryDoService$Wonderjs = require("./TangentsGeometryDoService.bs.js");

function addTangents(param) {
  var vertices = new Float32Array(param[0]);
  var texCoords = new Float32Array(param[1]);
  var normals = new Float32Array(param[2]);
  var indices = new Uint32Array(param[3]);
  return [
          vertices,
          texCoords,
          normals,
          TangentsVO$Wonderjs.value(TangentsGeometryDoService$Wonderjs.computeTangents(VerticesVO$Wonderjs.create(vertices), TexCoordsVO$Wonderjs.create(texCoords), NormalsVO$Wonderjs.create(normals), IndicesVO$Wonderjs.create(indices))),
          indices
        ];
}

exports.addTangents = addTangents;
/* No side effect */
