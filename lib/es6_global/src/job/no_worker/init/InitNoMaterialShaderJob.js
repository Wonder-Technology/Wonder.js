

import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as InitNoMaterialShaderJobUtils$Wonderjs from "../../utils/InitNoMaterialShaderJobUtils.js";
import * as CreateInitNoMaterialShaderStateMainService$Wonderjs from "../../../service/state/main/shader/CreateInitNoMaterialShaderStateMainService.js";

function execJob(param, state) {
  InitNoMaterialShaderJobUtils$Wonderjs.exec(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), CreateInitNoMaterialShaderStateMainService$Wonderjs.createInitNoMaterialShaderState(state));
  return state;
}

export {
  execJob ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
