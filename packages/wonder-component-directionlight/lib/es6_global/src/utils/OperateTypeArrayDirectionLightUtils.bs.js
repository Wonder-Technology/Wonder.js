

import * as TypeArrayUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/TypeArrayUtils.bs.js";
import * as BufferDirectionLightUtils$WonderComponentWorkerUtils from "../../../../../../node_modules/wonder-component-worker-utils/lib/es6_global/src/directionlight/BufferDirectionLightUtils.bs.js";

function setColor(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat3(BufferDirectionLightUtils$WonderComponentWorkerUtils.getColorIndex(index), data, typeArr);
}

function setIntensity(index, data, typeArr) {
  return TypeArrayUtils$WonderCommonlib.setFloat1(BufferDirectionLightUtils$WonderComponentWorkerUtils.getIntensityIndex(index), data, typeArr);
}

export {
  setColor ,
  setIntensity ,
  
}
/* No side effect */
