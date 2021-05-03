

import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function checkShouldHasNoSlot(map) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("map has no slot", "not"), (function (param) {
                return Contract$WonderLog.Operators[/* = */0](MutableSparseMapService$WonderCommonlib.length(MutableSparseMapService$WonderCommonlib.getValidValues(map)), MutableSparseMapService$WonderCommonlib.length(map));
              }));
}

function buildBufferViewData(byteOffset, byteLength) {
  return /* tuple */[
          0,
          byteOffset,
          byteLength,
          undefined
        ];
}

function buildAccessorByteOffset(param) {
  return 0;
}

export {
  checkShouldHasNoSlot ,
  buildBufferViewData ,
  buildAccessorByteOffset ,
  
}
/* Log-WonderLog Not a pure module */
