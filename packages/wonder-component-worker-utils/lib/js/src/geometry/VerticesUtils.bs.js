'use strict';

var BufferGeometryUtils$WonderComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getVertices(vertices, verticesInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), vertices, isDebug, verticesInfos);
}

exports.getVertices = getVertices;
/* No side effect */
