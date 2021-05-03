'use strict';

var AllDeviceManagerService$Wonderjs = require("../../../src/service/record/all/device/AllDeviceManagerService.js");

function unsafeGetGl(state) {
  return AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
}

function unsafeGetGlFromRenderState(state) {
  return AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */20]);
}

exports.unsafeGetGl = unsafeGetGl;
exports.unsafeGetGlFromRenderState = unsafeGetGlFromRenderState;
/* AllDeviceManagerService-Wonderjs Not a pure module */
