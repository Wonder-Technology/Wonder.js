'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");
var ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/geometry/ReallocatedPointsGeometryUtils.bs.js");

function setInfo(infoIndex, startIndex, endIndex, isDebug, infos) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("startIndex >= 0", "is " + startIndex), (function (param) {
                  return Contract$WonderCommonlib.Operators.$great$eq(startIndex, 0);
                }));
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                        return Contract$WonderCommonlib.Operators.$great$eq(endIndex, startIndex);
                      }));
        }), isDebug);
  TypeArrayUtils$WonderCommonlib.setUint32_1(infoIndex, startIndex, infos);
  return TypeArrayUtils$WonderCommonlib.setUint32_1(infoIndex + 1 | 0, endIndex, infos);
}

function hasPointData(infoIndex, isDebug, infos) {
  var match = ReallocatedPointsGeometryUtils$WonderComponentWorkerUtils.getInfo(infoIndex, isDebug, infos);
  return match[1] > match[0];
}

function _setPointData(param, isDebug, fillTypeArrayFunc) {
  var offset = param[2];
  var newOffset = offset + param[3] | 0;
  setInfo(param[0], offset, newOffset, isDebug, param[1]);
  Curry._1(fillTypeArrayFunc, offset);
  return newOffset;
}

var setFloat32PointData = _setPointData;

var setUint32PointData = _setPointData;

exports.setInfo = setInfo;
exports.hasPointData = hasPointData;
exports._setPointData = _setPointData;
exports.setFloat32PointData = setFloat32PointData;
exports.setUint32PointData = setUint32PointData;
/* No side effect */
