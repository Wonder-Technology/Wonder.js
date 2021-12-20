'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setNormals(state, geometry, data) {
  var normals = state.normals;
  var normalsInfos = state.normalsInfos;
  var normalsOffset = state.normalsOffset;
  state.normalsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        normalsInfos,
        normalsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(normals, data, param);
        }));
  return state;
}

exports.setNormals = setNormals;
/* No side effect */
