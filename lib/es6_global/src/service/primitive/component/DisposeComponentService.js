

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function isAlive(component, disposedIndexArray) {
  return !disposedIndexArray.includes(component);
}

function checkComponentShouldAlive(component, isAliveFunc, record) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("dispose the alive component", "not"), (function (param) {
                return Contract$WonderLog.assertTrue(Curry._2(isAliveFunc, component, record));
              }));
}

function checkComponentShouldAliveWithBatchDispose(componentArr, isAliveFunc, record) {
  return ArrayService$WonderCommonlib.forEach((function (component) {
                return checkComponentShouldAlive(component, isAliveFunc, record);
              }), componentArr);
}

var disposeSparseMapData = MutableSparseMapService$WonderCommonlib.deleteVal;

function removeFromArray(target, arr) {
  var index = arr.indexOf(target);
  var match = index === -1;
  if (match) {
    return arr;
  } else {
    var lastIndex = arr.length - 1 | 0;
    ArrayService$Wonderjs.deleteBySwap(index, lastIndex, arr);
    return arr;
  }
}

function batchRemoveFromArray(map, arr) {
  var match = MutableSparseMapService$WonderCommonlib.length(map) === 0;
  if (match) {
    return arr;
  } else {
    return arr.filter((function (value) {
                  return MutableSparseMapService$WonderCommonlib.has(value, map) === false;
                }));
  }
}

export {
  isAlive ,
  checkComponentShouldAlive ,
  checkComponentShouldAliveWithBatchDispose ,
  disposeSparseMapData ,
  removeFromArray ,
  batchRemoveFromArray ,
  
}
/* Log-WonderLog Not a pure module */
