

import * as JudgeAllInstanceService$Wonderjs from "../../../record/all/instance/JudgeAllInstanceService.js";
import * as OperateRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/OperateRenderWorkerSettingService.js";

function isSupportInstance(state) {
  return JudgeAllInstanceService$Wonderjs.isSupportInstance(OperateRenderWorkerSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */1])[/* useHardwareInstance */0], state[/* gpuDetectRecord */3]);
}

export {
  isSupportInstance ,
  
}
/* JudgeAllInstanceService-Wonderjs Not a pure module */
