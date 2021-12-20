

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferTransformUtils$WonderComponentWorkerUtils from "./BufferTransformUtils.bs.js";

function getLocalToWorldMatrixTypeArray(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat16TypeArray(BufferTransformUtils$WonderComponentWorkerUtils.getLocalToWorldMatrixIndex(index), typeArr);
}

export {
  getLocalToWorldMatrixTypeArray ,
  
}
/* No side effect */
