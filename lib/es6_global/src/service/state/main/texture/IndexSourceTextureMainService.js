

import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as IndexSourceTextureService$Wonderjs from "../../../record/all/texture/IndexSourceTextureService.js";

function getBasicSourceTextureIndexOffset() {
  return IndexSourceTextureService$Wonderjs.getBasicSourceTextureIndexOffset(/* () */0);
}

function getArrayBufferViewSourceTextureIndexOffset(state) {
  return IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]));
}

var generateBasicSourceTextureIndex = IndexSourceTextureService$Wonderjs.generateBasicSourceTextureIndex;

function generateArrayBufferViewSourceTextureIndex(arrayBufferViewSourceTextureIndex, state) {
  return IndexSourceTextureService$Wonderjs.generateArrayBufferViewSourceTextureIndex(arrayBufferViewSourceTextureIndex, BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]));
}

export {
  getBasicSourceTextureIndexOffset ,
  getArrayBufferViewSourceTextureIndexOffset ,
  generateBasicSourceTextureIndex ,
  generateArrayBufferViewSourceTextureIndex ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
