

import * as DeviceManagerService$Wonderjs from "../../service/record/all/device/DeviceManagerService.js";

function execJob(deviceManagerRecord) {
  return DeviceManagerService$Wonderjs.setDepthTest(DeviceManagerService$Wonderjs.unsafeGetGl(deviceManagerRecord), true, DeviceManagerService$Wonderjs.setSide(DeviceManagerService$Wonderjs.unsafeGetGl(deviceManagerRecord), /* FRONT */2, deviceManagerRecord));
}

export {
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
