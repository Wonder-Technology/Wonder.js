

import * as GPUDetectService$Wonderjs from "../gpu/GPUDetectService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isSupportInstance(useHardwareInstance, gpuDetectRecord) {
  if (useHardwareInstance) {
    return GPUDetectService$Wonderjs.hasExtension(gpuDetectRecord[/* extensionInstancedArrays */0]);
  } else {
    return false;
  }
}

var unsafeGetIsSourceInstance = SparseMapService$WonderCommonlib.unsafeGet;

export {
  isSupportInstance ,
  unsafeGetIsSourceInstance ,
  
}
/* GPUDetectService-Wonderjs Not a pure module */
