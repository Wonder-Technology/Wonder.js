

import * as IndexAllSourceTextureService$Wonderjs from "../../../record/all/texture/source/IndexAllSourceTextureService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/BufferRenderWorkerSettingService.js";

function getBasicSourceTextureIndexOffset(param) {
  return IndexAllSourceTextureService$Wonderjs.getBasicSourceTextureIndexOffset(/* () */0);
}

function getArrayBufferViewSourceTextureIndexOffset(state) {
  var settingRecord = state[/* settingRecord */1];
  return IndexAllSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(BufferRenderWorkerSettingService$Wonderjs.unsafeGetBasicSourceTextureCount(settingRecord));
}

export {
  getBasicSourceTextureIndexOffset ,
  getArrayBufferViewSourceTextureIndexOffset ,
  
}
/* IndexAllSourceTextureService-Wonderjs Not a pure module */
