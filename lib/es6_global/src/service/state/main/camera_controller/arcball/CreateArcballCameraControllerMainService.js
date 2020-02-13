

import * as CreateArcballCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/arcball/CreateArcballCameraControllerService.js";

function create(state) {
  var match = CreateArcballCameraControllerService$Wonderjs.create(state[/* arcballCameraControllerRecord */24]);
  state[/* arcballCameraControllerRecord */24] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* CreateArcballCameraControllerService-Wonderjs Not a pure module */
