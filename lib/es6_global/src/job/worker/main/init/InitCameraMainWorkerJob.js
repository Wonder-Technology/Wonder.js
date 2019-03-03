

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as InitPerspectiveCameraProjectionMainService$Wonderjs from "../../../../service/state/main/perspective_camera_projection/InitPerspectiveCameraProjectionMainService.js";

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var state$1 = InitPerspectiveCameraProjectionMainService$Wonderjs.init(state);
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
