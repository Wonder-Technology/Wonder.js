

import * as OperateTypeArrayTransformUtils$WonderComponentWorkerUtils from "./OperateTypeArrayTransformUtils.bs.js";

function getLocalToWorldMatrix(localToWorldMatrices, transform) {
  return OperateTypeArrayTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
}

export {
  getLocalToWorldMatrix ,
  
}
/* No side effect */
