

import * as Js_null_undefined from "../../../../node_modules/bs-platform/lib/es6/js_null_undefined.js";
import * as CoordinateMainService$Wonderjs from "../service/state/main/coordinate/CoordinateMainService.js";

function convertWorldToScreen(cameraView, cameraProjection, param, state) {
  return Js_null_undefined.fromOption(CoordinateMainService$Wonderjs.convertWorldToScreen(cameraView, cameraProjection, /* tuple */[
                  param[0],
                  param[1],
                  param[2],
                  param[3],
                  param[4]
                ], state));
}

export {
  convertWorldToScreen ,
  
}
/* CoordinateMainService-Wonderjs Not a pure module */
