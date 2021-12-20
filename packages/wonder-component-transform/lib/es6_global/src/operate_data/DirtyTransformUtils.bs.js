

import * as Log$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as Contract$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/contract/Contract.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";
import * as ConfigUtils$WonderComponentTransform from "../config/ConfigUtils.bs.js";

function mark(state, transform, isDirty) {
  MutableSparseMap$WonderCommonlib.set(state.dirtyMap, transform, isDirty);
  return state;
}

function isDirty(state, transform) {
  return MutableSparseMap$WonderCommonlib.unsafeGet(state.dirtyMap, transform) === Contract$WonderCommonlib.ensureCheck(true, (function (isDirty) {
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("return bool", "not"), (function (param) {
                              return Contract$WonderCommonlib.assertIsBool(isDirty);
                            }));
              }), ConfigUtils$WonderComponentTransform.getIsDebug(state));
}

export {
  mark ,
  isDirty ,
  
}
/* No side effect */
