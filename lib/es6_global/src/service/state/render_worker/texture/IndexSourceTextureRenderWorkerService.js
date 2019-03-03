

import * as IndexSourceTextureService$Wonderjs from "../../../record/all/texture/IndexSourceTextureService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/BufferRenderWorkerSettingService.js";

function getBasicSourceTextureIndexOffset(param) {
  return IndexSourceTextureService$Wonderjs.getBasicSourceTextureIndexOffset(/* () */0);
}

function getArrayBufferViewSourceTextureIndexOffset(state) {
  var settingRecord = state[/* settingRecord */1];
  return IndexSourceTextureService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(BufferRenderWorkerSettingService$Wonderjs.unsafeGetBasicSourceTextureCount(settingRecord));
}

export {
  getBasicSourceTextureIndexOffset ,
  getArrayBufferViewSourceTextureIndexOffset ,
  
}
/* IndexSourceTextureService-Wonderjs Not a pure module */
