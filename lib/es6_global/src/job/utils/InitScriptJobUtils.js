

import * as OperateScriptEventFunctionDataMainService$Wonderjs from "../../service/state/main/script/OperateScriptEventFunctionDataMainService.js";

function exec(state) {
  return OperateScriptEventFunctionDataMainService$Wonderjs.execAllEventFunction(OperateScriptEventFunctionDataMainService$Wonderjs.getAllActiveInitEventFunctionData(state), state);
}

export {
  exec ,
  
}
/* OperateScriptEventFunctionDataMainService-Wonderjs Not a pure module */
