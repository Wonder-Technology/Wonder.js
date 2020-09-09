'use strict';

var CreateDefaultGeometryDoService$Wonderjs = require("./CreateDefaultGeometryDoService.bs.js");
var ComputeSpherePointsGeometryDoService$Wonderjs = require("./ComputeSpherePointsGeometryDoService.bs.js");

function create(radius, bands) {
  return CreateDefaultGeometryDoService$Wonderjs.create(ComputeSpherePointsGeometryDoService$Wonderjs.compute(radius, bands));
}

exports.create = create;
/* No side effect */
