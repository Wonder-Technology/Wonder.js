

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "./ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../primitive/component/DisposeComponentService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function addValue(key, value, arrayMap) {
  var match = SparseMapService$WonderCommonlib.get(key, arrayMap);
  if (match !== undefined) {
    ArrayService$Wonderjs.push(value, match);
    return arrayMap;
  } else {
    return SparseMapService$WonderCommonlib.set(key, /* array */[value], arrayMap);
  }
}

function addValueWithoutDuplicate(key, value, arrayMap) {
  var match = SparseMapService$WonderCommonlib.get(key, arrayMap);
  if (match !== undefined) {
    var valueArr = match;
    var match$1 = valueArr.includes(value);
    if (match$1) {
      return arrayMap;
    } else {
      ArrayService$Wonderjs.push(value, valueArr);
      return arrayMap;
    }
  } else {
    return SparseMapService$WonderCommonlib.set(key, /* array */[value], arrayMap);
  }
}

function removeValue(key, value, arrayMap) {
  var match = SparseMapService$WonderCommonlib.get(key, arrayMap);
  if (match !== undefined) {
    DisposeComponentService$Wonderjs.removeFromArray(value, match);
    return arrayMap;
  } else {
    return arrayMap;
  }
}

function checkDuplicate(expectedMessage, key, _, arrayMap) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage(expectedMessage, "not"), (function () {
                var match = SparseMapService$WonderCommonlib.get(key, arrayMap);
                if (match !== undefined) {
                  var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, value) {
                          var map = param[0];
                          var match = SparseMapService$WonderCommonlib.get(value, map);
                          if (match !== undefined) {
                            return /* tuple */[
                                    map,
                                    true
                                  ];
                          } else {
                            return /* tuple */[
                                    SparseMapService$WonderCommonlib.set(value, true, map),
                                    param[1]
                                  ];
                          }
                        }), /* tuple */[
                        SparseMapService$WonderCommonlib.createEmpty(/* () */0),
                        false
                      ], match);
                  return Contract$WonderLog.assertFalse(match$1[1]);
                } else {
                  return Contract$WonderLog.assertPass(/* () */0);
                }
              }));
}

export {
  addValue ,
  addValueWithoutDuplicate ,
  removeValue ,
  checkDuplicate ,
  
}
/* Log-WonderLog Not a pure module */
