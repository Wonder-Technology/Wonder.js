

import * as MemorySettingService$Wonderjs from "../setting/MemorySettingService.js";

function isDisposeTooMany(disposeCount, settingRecord) {
  return disposeCount >= MemorySettingService$Wonderjs.getMaxDisposeCount(settingRecord);
}

function isGeometryBufferNearlyFull(percent, param) {
  var verticesOffset = param[/* verticesOffset */11];
  var totalVerticesLength = param[/* vertices */2].length;
  return verticesOffset / totalVerticesLength >= percent;
}

export {
  isDisposeTooMany ,
  isGeometryBufferNearlyFull ,
  
}
/* MemorySettingService-Wonderjs Not a pure module */
