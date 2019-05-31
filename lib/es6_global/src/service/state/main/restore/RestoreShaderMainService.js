

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";

function restore(currentState, targetState) {
  Contract$WonderLog.requireCheck((function (param) {
          var currentPrecision = currentState[/* glslRecord */27][/* precision */0];
          var targetPrecision = targetState[/* glslRecord */27][/* precision */0];
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("currentState->glslRecord->precision and targetState->glslRecord->precision be the same", "not"), (function (param) {
                        if (currentPrecision !== undefined) {
                          if (targetPrecision !== undefined) {
                            return Contract$WonderLog.Operators[/* ==^ */2](currentPrecision, targetPrecision);
                          } else {
                            return Contract$WonderLog.assertFail(/* () */0);
                          }
                        } else if (targetPrecision !== undefined) {
                          return Contract$WonderLog.assertFail(/* () */0);
                        } else {
                          return Contract$WonderLog.assertPass(/* () */0);
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = currentState[/* shaderRecord */26];
  var currentIndex = match[/* index */0];
  var targetShaderData = targetState[/* shaderRecord */26];
  var targetIndex = targetShaderData[/* index */0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* shaderRecord */26] = /* record */[
    /* index */Math.max(currentIndex, targetIndex),
    /* noMaterialShaderIndexMap */targetShaderData[/* noMaterialShaderIndexMap */1],
    /* shaderLibShaderIndexMap */targetShaderData[/* shaderLibShaderIndexMap */2],
    /* materialsMap */targetShaderData[/* materialsMap */3]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* Log-WonderLog Not a pure module */
