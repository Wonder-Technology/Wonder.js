

import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexAllSourceTextureService$Wonderjs from "../../../../record/all/texture/source/IndexAllSourceTextureService.js";

function getBasicSourceTextureIndexOffset(param) {
  return IndexAllSourceTextureService$Wonderjs.getBasicSourceTextureIndexOffset(/* () */0);
}

function getArrayBufferViewSourceTextureIndexOffset(state) {
  return IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]));
}

var generateBasicSourceTextureIndex = IndexAllSourceTextureService$Wonderjs.generateBasicSourceTextureIndex;

function generateArrayBufferViewSourceTextureIndex(arrayBufferViewSourceTextureIndex, state) {
  return IndexAllSourceTextureService$Wonderjs.generateArrayBufferViewSourceTextureIndex(arrayBufferViewSourceTextureIndex, BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]));
}

function isBasicSourceTextureIndex(texture, state) {
  return IndexAllSourceTextureService$Wonderjs.isBasicSourceTextureIndex(texture, getArrayBufferViewSourceTextureIndexOffset(state));
}

function isArrayBufferViewSourceTextureIndex(texture, state) {
  return IndexAllSourceTextureService$Wonderjs.isArrayBufferViewSourceTextureIndex(texture, getArrayBufferViewSourceTextureIndexOffset(state));
}

export {
  getBasicSourceTextureIndexOffset ,
  getArrayBufferViewSourceTextureIndexOffset ,
  generateBasicSourceTextureIndex ,
  generateArrayBufferViewSourceTextureIndex ,
  isBasicSourceTextureIndex ,
  isArrayBufferViewSourceTextureIndex ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
