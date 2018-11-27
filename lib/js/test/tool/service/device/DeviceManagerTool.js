'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var DeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/DeviceManagerService.js");

function getDeviceManagerRecord(state) {
  return state[/* deviceManagerRecord */9];
}

function setGl(gl, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = DeviceManagerService$Wonderjs.setGl(gl, state[/* deviceManagerRecord */9]);
  return newrecord;
}

var setSide = DeviceManagerService$Wonderjs.setSide;

exports.getDeviceManagerRecord = getDeviceManagerRecord;
exports.setGl = setGl;
exports.setSide = setSide;
/* DeviceManagerService-Wonderjs Not a pure module */
