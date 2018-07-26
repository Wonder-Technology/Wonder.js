'use strict';

var DeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/DeviceManagerService.js");

function getDeviceManagerRecord(state) {
  return state[/* deviceManagerRecord */9];
}

var setSide = DeviceManagerService$Wonderjs.setSide;

var setViewportOfGl = DeviceManagerService$Wonderjs.setViewportOfGl;

exports.getDeviceManagerRecord = getDeviceManagerRecord;
exports.setSide = setSide;
exports.setViewportOfGl = setViewportOfGl;
/* DeviceManagerService-Wonderjs Not a pure module */
