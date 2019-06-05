

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";
import * as Matrix4Service$Wonderjs from "../../../../atom/Matrix4Service.js";
import * as GetCameraDataGetRenderDataSubService$Wonderjs from "../camera/GetCameraDataGetRenderDataSubService.js";

function getSkyboxVMatrix(state) {
  return Matrix4Service$Wonderjs.setTranslation(/* tuple */[
              0,
              0,
              0
            ], Matrix4Service$Wonderjs.copy(GetCameraDataGetRenderDataSubService$Wonderjs.getCameraVMatrixData(state)));
}

function unsafeGetGlCubeTexture(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* jobDataRecord */6][/* skyboxData */1][/* cubeTexture */0]);
}

export {
  getSkyboxVMatrix ,
  unsafeGetGlCubeTexture ,
  
}
/* OptionService-Wonderjs Not a pure module */
