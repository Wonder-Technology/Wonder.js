

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as JudgeService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/JudgeService.js";

function disableVertexAttribArray(gl, vertexAttribHistoryArray) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("vertexAttribHistory:array(\'a) has no hole", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](vertexAttribHistoryArray.filter(JudgeService$WonderCommonlib.isBool).length, vertexAttribHistoryArray.length);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  vertexAttribHistoryArray.forEach((function (isEnable, pos) {
          if (isEnable) {
            gl.disableVertexAttribArray(pos);
            return /* () */0;
          } else {
            return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("disableVertexAttribArray", "should always be true", "", "", ""));
          }
        }));
  return ArrayService$WonderCommonlib.createEmpty(/* () */0);
}

export {
  disableVertexAttribArray ,
  
}
/* Log-WonderLog Not a pure module */
