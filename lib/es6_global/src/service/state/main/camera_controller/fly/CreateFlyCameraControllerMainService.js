

import * as CreateFlyCameraControllerService$Wonderjs from "../../../../record/main/camera_controller/fly/CreateFlyCameraControllerService.js";

function create(state) {
  var match = CreateFlyCameraControllerService$Wonderjs.create(state[/* flyCameraControllerRecord */26]);
  state[/* flyCameraControllerRecord */26] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* No side effect */
