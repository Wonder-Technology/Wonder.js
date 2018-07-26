

import * as JudgeInstanceService$Wonderjs from "../../../record/all/instance/JudgeInstanceService.js";
import * as OperateRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/OperateRenderWorkerSettingService.js";

function isSupportInstance(state) {
  return JudgeInstanceService$Wonderjs.isSupportInstance(OperateRenderWorkerSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */1])[/* useHardwareInstance */0], state[/* gpuDetectRecord */3]);
}

export {
  isSupportInstance ,
  
}
/* JudgeInstanceService-Wonderjs Not a pure module */
