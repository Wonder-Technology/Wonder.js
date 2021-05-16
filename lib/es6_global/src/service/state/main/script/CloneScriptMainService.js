

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CreateScriptMainService$Wonderjs from "./CreateScriptMainService.js";
import * as IsActiveScriptMainService$Wonderjs from "./IsActiveScriptMainService.js";
import * as OperateScriptDataMainService$Wonderjs from "./OperateScriptDataMainService.js";

function _getData(sourceComponent, state) {
  return /* tuple */[
          IsActiveScriptMainService$Wonderjs.getIsActive(sourceComponent, state),
          OperateScriptDataMainService$Wonderjs.getScriptAllEventFunctionData(sourceComponent, state),
          Js_option.andThen((function (allAttributes) {
                  return Caml_option.some(OperateScriptDataMainService$Wonderjs.resetScriptAllAttributesFieldValue(allAttributes));
                }), OperateScriptDataMainService$Wonderjs.getScriptAllAttributes(sourceComponent, state))
        ];
}

function _setData(targetComponent, param, state) {
  var allAttributesOpt = param[2];
  var allEventFunctionDataOpt = param[1];
  var isActiveOpt = param[0];
  var state$1 = isActiveOpt !== undefined ? IsActiveScriptMainService$Wonderjs.setIsActive(targetComponent, isActiveOpt, state) : state;
  var state$2 = allEventFunctionDataOpt !== undefined ? OperateScriptDataMainService$Wonderjs.setScriptAllEventFunctionData(targetComponent, Caml_option.valFromOption(allEventFunctionDataOpt), state$1) : state$1;
  if (allAttributesOpt !== undefined) {
    return OperateScriptDataMainService$Wonderjs.setScriptAllAttributes(targetComponent, Caml_option.valFromOption(allAttributesOpt), state$2);
  } else {
    return state$2;
  }
}

function handleCloneComponent(sourceComponent, countRangeArr, state) {
  var data = _getData(sourceComponent, state);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = CreateScriptMainService$Wonderjs.create(param[0]);
          var index = match[1];
          var state = _setData(index, data, match[0]);
          return /* tuple */[
                  state,
                  ArrayService$Wonderjs.push(index, param[1])
                ];
        }), /* tuple */[
        state,
        /* array */[]
      ], countRangeArr);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

export {
  _getData ,
  _setData ,
  handleCloneComponent ,
  
}
/* ArrayService-Wonderjs Not a pure module */
