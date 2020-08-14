

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as UpdateArcballCameraControllerMainService$Wonderjs from "../../../../service/state/main/camera_controller/arcball/UpdateArcballCameraControllerMainService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../../service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var state$1 = UpdateArcballCameraControllerMainService$Wonderjs.update(UpdatePerspectiveCameraProjectionMainService$Wonderjs.update(state));
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return undefined;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
