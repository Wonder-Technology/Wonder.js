'use strict';

var Log$WonderCommonlib = require("wonder-commonlib/lib/js/src/log/Log.bs.js");
var Contract$WonderCommonlib = require("wonder-commonlib/lib/js/src/contract/Contract.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$WonderComponentTransform = require("../config/ConfigUtils.bs.js");

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

exports.mark = mark;
exports.isDirty = isDirty;
/* No side effect */
