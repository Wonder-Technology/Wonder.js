

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ScreenService$Wonderjs from "../../../service/primitive/device/ScreenService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";

function execJob(param, state) {
  var screenData = ScreenService$Wonderjs.queryFullScreenData(/* () */0);
  var viewportData_000 = screenData[0];
  var viewportData_001 = screenData[1];
  var viewportData_002 = screenData[2];
  var viewportData_003 = screenData[3];
  var viewportData = /* tuple */[
    viewportData_000,
    viewportData_001,
    viewportData_002,
    viewportData_003
  ];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setViewportOfGl(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), viewportData, state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
