'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var Log$WonderCommonlib = require("../log/Log.bs.js");
var Contract$WonderCommonlib = require("../contract/Contract.bs.js");

function bigThan(num, below) {
  if (Caml_obj.caml_lessthan(num, below)) {
    return below;
  } else {
    return num;
  }
}

function clamp(isDebug, num, below, up) {
  Contract$WonderCommonlib.requireCheck((function (param) {
          return Contract$WonderCommonlib.test(Log$WonderCommonlib.buildAssertMessage("below <= up", "not"), (function (param) {
                        return Contract$WonderCommonlib.assertLte(/* Float */1, below, up);
                      }));
        }), isDebug);
  if (num < below) {
    return below;
  } else if (num > up) {
    return up;
  } else {
    return num;
  }
}

function dividInt(a, b) {
  return a / b;
}

exports.bigThan = bigThan;
exports.clamp = clamp;
exports.dividInt = dividInt;
/* No side effect */
