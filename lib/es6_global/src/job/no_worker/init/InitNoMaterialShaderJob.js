

import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as InitNoMaterialShaderService$Wonderjs from "../../../service/state/init_shader/init_no_material_shader/InitNoMaterialShaderService.js";
import * as CreateInitNoMaterialShaderStateMainService$Wonderjs from "../../../service/state/main/shader/CreateInitNoMaterialShaderStateMainService.js";

function execJob(param, state) {
  InitNoMaterialShaderService$Wonderjs.init(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), CreateInitNoMaterialShaderStateMainService$Wonderjs.createInitNoMaterialShaderState(state));
  return state;
}

export {
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
