

import * as JudgeAllInstanceService$Wonderjs from "../../../record/all/instance/JudgeAllInstanceService.js";
import * as OperateRenderSettingService$Wonderjs from "../../../record/render/setting/OperateRenderSettingService.js";

function isSupportInstance(state) {
  return JudgeAllInstanceService$Wonderjs.isSupportInstance(OperateRenderSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */21])[/* useHardwareInstance */0], state[/* gpuDetectRecord */18]);
}

export {
  isSupportInstance ,
  
}
/* JudgeAllInstanceService-Wonderjs Not a pure module */
