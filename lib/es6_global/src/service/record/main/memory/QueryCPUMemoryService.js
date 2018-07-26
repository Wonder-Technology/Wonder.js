

import * as MemorySettingService$Wonderjs from "../setting/MemorySettingService.js";

function isDisposeTooMany(disposeCount, settingRecord) {
  return disposeCount >= MemorySettingService$Wonderjs.getMaxDisposeCount(settingRecord);
}

export {
  isDisposeTooMany ,
  
}
/* MemorySettingService-Wonderjs Not a pure module */
