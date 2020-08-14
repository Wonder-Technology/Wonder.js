

import * as Matrix4Service$Wonderjs from "../atom/Matrix4Service.js";

function getWorldToCameraMatrix(cameraToWorldMatrix) {
  return Matrix4Service$Wonderjs.invert(cameraToWorldMatrix, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
}

export {
  getWorldToCameraMatrix ,
  
}
/* Matrix4Service-Wonderjs Not a pure module */
