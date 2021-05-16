

import * as CreatePerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/CreatePerspectiveCameraProjectionService.js";

function create(state) {
  var match = CreatePerspectiveCameraProjectionService$Wonderjs.create(state[/* perspectiveCameraProjectionRecord */14]);
  state[/* perspectiveCameraProjectionRecord */14] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* CreatePerspectiveCameraProjectionService-Wonderjs Not a pure module */
