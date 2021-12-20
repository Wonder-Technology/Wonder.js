'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ConfigUtils$WonderComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

function setTexCoords(state, geometry, data) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("texCoords in [0.0, 1.0]", "not"), (function (param) {
                        return TypeArrayUtils$WonderCommonlib.reduceFloat32Array(data, true, (function (result, value) {
                                      if (result && Contract$WonderCommonlib.Operators.$great$eq$dot(value, 0.0)) {
                                        return Contract$WonderCommonlib.Operators.$less$eq$dot(value, 1.0);
                                      } else {
                                        return false;
                                      }
                                    }));
                      }));
        }), ConfigUtils$WonderComponentGeometry.getIsDebug(state));
  var texCoords = state.texCoords;
  var texCoordsInfos = state.texCoordsInfos;
  var texCoordsOffset = state.texCoordsOffset;
  state.texCoordsOffset = ReallocatedPointsGeometryUtils$WonderComponentGeometry.setFloat32PointData([
        BufferGeometryUtils$WonderComponentWorkerUtils.getInfoIndex(geometry),
        texCoordsInfos,
        texCoordsOffset,
        data.length
      ], ConfigUtils$WonderComponentGeometry.getIsDebug(state), (function (param) {
          return TypeArrayUtils$WonderCommonlib.fillFloat32ArrayWithOffset(texCoords, data, param);
        }));
  return state;
}

exports.setTexCoords = setTexCoords;
/* No side effect */
