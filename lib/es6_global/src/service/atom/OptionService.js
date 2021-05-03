

import * as Js_option from "./../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/main/state/IsDebugMainService.js";

function unsafeGet(optionData) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("data exist(get by getExn)", "not"), (function (param) {
                        return Contract$WonderLog.assertExist(optionData);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return Js_option.getExn(optionData);
}

function unsafeGetWithMessage(msg, optionData) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(msg, (function (param) {
                        return Contract$WonderLog.assertExist(optionData);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return Js_option.getExn(optionData);
}

function isJsonSerializedValueNone(value) {
  if (value === null) {
    return true;
  } else {
    return value === undefined;
  }
}

var unsafeGetJsonSerializedValue = unsafeGet;

export {
  unsafeGet ,
  unsafeGetWithMessage ,
  unsafeGetJsonSerializedValue ,
  isJsonSerializedValueNone ,
  
}
/* Log-WonderLog Not a pure module */
