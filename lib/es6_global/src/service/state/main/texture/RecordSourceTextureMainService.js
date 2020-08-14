

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as BufferSourceTextureService$Wonderjs from "../../../record/main/texture/BufferSourceTextureService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* sourceTextureRecord */17]);
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var basicSourceTextureCount = BufferSettingService$Wonderjs.getBasicSourceTextureCount(settingRecord);
  BufferSettingService$Wonderjs.getArrayBufferViewSourceTextureCount(settingRecord);
  var arrayBufferViewSourceTextureCount = BufferSettingService$Wonderjs.getArrayBufferViewSourceTextureCount(settingRecord);
  state[/* sourceTextureRecord */17] = /* record */[/* buffer */BufferSourceTextureService$Wonderjs.createBuffer(basicSourceTextureCount, arrayBufferViewSourceTextureCount)];
  return state;
}

export {
  getRecord ,
  create ,
  
}
/* OptionService-Wonderjs Not a pure module */
