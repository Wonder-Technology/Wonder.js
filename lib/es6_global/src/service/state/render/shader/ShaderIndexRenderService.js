

import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../primitive/buffer/DefaultTypeArrayValueService.js";

function getShaderIndex(materialIndex, getShaderIndexFunc, renderState) {
  return Contract$WonderLog.ensureCheck((function (shaderIndex) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("shaderIndex should exist", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* <>= */3](shaderIndex, DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), getShaderIndexFunc(materialIndex, renderState));
}

export {
  getShaderIndex ,
  
}
/* Log-WonderLog Not a pure module */
