'use strict';

var CreateDefaultGeometryDoService$Wonderjs = require("./CreateDefaultGeometryDoService.bs.js");

function create(param) {
  var vertices = [
    1.0,
    0.0,
    -1.0,
    1.0,
    0.0,
    1.0,
    -1.0,
    0.0,
    1.0,
    -1.0,
    0.0,
    -1.0
  ];
  var normals = [
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    1.0,
    0.0
  ];
  var indices = [
    2,
    1,
    0,
    0,
    3,
    2
  ];
  return CreateDefaultGeometryDoService$Wonderjs.create([
              vertices,
              normals,
              indices
            ]);
}

exports.create = create;
/* No side effect */
