

import * as OperateSettingService$Wonderjs from "./OperateSettingService.js";

function getMaxDisposeCount(record) {
  return OperateSettingService$Wonderjs.unsafeGetMemory(record)[/* maxDisposeCount */0];
}

function getMaxTypeArrayPoolSize(record) {
  return OperateSettingService$Wonderjs.unsafeGetMemory(record)[/* maxTypeArrayPoolSize */1];
}

function getMaxBigTypeArrayPoolSize(record) {
  return OperateSettingService$Wonderjs.unsafeGetMemory(record)[/* maxBigTypeArrayPoolSize */2];
}

export {
  getMaxDisposeCount ,
  getMaxTypeArrayPoolSize ,
  getMaxBigTypeArrayPoolSize ,
  
}
/* OperateSettingService-Wonderjs Not a pure module */
