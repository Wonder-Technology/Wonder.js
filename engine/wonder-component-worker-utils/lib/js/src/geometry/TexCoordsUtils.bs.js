'use strict';

var BufferGeometryUtils$WonderComponentWorkerUtils = require("./BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils = require("./ReallocatedPointsGeometryUtils.bs.js");

function getTexCoords(texCoords, texCoordsInfos, isDebug, geometry) {
  return ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getFloat32PointData(BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry), texCoords, isDebug, texCoordsInfos);
}

exports.getTexCoords = getTexCoords;
/* No side effect */
