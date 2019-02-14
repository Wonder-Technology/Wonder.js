

import * as JudgeInstanceService$Wonderjs from "../../../record/all/instance/JudgeInstanceService.js";
import * as OperateRenderSettingService$Wonderjs from "../../../record/render/setting/OperateRenderSettingService.js";

function isSupportInstance(state) {
  return JudgeInstanceService$Wonderjs.isSupportInstance(OperateRenderSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */19])[/* useHardwareInstance */0], state[/* gpuDetectRecord */16]);
}

export {
  isSupportInstance ,
  
}
/* JudgeInstanceService-Wonderjs Not a pure module */
