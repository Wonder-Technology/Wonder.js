

import * as AllDeviceManagerService$Wonderjs from "../../service/record/all/device/AllDeviceManagerService.js";

function execJob(deviceManagerRecord) {
  return AllDeviceManagerService$Wonderjs.setDepthTest(AllDeviceManagerService$Wonderjs.unsafeGetGl(deviceManagerRecord), true, AllDeviceManagerService$Wonderjs.setSide(AllDeviceManagerService$Wonderjs.unsafeGetGl(deviceManagerRecord), /* FRONT */2, deviceManagerRecord));
}

export {
  execJob ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
