'use strict';

var ArraySt$Wonderjs = require("../../../../../library/structure/ArraySt.bs.js");
var ComputePointsGeometryDoService$Wonderjs = require("./ComputePointsGeometryDoService.bs.js");

function compute(radius, bands) {
  var vertices = [];
  var normals = [];
  var texCoords = [];
  var indices = [];
  for(var latNumber = 0; latNumber <= bands; ++latNumber){
    var theta = latNumber * Math.PI / bands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    for(var longNumber = 0; longNumber <= bands; ++longNumber){
      var phi = longNumber * 2 * Math.PI / bands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = radius * cosPhi * sinTheta;
      var y = radius * cosTheta;
      var z = radius * sinPhi * sinTheta;
      var u = 1 - longNumber / bands;
      var v = 1 - latNumber / bands;
      ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(vertices, x), y), z);
      ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(normals, x), y), z);
      ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(texCoords, u), v);
    }
  }
  for(var latNumber$1 = 0; latNumber$1 < bands; ++latNumber$1){
    for(var longNumber$1 = 0; longNumber$1 < bands; ++longNumber$1){
      var first = Math.imul(latNumber$1, bands + 1 | 0) + longNumber$1 | 0;
      var second = (first + bands | 0) + 1 | 0;
      ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(ArraySt$Wonderjs.push(indices, first + 1 | 0), second), first), first + 1 | 0), second + 1 | 0), second);
    }
  }
  return ComputePointsGeometryDoService$Wonderjs.addTangents([
              vertices,
              texCoords,
              normals,
              indices
            ]);
}

exports.compute = compute;
/* No side effect */
