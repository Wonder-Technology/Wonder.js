'use strict';

var BufferGeometryUtils$WonderComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getTangents(tangents, tangentsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), tangents, isDebug, tangentsInfos);
}

exports.getTangents = getTangents;
/* No side effect */
