

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function deleteBySwap(index, lastIndex, arr) {
  Contract$WonderLog.requireCheck((function (param) {
          var len = arr.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("lastIndex:" + (String(lastIndex) + (" === arr.length:" + (String(len) + ""))), "not"), (function (param) {
                        return Contract$WonderLog.assertEqual(/* Int */0, arr.length - 1 | 0, lastIndex);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  arr[index] = arr[lastIndex];
  arr.pop();
  return /* () */0;
}

function range(a, b) {
  var result = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = a; i <= b; ++i){
    result.push(i);
  }
  return result;
}

function rangeReverse(a, b) {
  var result = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = a; i >= b; --i){
    result.push(i);
  }
  return result;
}

function join(arr) {
  var output = "";
  for(var i = 0 ,i_finish = arr.length; i <= i_finish; ++i){
    output = output + Caml_array.caml_array_get(arr, i);
  }
  return output;
}

function push(item, arr) {
  arr.push(item);
  return arr;
}

function unsafeGetFirst(arr) {
  return arr[0];
}

function getFirst(arr) {
  return Caml_option.nullable_to_opt(arr[0]);
}

function unsafeFindFirst(arr, targetValue, func) {
  return Contract$WonderLog.ensureCheck((function (first) {
                var arrJson = Log$WonderLog.getJsonStr(arr);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("find " + (String(targetValue) + (" in " + (String(arrJson) + ""))), "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(first);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), arr.find(func));
}

function findFirst(arr, targetValue, func) {
  return Caml_option.undefined_to_opt(arr.find(Curry.__1(func)));
}

function unsafeGetLast(arr) {
  return arr[arr.length - 1 | 0];
}

function getLast(arr) {
  return Caml_option.nullable_to_opt(unsafeGetLast(arr));
}

function getNth(index, arr) {
  return Caml_option.nullable_to_opt(arr[index]);
}

function removeDuplicateItems(buildKeyFunc, arr) {
  var resultArr = /* array */[];
  var map = MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    var item = arr[i];
    var key = buildKeyFunc(item);
    var match = MutableHashMapService$WonderCommonlib.get(key, map);
    if (match === undefined) {
      resultArr.push(item);
      MutableHashMapService$WonderCommonlib.set(key, item, map);
    }
    
  }
  return resultArr;
}

function hasDuplicateItems(buildKeyFunc, arr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, item) {
                  var map = param[1];
                  if (param[0]) {
                    return /* tuple */[
                            true,
                            map
                          ];
                  } else {
                    var key = buildKeyFunc(item);
                    var match = ImmutableHashMapService$WonderCommonlib.get(key, map);
                    if (match !== undefined) {
                      return /* tuple */[
                              true,
                              map
                            ];
                    } else {
                      return /* tuple */[
                              false,
                              ImmutableHashMapService$WonderCommonlib.set(key, item, map)
                            ];
                    }
                  }
                }), /* tuple */[
                false,
                ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0)
              ], arr)[0];
}

function isNotValid(value) {
  if (value === null) {
    return true;
  } else {
    return value === undefined;
  }
}

function reduceOneParamValidi(func, param, arr) {
  var mutableParam = param;
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    var value = arr[i];
    if (!isNotValid(value)) {
      mutableParam = func(mutableParam, arr[i], i);
    }
    
  }
  return mutableParam;
}

function fastConcat(arr1, arr2) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr1, value2) {
                return push(value2, arr1);
              }), arr1, arr2);
}

function _includeInSourceArr(targetItem, resultArr, _param) {
  while(true) {
    var param = _param;
    var sourceArrLength = param[2];
    var sourceArr = param[1];
    var posInSourceArr = param[0];
    var sourceItem = sourceArr[posInSourceArr];
    var match = posInSourceArr >= sourceArrLength;
    if (match) {
      return /* tuple */[
              resultArr,
              0
            ];
    } else {
      var match$1 = sourceItem !== targetItem;
      if (match$1) {
        _param = /* tuple */[
          posInSourceArr + 1 | 0,
          sourceArr,
          sourceArrLength
        ];
        continue ;
      } else {
        return /* tuple */[
                push(sourceItem, resultArr),
                posInSourceArr + 1 | 0
              ];
      }
    }
  };
}

