'use strict';

var ComputePointsGeometryService$WonderComponentCommonlib = require("./ComputePointsGeometryService.bs.js");
var CreateDefaultGeometryService$WonderComponentCommonlib = require("./CreateDefaultGeometryService.bs.js");

function create(data) {
  return CreateDefaultGeometryService$WonderComponentCommonlib.create(data, ComputePointsGeometryService$WonderComponentCommonlib.addTangents([
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
/* CreateDefaultGeometryService-WonderComponentCommonlib Not a pure module */
