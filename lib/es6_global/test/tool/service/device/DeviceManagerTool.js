

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DeviceManagerService$Wonderjs from "../../../../src/service/record/all/device/DeviceManagerService.js";

function getDeviceManagerRecord(state) {
  return state[/* deviceManagerRecord */9];
}

function setGl(gl, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setGl(gl, state[/* deviceManagerRecord */9]);
  return newrecord;
}

var setSide = DeviceManagerService$Wonderjs.setSide;

export {
  getDeviceManagerRecord ,
  setGl ,
  setSide ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
