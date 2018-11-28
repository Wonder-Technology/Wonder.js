

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DeviceManagerService$Wonderjs from "../service/record/all/device/DeviceManagerService.js";

function unsafeGetGl(state) {
  return DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
}

function setViewport(viewportData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setViewportOfGl(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), viewportData, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setScissor(scissorData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setScissorOfGl(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), scissorData, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setScissorTest(targetScissorTest, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setScissorTest(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetScissorTest, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setSide(targetSide, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setSide(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetSide, state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  unsafeGetGl ,
  setViewport ,
  setScissor ,
  setScissorTest ,
  setSide ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
