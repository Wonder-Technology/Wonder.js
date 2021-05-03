

import * as Caml_obj from "./../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../atom/ArrayService.js";

var filterTargetName = Caml_obj.caml_equal;

function _throwJobFlagsShouldBeDefined(param) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("throwJobFlagsShouldBeDefined", "jobFlags should be defined", "", "", ""));
}

function unsafeGetFlags(flags) {
  if (flags !== undefined) {
    return Caml_option.valFromOption(flags);
  } else {
    return _throwJobFlagsShouldBeDefined(/* () */0);
  }
}

var unsafeFindFirst = ArrayService$Wonderjs.unsafeFindFirst;

var findFirst = ArrayService$Wonderjs.findFirst;

export {
  unsafeFindFirst ,
  findFirst ,
  filterTargetName ,
  _throwJobFlagsShouldBeDefined ,
  unsafeGetFlags ,
  
}
/* Log-WonderLog Not a pure module */
