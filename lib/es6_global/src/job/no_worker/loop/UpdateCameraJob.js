

import * as UpdateFlyCameraControllerMainService$Wonderjs from "../../../service/state/main/camera_controller/fly/UpdateFlyCameraControllerMainService.js";
import * as UpdateArcballCameraControllerMainService$Wonderjs from "../../../service/state/main/camera_controller/arcball/UpdateArcballCameraControllerMainService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "../../../service/state/main/perspective_camera_projection/UpdatePerspectiveCameraProjectionMainService.js";

function execJob(param, state) {
  return UpdateFlyCameraControllerMainService$Wonderjs.update(UpdateArcballCameraControllerMainService$Wonderjs.update(UpdatePerspectiveCameraProjectionMainService$Wonderjs.update(state)));
}

export {
  execJob ,
  
}
/* UpdateFlyCameraControllerMainService-Wonderjs Not a pure module */
