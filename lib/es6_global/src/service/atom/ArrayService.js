

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function deleteBySwap(index, lastIndex, arr) {
  Contract$WonderLog.requireCheck((function () {
          var len = arr.length;
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("lastIndex:" + (String(lastIndex) + (" === arr.length:" + (String(len) + ""))), "not"), (function () {
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
  return Js_primitive.nullable_to_opt(arr[0]);
}

function unsafeFindFirst(arr, targetValue, func) {
  return Contract$WonderLog.ensureCheck((function (first) {
                var arrJson = Log$WonderLog.getJsonStr(arr);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("find " + (String(targetValue) + (" in " + (String(arrJson) + ""))), "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(first);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), arr.find(func));
}

function findFirst(arr, _, func) {
  return Js_primitive.undefined_to_opt(arr.find(Curry.__1(func)));
}

function unsafeGetLast(arr) {
  return arr[arr.length - 1 | 0];
}

function getLast(arr) {
  return Js_primitive.nullable_to_opt(unsafeGetLast(arr));
}

function getNth(index, arr) {
  return Js_primitive.nullable_to_opt(arr[index]);
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
  isNotValid ,
  reduceOneParamValidi ,
  fastConcat ,
  
}
/* Log-WonderLog Not a pure module */
