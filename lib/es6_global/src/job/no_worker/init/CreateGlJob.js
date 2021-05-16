

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GlService$Wonderjs from "../../../service/primitive/gl/GlService.js";
import * as ViewService$Wonderjs from "../../../service/record/main/device/ViewService.js";
import * as OperateSettingService$Wonderjs from "../../../service/record/main/setting/OperateSettingService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as ContextConfigSettingService$Wonderjs from "../../../service/record/main/setting/ContextConfigSettingService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setGl(GlService$Wonderjs.createGl(ContextConfigSettingService$Wonderjs.convertContextConfigDataToJsObj(OperateSettingService$Wonderjs.unsafeGetContext(state[/* settingRecord */0])), ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8])), state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  execJob ,
  
}
/* ViewService-Wonderjs Not a pure module */
