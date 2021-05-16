

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as DeviceManagerAPI$Wonderjs from "../../../../src/api/DeviceManagerAPI.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../src/service/record/all/device/AllDeviceManagerService.js";

function getDeviceManagerRecord(state) {
  return state[/* deviceManagerRecord */9];
}

function getGl(state) {
  return Caml_option.some(DeviceManagerAPI$Wonderjs.unsafeGetGl(state));
}

function setGl(gl, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setGl(gl, state[/* deviceManagerRecord */9]);
  return newrecord;
}

var setSide = AllDeviceManagerService$Wonderjs.setSide;

export {
  getDeviceManagerRecord ,
  getGl ,
  setGl ,
  setSide ,
  
}
/* DeviceManagerAPI-Wonderjs Not a pure module */
