

import * as Caml_obj from "../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Log$WonderCommonlib from "../log/Log.bs.js";
import * as Contract$WonderCommonlib from "../contract/Contract.bs.js";

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

export {
  bigThan ,
  clamp ,
  dividInt ,
  
}
/* No side effect */
