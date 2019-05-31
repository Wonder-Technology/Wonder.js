

import * as Matrix4Service$Wonderjs from "../../../atom/Matrix4Service.js";
import * as PMatrixService$Wonderjs from "../../../primitive/PMatrixService.js";
import * as Vector4Service$Wonderjs from "../../../atom/Vector4Service.js";
import * as ViewMatrixBasicCameraViewMainService$Wonderjs from "../basic_camera_view/ViewMatrixBasicCameraViewMainService.js";

function convertWorldToScreen(cameraView, cameraProjection, param, state) {
  var normalizedDeviceCoordinate = Vector4Service$Wonderjs.transformMat4Tuple(/* tuple */[
        param[0],
        param[1],
        param[2],
        1
      ], Matrix4Service$Wonderjs.multiply(PMatrixService$Wonderjs.unsafeGetPMatrix(cameraProjection, state[/* perspectiveCameraProjectionRecord */14][/* pMatrixMap */2]), ViewMatrixBasicCameraViewMainService$Wonderjs.getBasicCameraViewWorldToCameraMatrix(cameraView, state), Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0)));
  var w = normalizedDeviceCoordinate[3];
  var match = w < 0;
  if (match) {
    return undefined;
  } else {
    var ndcSpacePos_000 = normalizedDeviceCoordinate[0] / w;
    var ndcSpacePos_001 = normalizedDeviceCoordinate[1] / w;
    var ndcSpacePos_002 = normalizedDeviceCoordinate[2] / w;
    return /* tuple */[
            Math.round((ndcSpacePos_000 + 1) / 2 * param[3]),
            Math.round((1 - ndcSpacePos_001) / 2 * param[4])
          ];
  }
}

export {
  convertWorldToScreen ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