function _excludeInSourceArr(targetItem, _resultArr, _param) {
  while(true) {
    var param = _param;
    var resultArr = _resultArr;
    var sourceArr = param[1];
    var posInSourceArr = param[0];
    var sourceItem = sourceArr[posInSourceArr];
    var match = sourceItem === targetItem;
    if (match) {
      return /* tuple */[
              resultArr,
              posInSourceArr + 1 | 0
            ];
    } else {
      _param = /* tuple */[
        posInSourceArr + 1 | 0,
        sourceArr,
        param[2]
      ];
      _resultArr = push(sourceItem, resultArr);
      continue ;
    }
  };
}

function _fastHandleRelation(param, param$1) {
  var handleInSourceArrFunc = param$1[1];
  var sourceArr = param[1];
  var targetArr = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("targetArr\'s length <= sourceArr\'s length", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <= */11](targetArr.length, sourceArr.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = targetArr.length === sourceArr.length;
  if (match) {
    Contract$WonderLog.requireCheck((function (param) {
            return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("targetArr == sourceArr", "not"), (function (param) {
                          return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(targetArr.slice().sort((function (a, b) {
                                                return a - b | 0;
                                              })), sourceArr.slice().sort((function (a, b) {
                                                return a - b | 0;
                                              }))));
                        }));
          }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
    return Curry._2(param$1[0], targetArr, sourceArr);
  } else {
    sourceArr.sort((function (a, b) {
            return a - b | 0;
          }));
    targetArr.sort((function (a, b) {
            return a - b | 0;
          }));
    var sourceArrLength = sourceArr.length;
    var match$1 = ArrayService$WonderCommonlib.reduceOneParam((function (param, targetItem) {
            return Curry._3(handleInSourceArrFunc, targetItem, param[0], /* tuple */[
                        param[1],
                        sourceArr,
                        sourceArrLength
                      ]);
          }), /* tuple */[
          /* array */[],
          0
        ], targetArr);
    return Curry._3(param$1[2], match$1[1], sourceArr, match$1[0]);
  }
}

function fastExclude(targetArr, sourceArr) {
  return _fastHandleRelation(/* tuple */[
              targetArr,
              sourceArr
            ], /* tuple */[
              (function (param, param$1) {
                  return /* array */[];
                }),
              _excludeInSourceArr,
              (function (posInSourceArr, sourceArr, resultArr) {
                  return fastConcat(resultArr, sourceArr.slice(posInSourceArr));
                })
            ]);
}

function fastIntersect(targetArr, sourceArr) {
  return _fastHandleRelation(/* tuple */[
              targetArr,
              sourceArr
            ], /* tuple */[
              (function (targetArr, param) {
                  return targetArr;
                }),
              _includeInSourceArr,
              (function (posInSourceArr, sourceArr, resultArr) {
                  return resultArr;
                })
            ]);
}

var batchRemove = fastExclude;

export {
  deleteBySwap ,
  range ,
  rangeReverse ,
  join ,
  push ,
  unsafeGetFirst ,
  getFirst ,
  unsafeFindFirst ,
  findFirst ,
  unsafeGetLast ,
  getLast ,
  getNth ,
  removeDuplicateItems ,
  hasDuplicateItems ,
  isNotValid ,
  reduceOneParamValidi ,
  fastConcat ,
  _includeInSourceArr ,
  _excludeInSourceArr ,
  _fastHandleRelation ,
  fastExclude ,
  fastIntersect ,
  batchRemove ,
  
}
/* Log-WonderLog Not a pure module */
