

import * as Caml_obj from "./../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";

var hexFloat_of_string = (
function(str) {
    return parseInt(str, 16);
}
);

var convertStringToInt = (
function(str) {
    return parseInt(str, 10);
}
);

function leastFloat(min, num) {
  var match = num < 0;
  if (match) {
    return 0;
  } else {
    return num;
  }
}

function bigThan(num, below) {
  var match = Caml_obj.caml_lessthan(num, below);
  if (match) {
    return below;
  } else {
    return num;
  }
}

function clamp(num, below, up) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("below <= up", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* <=. */12](below, up);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = num < below;
  if (match) {
    return below;
  } else {
    var match$1 = num > up;
    if (match$1) {
      return up;
    } else {
      return num;
    }
  }
}

export {
  hexFloat_of_string ,
  convertStringToInt ,
  leastFloat ,
  bigThan ,
  clamp ,
  
}
/* hexFloat_of_string Not a pure module */
