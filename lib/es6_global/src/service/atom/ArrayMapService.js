

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "./ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../primitive/component/DisposeComponentService.js";
import * as MutableSparseMapService$Wonderjs from "./MutableSparseMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addValue(key, value, arrayMap) {
  var match = MutableSparseMapService$Wonderjs.fastGet(key, arrayMap);
  if (match[0]) {
    ArrayService$Wonderjs.push(value, match[1]);
    return arrayMap;
  } else {
    return MutableSparseMapService$WonderCommonlib.set(key, /* array */[value], arrayMap);
  }
}

function addValueWithoutDuplicate(key, value, arrayMap) {
  var match = MutableSparseMapService$Wonderjs.fastGet(key, arrayMap);
  var valueArr = match[1];
  if (match[0]) {
    var match$1 = valueArr.includes(value);
    if (match$1) {
      return arrayMap;
    } else {
      ArrayService$Wonderjs.push(value, valueArr);
      return arrayMap;
    }
  } else {
    return MutableSparseMapService$WonderCommonlib.set(key, /* array */[value], arrayMap);
  }
}

function removeValue(key, value, arrayMap) {
  var match = MutableSparseMapService$Wonderjs.fastGet(key, arrayMap);
  if (match[0]) {
    DisposeComponentService$Wonderjs.removeFromArray(value, match[1]);
    return arrayMap;
  } else {
    return arrayMap;
  }
}

function batchRemoveValueArr(key, valueArr, arrayMap) {
  var match = MutableSparseMapService$Wonderjs.fastGet(key, arrayMap);
  if (match[0]) {
    return MutableSparseMapService$WonderCommonlib.set(key, ArrayService$Wonderjs.batchRemove(valueArr, match[1]), arrayMap);
  } else {
    return arrayMap;
  }
}

function checkDuplicate(expectedMessage, key, value, arrayMap) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage(expectedMessage, "not"), (function (param) {
                var match = MutableSparseMapService$WonderCommonlib.get(key, arrayMap);
                if (match !== undefined) {
                  var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, value) {
                          var map = param[0];
                          var match = MutableSparseMapService$WonderCommonlib.get(value, map);
                          if (match !== undefined) {
                            return /* tuple */[
                                    map,
                                    true
                                  ];
                          } else {
                            return /* tuple */[
                                    MutableSparseMapService$WonderCommonlib.set(value, true, map),
                                    param[1]
                                  ];
                          }
                        }), /* tuple */[
                        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
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
  batchRemoveValueArr ,
  checkDuplicate ,
  
}
/* Log-WonderLog Not a pure module */
