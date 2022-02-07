'use strict';

var BufferGeometryUtils$WonderComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getNormals(normals, normalsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), normals, isDebug, normalsInfos);
}

exports.getNormals = getNormals;
/* No side effect */
