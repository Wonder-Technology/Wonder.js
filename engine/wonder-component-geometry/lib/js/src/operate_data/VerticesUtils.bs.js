'use strict';

var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setVertices(state, geometry, data) {
  var vertices = state.vertices;
  var verticesInfos = state.verticesInfos;
  var verticesOffset = state.verticesOffset;
  state.verticesOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        verticesInfos,
        verticesOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(vertices, data, param);
        }));
  return state;
}

exports.setVertices = setVertices;
/* No side effect */
