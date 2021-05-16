

import * as CreateBasicCameraViewService$Wonderjs from "../../../record/main/basic_camera_view/CreateBasicCameraViewService.js";

function create(state) {
  var match = CreateBasicCameraViewService$Wonderjs.create(state[/* basicCameraViewRecord */13]);
  state[/* basicCameraViewRecord */13] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* No side effect */
