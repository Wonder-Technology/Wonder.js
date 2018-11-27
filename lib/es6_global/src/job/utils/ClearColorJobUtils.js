

import * as ColorService$Wonderjs from "../../service/atom/ColorService.js";
import * as JobConfigUtils$Wonderjs from "../worker/utils/JobConfigUtils.js";
import * as DeviceManagerService$Wonderjs from "../../service/record/all/device/DeviceManagerService.js";

function execJob(flags, deviceManagerRecord) {
  return DeviceManagerService$Wonderjs.clearColor(DeviceManagerService$Wonderjs.unsafeGetGl(deviceManagerRecord), ColorService$Wonderjs.convert16HexToRGBA(JobConfigUtils$Wonderjs.getOperateType(flags)), deviceManagerRecord);
}

export {
  execJob ,
  
}
/* ColorService-Wonderjs Not a pure module */
