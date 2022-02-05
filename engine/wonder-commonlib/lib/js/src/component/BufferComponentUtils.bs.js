'use strict';

var Log$WonderCommonlib = require("../log/Log.bs.js");
var Contract$WonderCommonlib = require("../contract/Contract.bs.js");

function checkNotExceedMaxCountByIndex(isDebug, index, maxCount) {
  return Contract$WonderCommonlib.ensureCheck(index, (function (index) {
                var maxIndex = maxCount - 1 | 0;
                return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("index: " + index + " <= maxIndex: " + maxIndex, "not"), (function (param) {
                              return Contract$WonderCommonlib.Operators.$less$eq(index, maxIndex);
                            }));
              }), isDebug);
}

exports.checkNotExceedMaxCountByIndex = checkNotExceedMaxCountByIndex;
/* No side effect */
