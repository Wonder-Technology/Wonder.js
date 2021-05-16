

import * as MemorySettingService$Wonderjs from "../setting/MemorySettingService.js";

function isDisposeTooMany(disposeCount, settingRecord) {
  return disposeCount >= MemorySettingService$Wonderjs.getMaxDisposeCount(settingRecord);
}

function _isGeometryPointsNearlyFull(percent, totalPointsLength, pointsOffset) {
  return pointsOffset / totalPointsLength >= percent;
}

function isGeometryBufferNearlyFull(percent, param) {
  var verticesOffset = param[/* verticesOffset */11];
  var indices16Offset = param[/* indices16Offset */14];
  var indices32Offset = param[/* indices32Offset */15];
  if (_isGeometryPointsNearlyFull(percent, param[/* vertices */2].length, verticesOffset) || _isGeometryPointsNearlyFull(percent, param[/* indices16 */5].length, indices16Offset)) {
    return true;
  } else {
    return _isGeometryPointsNearlyFull(percent, param[/* indices32 */6].length, indices32Offset);
  }
}

export {
  isDisposeTooMany ,
  _isGeometryPointsNearlyFull ,
  isGeometryBufferNearlyFull ,
  
}
/* MemorySettingService-Wonderjs Not a pure module */
