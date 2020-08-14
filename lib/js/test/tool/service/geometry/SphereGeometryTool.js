'use strict';

var GeometryAPI$Wonderjs = require("../../../../src/api/geometry/GeometryAPI.js");
var ComputeSpherePointsGeometryService$Wonderjs = require("../../../../src/service/record/main/geometry/ComputeSpherePointsGeometryService.js");

function createSphereGeometry(state) {
  var match = GeometryAPI$Wonderjs.createSphereGeometry(1.0, 2, state);
  var geometry = match[1];
  var name = "sphereGeometry";
  var state$1 = GeometryAPI$Wonderjs.setGeometryName(geometry, name, match[0]);
  var match$1 = ComputeSpherePointsGeometryService$Wonderjs.compute(1.0, 2);
  return /* tuple */[
          state$1,
          geometry,
          name,
          /* tuple */[
            new Float32Array(match$1[0]),
            new Float32Array(match$1[1]),
            new Float32Array(match$1[2]),
            new Uint16Array(match$1[3])
          ]
        ];
}

exports.createSphereGeometry = createSphereGeometry;
/* GeometryAPI-Wonderjs Not a pure module */
