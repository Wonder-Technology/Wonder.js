

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

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

function getLast(arr) {
  return arr[arr.length - 1 | 0];
}

function removeDuplicateItems(buildKeyFunc, arr) {
  var resultArr = /* array */[];
  var map = HashMapService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    var item = arr[i];
    var key = buildKeyFunc(item);
    var match = HashMapService$WonderCommonlib.get(key, map);
    if (match === undefined) {
      resultArr.push(item);
      HashMapService$WonderCommonlib.set(key, item, map);
    }
    
  }
  return resultArr;
}

export {
  deleteBySwap ,
  range ,
  join ,
  push ,
  getLast ,
  removeDuplicateItems ,
  
}
/* Log-WonderLog Not a pure module */
