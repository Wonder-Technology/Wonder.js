

import * as Log$WonderCommonlib from "../log/Log.bs.js";
import * as Contract$WonderCommonlib from "../contract/Contract.bs.js";

function checkNotExceedMaxCountByIndex(isDebug, index, maxCount) {
  return Contract$WonderCommonlib.ensureCheck(index, (function (index) {
                var maxIndex = maxCount - 1 | 0;
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("index: " + index + " <= maxIndex: " + maxIndex, "not"), (function (param) {
                              return Contract$WonderCommonlib.Operators.$less$eq(index, maxIndex);
                            }));
              }), isDebug);
}

export {
  checkNotExceedMaxCountByIndex ,
  
}
/* No side effect */
