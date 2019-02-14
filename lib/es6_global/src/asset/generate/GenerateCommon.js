

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function checkShouldHasNoSlot(map) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("map has no slot", "not"), (function () {
                return Contract$WonderLog.Operators[/* = */0](MutableSparseMapService$WonderCommonlib.length(MutableSparseMapService$WonderCommonlib.getValidValues(map)), MutableSparseMapService$WonderCommonlib.length(map));
              }));
}

export {
  checkShouldHasNoSlot ,
  
}
/* Log-WonderLog Not a pure module */
