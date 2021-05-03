

import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as GenerateCommon$Wonderjs from "./GenerateCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ConvertScriptDataUtils$Wonderjs from "../utils/ConvertScriptDataUtils.js";
import * as IsActiveScriptMainService$Wonderjs from "../../service/state/main/script/IsActiveScriptMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function build(scriptDataMap, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return GenerateCommon$Wonderjs.checkShouldHasNoSlot(scriptDataMap);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return MutableSparseMapService$WonderCommonlib.reduceValid((function (scriptDataArr, script) {
                return ArrayService$Wonderjs.push(/* record */[
                            /* isActive */IsActiveScriptMainService$Wonderjs.unsafeGetIsActive(script, state),
                            /* eventFunctionDataMapStr */ConvertScriptDataUtils$Wonderjs.unsafeGetEventFunctionDataMapStr(script, state),
                            /* attributeMapStr */ConvertScriptDataUtils$Wonderjs.unsafeGetAttributeMapStr(script, state)
                          ], scriptDataArr);
              }), /* array */[], scriptDataMap);
}

export {
  build ,
  
}
/* Contract-WonderLog Not a pure module */
