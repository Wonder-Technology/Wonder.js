

import * as BufferSettingService$Wonderjs from "../../../../../record/main/setting/BufferSettingService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";

function getMaxArrayBufferViewSourceTextureIndex(state) {
  return IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state) + BufferSettingService$Wonderjs.getArrayBufferViewSourceTextureCount(state[/* settingRecord */0]) | 0;
}

export {
  getMaxArrayBufferViewSourceTextureIndex ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
