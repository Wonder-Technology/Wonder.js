'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var DeviceManagerAPI$Wonderjs = require("../../../../src/api/DeviceManagerAPI.js");
var AllDeviceManagerService$Wonderjs = require("../../../../src/service/record/all/device/AllDeviceManagerService.js");

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

exports.getDeviceManagerRecord = getDeviceManagerRecord;
exports.getGl = getGl;
exports.setGl = setGl;
exports.setSide = setSide;
/* DeviceManagerAPI-Wonderjs Not a pure module */
