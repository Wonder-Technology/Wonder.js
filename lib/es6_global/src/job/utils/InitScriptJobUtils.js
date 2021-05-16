

import * as OperateLoadMainService$Wonderjs from "../../service/state/main/load/OperateLoadMainService.js";
import * as OperateScriptEventFunctionDataMainService$Wonderjs from "../../service/state/main/script/OperateScriptEventFunctionDataMainService.js";

function exec(state) {
  var match = OperateLoadMainService$Wonderjs.getCanExecScriptAllEventFunction(state);
  if (match) {
    return OperateScriptEventFunctionDataMainService$Wonderjs.execAllEventFunction(OperateScriptEventFunctionDataMainService$Wonderjs.getAllActiveInitEventFunctionData(state), state);
  } else {
    return state;
  }
}

export {
  exec ,
  
}
/* OperateScriptEventFunctionDataMainService-Wonderjs Not a pure module */
