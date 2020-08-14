

import * as UpdateArcballCameraControllerMainService$Wonderjs from "../../../service/state/main/camera_controller/arcball/UpdateArcballCameraControllerMainService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";

function execJob(param, state) {
  return UpdateArcballCameraControllerMainService$Wonderjs.update(UpdatePerspectiveCameraProjectionMainService$Wonderjs.update(state));
}

export {
  execJob ,
  
}
/* UpdateArcballCameraControllerMainService-Wonderjs Not a pure module */
