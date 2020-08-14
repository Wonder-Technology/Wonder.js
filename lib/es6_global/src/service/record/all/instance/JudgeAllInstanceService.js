

import * as AllGPUDetectService$Wonderjs from "../gpu/AllGPUDetectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function isSupportInstance(useHardwareInstance, gpuDetectRecord) {
  if (useHardwareInstance) {
    return AllGPUDetectService$Wonderjs.hasExtension(gpuDetectRecord[/* extensionInstancedArrays */0]);
  } else {
    return false;
  }
}

var unsafeGetIsSourceInstance = MutableSparseMapService$WonderCommonlib.unsafeGet;

export {
  isSupportInstance ,
  unsafeGetIsSourceInstance ,
  
}
/* AllGPUDetectService-Wonderjs Not a pure module */
