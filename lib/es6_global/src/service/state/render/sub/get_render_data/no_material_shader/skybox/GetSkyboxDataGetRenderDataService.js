

import * as Matrix4Service$Wonderjs from "../../../../../../atom/Matrix4Service.js";
import * as GetCameraDataGetRenderDataSubService$Wonderjs from "../../camera/GetCameraDataGetRenderDataSubService.js";

function getSkyboxVMatrix(state) {
  return Matrix4Service$Wonderjs.setTranslation(/* tuple */[
              0,
              0,
              0
            ], Matrix4Service$Wonderjs.copy(GetCameraDataGetRenderDataSubService$Wonderjs.getCameraVMatrixData(state)));
}

function getCubemapUnit(_state) {
  return 0;
}

export {
  getSkyboxVMatrix ,
  getCubemapUnit ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
