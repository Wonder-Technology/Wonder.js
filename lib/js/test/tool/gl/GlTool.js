'use strict';

var DeviceManagerService$Wonderjs = require("../../../src/service/record/all/device/DeviceManagerService.js");

function unsafeGetGl(state) {
  return DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
}

function unsafeGetGlFromRenderState(state) {
  return DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */18]);
}

exports.unsafeGetGl = unsafeGetGl;
exports.unsafeGetGlFromRenderState = unsafeGetGlFromRenderState;
/* DeviceManagerService-Wonderjs Not a pure module */
