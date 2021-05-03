

import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OperateScriptEventFunctionDataMainService$Wonderjs from "../../service/state/main/script/OperateScriptEventFunctionDataMainService.js";

function _createScriptEventFunction(funcInJsObj) {
  if (funcInJsObj == null) {
    return undefined;
  } else {
    return Caml_option.some(funcInJsObj);
  }
}

function createScriptEventFunctionData(jsObj) {
  return /* record */[
          /* init */Caml_option.nullable_to_opt(jsObj.init),
          /* update */Caml_option.nullable_to_opt(jsObj.update),
          /* dispose */Caml_option.nullable_to_opt(jsObj.dispose)
        ];
}

var enableScriptEventFunction = OperateScriptEventFunctionDataMainService$Wonderjs.enableScriptEventFunction;

var disableScriptEventFunction = OperateScriptEventFunctionDataMainService$Wonderjs.disableScriptEventFunction;

var isScriptEventFunctionEnable = OperateScriptEventFunctionDataMainService$Wonderjs.isScriptEventFunctionEnable;

export {
  _createScriptEventFunction ,
  createScriptEventFunctionData ,
  enableScriptEventFunction ,
  disableScriptEventFunction ,
  isScriptEventFunctionEnable ,
  
}
/* OperateScriptEventFunctionDataMainService-Wonderjs Not a pure module */
