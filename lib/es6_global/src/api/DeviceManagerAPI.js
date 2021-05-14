

import * as Caml_array from "../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AllDeviceManagerService$Wonderjs from "../service/record/all/device/AllDeviceManagerService.js";

function unsafeGetGl(state) {
  return AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
}

function setViewport(viewportData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setViewportOfGl(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), viewportData, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setScissor(scissorData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setScissorOfGl(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), scissorData, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setScissorTest(targetScissorTest, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setScissorTest(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetScissorTest, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setSide(targetSide, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setSide(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetSide, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setStencilTest(targetStencilTest, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setStencilTest(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetStencilTest, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setStencilMask(targetStencilMask, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setStencilMask(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), targetStencilMask, state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setStencilFunc(targetStencilFunc, targetStencilRef, targetStencilMask, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setStencilFunc(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), /* tuple */[
        targetStencilFunc,
        targetStencilRef,
        targetStencilMask
      ], state[/* deviceManagerRecord */9]);
  return newrecord;
}

function setStencilOp(targetStencilSFail, targetStencilDPFail, targetStencilDPPass, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setStencilOp(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), /* tuple */[
        targetStencilSFail,
        targetStencilDPFail,
        targetStencilDPPass
      ], state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  unsafeGetGl ,
  setViewport ,
  setScissor ,
  setScissorTest ,
  setSide ,
  setStencilTest ,
  setStencilMask ,
  setStencilFunc ,
  setStencilOp ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
