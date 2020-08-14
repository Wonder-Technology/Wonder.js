

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GPUDetectService$Wonderjs from "../../../service/record/all/gpu/GPUDetectService.js";
import * as BufferSettingService$Wonderjs from "../../../service/record/main/setting/BufferSettingService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* gpuDetectRecord */5] = GPUDetectService$Wonderjs.detect(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]), state[/* gpuDetectRecord */5]);
  return newrecord;
}

export {
  execJob ,
  
}
/* GPUDetectService-Wonderjs Not a pure module */
