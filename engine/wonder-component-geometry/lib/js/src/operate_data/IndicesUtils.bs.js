'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setIndices(state, geometry, data) {
  var indices = state.indices;
  var indicesInfos = state.indicesInfos;
  var indicesOffset = state.indicesOffset;
  state.indicesOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setUint32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        indicesInfos,
        indicesOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillUint32ArrayWithOffset(indices, data, param);
        }));
  return state;
}

exports.setIndices = setIndices;
/* No side effect */
