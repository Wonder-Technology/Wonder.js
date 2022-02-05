'use strict';

var CreateDefaultGeometryService$WonderComponentCommonlib = require("./CreateDefaultGeometryService.bs.js");
var ComputeSpherePointsGeometryService$WonderComponentCommonlib = require("./ComputeSpherePointsGeometryService.bs.js");

function create(data, radius, bands) {
  return CreateDefaultGeometryService$WonderComponentCommonlib.create(data, ComputeSpherePointsGeometryService$WonderComponentCommonlib.compute(radius, bands));
}

exports.create = create;
/* CreateDefaultGeometryService-WonderComponentCommonlib Not a pure module */
