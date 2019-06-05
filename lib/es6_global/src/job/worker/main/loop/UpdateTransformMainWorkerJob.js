

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as UpdateTransformJobUtils$Wonderjs from "../../../utils/UpdateTransformJobUtils.js";
import * as RecordTransformMainService$Wonderjs from "../../../../service/state/main/transform/RecordTransformMainService.js";

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
                var index = transformRecord[/* index */0];
                state[/* transformRecord */11] = UpdateTransformJobUtils$Wonderjs.execJob(index, state[/* globalTempRecord */35], transformRecord);
                StateDataMainService$Wonderjs.setState(stateData, state);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
