

import * as InitArcballCameraControllerMainService$Wonderjs from "../../../service/state/main/camera_controller/arcball/InitArcballCameraControllerMainService.js";
import * as InitPerspectiveCameraProjectionMainService$Wonderjs from "../../../service/state/main/perspective_camera_projection/InitPerspectiveCameraProjectionMainService.js";

function execJob(_, state) {
  return InitArcballCameraControllerMainService$Wonderjs.init(InitPerspectiveCameraProjectionMainService$Wonderjs.init(state));
}

export {
  execJob ,
  
}
/* InitArcballCameraControllerMainService-Wonderjs Not a pure module */
