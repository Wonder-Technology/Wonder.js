'use strict';

var ComputePointsGeometryDoService$Wonderjs = require("./ComputePointsGeometryDoService.bs.js");
var CreateDefaultGeometryDoService$Wonderjs = require("./CreateDefaultGeometryDoService.bs.js");

function create(param) {
  return CreateDefaultGeometryDoService$Wonderjs.create(ComputePointsGeometryDoService$Wonderjs.addTangents([
                  [
                    0.0,
                    0.5,
                    0,
                    -0.5,
                    -0.5,
                    0,
                    0.5,
                    -0.5,
                    0
                  ],
                  [
                    0.5,
                    1,
                    0,
                    0,
                    1,
                    0
                  ],
                  [
                    0,
                    0,
                    1,
                    0,
                    0,
                    1,
                    0,
                    0,
                    1
                  ],
                  [
                    0,
                    1,
                    2
                  ]
                ]));
}

exports.create = create;
/* No side effect */
