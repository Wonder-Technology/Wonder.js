

import * as ViewService$Wonderjs from "../service/record/main/device/ViewService.js";
import * as Matrix4Service$Wonderjs from "../service/atom/Matrix4Service.js";
import * as Vector3Service$Wonderjs from "../service/atom/Vector3Service.js";

function getSceneViewSize(state) {
  var canvas = ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8]);
  return /* tuple */[
          canvas.width,
          canvas.height
        ];
}

function convertMouselocationInViewToNDC(param, param$1) {
  return /* record */[
          /* x */param[0] / param$1[0] * 2 - 1,
          /* y */1 - param[1] / param$1[1] * 2
        ];
}

function convertPosFromWorldToLocalCoordSystem(pos, mMatrix, state) {
  return Vector3Service$Wonderjs.transformMat4Tuple(pos, Matrix4Service$Wonderjs.invert(mMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)));
}

export {
  getSceneViewSize ,
  convertMouselocationInViewToNDC ,
  convertPosFromWorldToLocalCoordSystem ,
  
}
/* ViewService-Wonderjs Not a pure module */
