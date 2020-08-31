'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../library/log/Log.bs.js");
var Contract$Wonderjs = require("../../../../library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../dependency/container/DpContainer.bs.js");

function checkNotExceedMaxCountByIndex(index, maxCount) {
  return Contract$Wonderjs.ensureCheck(index, (function (index) {
                var maxIndex = maxCount - 1 | 0;
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("index: " + index + " <= maxIndex: " + maxIndex, "not"), (function (param) {
                              return Contract$Wonderjs.Operators.$less$eq(index, maxIndex);
                            }));
              }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined));
}

exports.checkNotExceedMaxCountByIndex = checkNotExceedMaxCountByIndex;
/* No side effect */
