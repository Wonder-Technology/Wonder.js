'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");

var _isSupportSharedArrayBuffer = (function(param){
        return typeof SharedArrayBuffer !== "undefined"
    });

function newSharedArrayBuffer(totalByteLength) {
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("support sharedArrayBuffer", "not"), (function (param) {
                                  return Contract$Wonderjs.assertTrue(_isSupportSharedArrayBuffer(undefined));
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                return new SharedArrayBuffer(totalByteLength);
              }));
}

exports._isSupportSharedArrayBuffer = _isSupportSharedArrayBuffer;
exports.newSharedArrayBuffer = newSharedArrayBuffer;
/* No side effect */
