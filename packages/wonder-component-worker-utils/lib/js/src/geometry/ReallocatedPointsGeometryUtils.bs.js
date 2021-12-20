'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var TypeArrayUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/TypeArrayUtils.bs.js");

function getInfo(infoIndex, isDebug, infos) {
  return Contract$WonderCommonlib.ensureCheck([
              TypeArrayUtils$WonderCommonlib.getUint32_1(infoIndex, infos),
              TypeArrayUtils$WonderCommonlib.getUint32_1(infoIndex + 1 | 0, infos)
            ], (function (param) {
                var endIndex = param[1];
                var startIndex = param[0];
                Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("has info data", "not"), (function (param) {
                        return Contract$WonderCommonlib.assertNullableListExist({
                                    hd: startIndex,
                                    tl: {
                                      hd: endIndex,
                                      tl: /* [] */0
                                    }
                                  });
                      }));
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("endIndex >= startIndex", "is " + endIndex), (function (param) {
                              return Contract$WonderCommonlib.Operators.$great$eq(endIndex, startIndex);
                            }));
              }), isDebug);
}

function getFloat32PointData(infoIndex, points, isDebug, infos) {
  var match = getInfo(infoIndex, isDebug, infos);
  return TypeArrayUtils$WonderCommonlib.getFloat32Array(points, match[0], match[1]);
}

function getUint32PointData(infoIndex, points, isDebug, infos) {
  var match = getInfo(infoIndex, isDebug, infos);
  return TypeArrayUtils$WonderCommonlib.getUint32Array(points, match[0], match[1]);
}

exports.getInfo = getInfo;
exports.getFloat32PointData = getFloat32PointData;
exports.getUint32PointData = getUint32PointData;
/* No side effect */
