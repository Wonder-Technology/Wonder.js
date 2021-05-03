

import * as CreateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/CreateArcballCameraControllerService.js";

function create(state) {
  var match = CreateArcballCameraControllerService$Wonderjs.create(state[/* arcballCameraControllerRecord */25]);
  state[/* arcballCameraControllerRecord */25] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* No side effect */
