

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";

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

export {
  getInfo ,
  getFloat32PointData ,
  getUint32PointData ,
  
}
/* No side effect */
