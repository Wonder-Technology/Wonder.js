'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setTangents(state, geometry, data) {
  var tangents = state.tangents;
  var tangentsInfos = state.tangentsInfos;
  var tangentsOffset = state.tangentsOffset;
  state.tangentsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        tangentsInfos,
        tangentsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(tangents, data, param);
        }));
  return state;
}

exports.setTangents = setTangents;
/* No side effect */
