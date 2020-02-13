

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ViewService$Wonderjs from "../../../service/record/main/device/ViewService.js";
import * as CreateCanvasService$Wonderjs from "../../../service/primitive/canvas/CreateCanvasService.js";
import * as OperateSettingService$Wonderjs from "../../../service/record/main/setting/OperateSettingService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(CreateCanvasService$Wonderjs.createCanvas(OperateSettingService$Wonderjs.getCanvasId(state[/* settingRecord */0])), state[/* viewRecord */8]);
  return newrecord;
}

export {
  execJob ,
  
}
/* ViewService-Wonderjs Not a pure module */
