

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferDirectionLightUtils$WonderComponentWorkerUtils from "./BufferDirectionLightUtils.bs.js";

function getColor(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat3Tuple(BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorIndex(index), typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayUtils$WonderCommonlib.getFloat1(BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensityIndex(index), typeArr);
}

export {
  getColor ,
  getIntensity ,
  
}
/* No side effect */
